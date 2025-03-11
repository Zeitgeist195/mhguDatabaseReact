import database from "infra/database";

async function getRewardsToQuest(questId) {
  let query = "SELECT ";
  query += "a.*, b.* ";
  query += "FROM quest_rewards ";
  query += "AS a INNER JOIN items AS b ON a.item_id = b._id ";
  query += "WHERE a.quest_id = $1 ";
  query += "GROUP BY (a.reward_slot, a._id, b._id) ";
  query += "ORDER BY a.reward_slot, a.percentage DESC;";

  const rewardsDb = await database.query({
    text: query,
    values: [questId],
  });

  const rewards = [];
  rewardsDb.rows.forEach((element) => rewards.push(element));

  return rewards;
}

async function getItemToQuest(questId, rank) {
  let query = "SELECT ";
  query += "a.*, b.*, c._id, c.name as item_name ";
  query += "FROM gathering AS a ";
  query += "INNER JOIN item_to_quest AS b ON a.item_id = b.item_id ";
  query += "INNER JOIN items AS c ON a.item_id = c._id ";
  query += "WHERE b.quest_id = $1 AND a.rank = $2 ";
  query += "GROUP BY (a._id, b._id, c._id) ";

  const itemsDb = await database.query({
    text: query,
    values: [questId, rank],
  });

  const items = [];
  itemsDb.rows.forEach((element) => items.push(element));

  return items;
}

export default async function quest(req, res) {
  const { id } = req.query;

  // let query = "SELECT ";
  // query += "a.*, b.item_id as item_id, c.name as item_name, c._id, d.*";
  // query += "FROM quests ";
  // query += "AS a INNER JOIN item_to_quest AS b ON a._id = b.quest_id ";
  // query += "INNER JOIN items AS c ON b.item_id = c._id ";
  // query += "INNER JOIN gathering AS d ON b.item_id = c._id ";
  // query += "WHERE a._id = $1 GROUP BY (a._id, b.item_id, c._id, d._id, c.name, d.area) ";
  // query += "ORDER BY d.area;";

  const questBase = await database.query({
    text: "SELECT * FROM quests WHERE _id = $1",
    values: [id],
  });

  const detail = {
    id: id,
    name: questBase.rows[0].name,
    stars: questBase.rows[0].stars,
    rank: questBase.rows[0].rank,
    description: questBase.rows[0].flavor,
    hub: questBase.rows[0].hub,
    hrp: questBase.rows[0].hrp,
    fee: questBase.rows[0].fee,
    reward: questBase.rows[0].reward,
    sortOrder: questBase.rows[0].sort_order,
    goal: questBase.rows[0].goal,
    goal_type: questBase.rows[0].goal_type,
    subGoal: questBase.rows[0].sub_goal,
    subReward: questBase.rows[0].sub_reward,
    sub_hrp: questBase.rows[0].sub_hrp,
  };

  res.status(200).json({
    summary: {
      detail: detail,
      items: await getItemToQuest(id, detail.rank),
      rewards: await getRewardsToQuest(id,),
    },
  });
}
