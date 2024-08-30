import database from "infra/database";
import questHelpers from "helpers/questHelpers.js";

async function getMonstersToQuest(questId, locationId) {
  let query = "SELECT ";
  query +=
    "a.*, b.monster_id, b.start_area, b.move_area, b.rest_area, c.name as monster_name, c.icon_name ";
  query += "FROM monster_to_quest ";
  query += "AS a INNER JOIN monster_habitat AS b ON (a.monster_id = b.monster_id) ";
  query += "INNER JOIN monsters AS c ON a.monster_id = c._id ";
  query += "WHERE (a.quest_id = $1 AND b.location_id = $2)";
  query +=
    "GROUP BY (a._id, b.monster_id, b.start_area, b.move_area, b.rest_area, c.name, c.icon_name) ";

  // SELECT a.*, b.monster_id, b.start_area, b.move_area, b.rest_area, c.name as monster_name, c.icon_name FROM monster_to_quest AS a INNER JOIN monster_habitat AS b ON (a.monster_id = b.monster_id) INNER JOIN monsters AS c ON a.monster_id = c._id WHERE (a.quest_id = $1, b.location_id = $2)GROUP BY (a._id, b.monster_id, b.start_area, b.move_area, b.rest_area, c.name, c.icon_name) ORDER BY b.monster_id;

  const mtqDb = await database.query({
    text: query,
    values: [questId, locationId],
  });

  const monsters = {};

  mtqDb.rows.sort((x, y) => {
    return y.unstable - x.unstable;
  });

  for (const monster of mtqDb.rows) {
    monsters[monster.monster_id] = {
      monsterName: monster.monster_name,
      monsterIconName: monster.icon_name,
      startArea: monster.start_area,
      moveArea: monster.move_area,
      restArea: monster.rest_area === "NaN" ? "0" : monster.rest_area.toString().replace(".0", ""),
      isUnstable: monster.unstable === "1" ? true : false,
      isHyper: monster.hyper === "1" ? true : false,
    };
  }

  return monsters;
}

export default async function quests(req, res) {
  const { id } = req.query;

  let query = "SELECT ";
  query += "a.*, b.name as location_name, b.map ";
  query += "FROM quests ";
  query += "AS a INNER JOIN locations AS b ON a.location_id = b._id ";
  query += "WHERE a._id = $1 GROUP BY (a._id, b.name, b.map, b._id) ";
  query += "ORDER BY b._id;";

  // let query = "SELECT a.*, b.name as location_name, b.map FROM quests AS a INNER JOIN locations AS b ON a.location_id = b._id WHERE a._id = $936 GROUP BY (a._id, b.name, b.map, b._id) ORDER BY b._id;"

  const questBase = await database.query({
    text: query,
    values: [id],
  });

  const base = {
    id: id,
    name: questBase.rows[0].name,
    questType: questHelpers.getLiteralQuestGoal(questBase.rows[0].goal, id),
    goal: questBase.rows[0].goal,
    description: questBase.rows[0].flavor,
    hub: questBase.rows[0].hub,
    stars: questBase.rows[0].stars,
    timeLimit: questBase.rows[0].time_limit,
    fee: questBase.rows[0].fee,
    reward: questBase.rows[0].reward,
    hrp: questBase.rows[0].hrp,
    subGoal: questBase.rows[0].sub_goal,
    subReward: questBase.rows[0].sub_reward,
    subHrp: questBase.rows[0].sub_hrp,
    permitMonsterId: questBase.rows[0].permit_monster_id,
  };

  const location = {
    id: questBase.rows[0].location_id,
    mapIcon: questBase.rows[0].map,
    name: questBase.rows[0].location_name,
  };

  res.status(200).json({
    detail: {
      base: base,
      monsters: await getMonstersToQuest(id, location.id),
      location: location,
    },
  });
}
