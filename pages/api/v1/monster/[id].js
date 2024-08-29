import database from "infra/database";
import monsterHelpers from "helpers/monsterHelpers.js";

async function getWeaknesses(monsterId) {
  const weaknessesObject = {};
  const weaknessesDb = await database.query({
    text: "SELECT * FROM monster_weakness WHERE monster_id = $1;",
    values: [monsterId],
  });

  const weaknessesDefinition = [
    "fire",
    "water",
    "thunder",
    "ice",
    "dragon",
    "poison",
    "paralysis",
    "sleep",
  ];

  const itemsDefinition = [
    "pitfall_trap",
    "shock_trap",
    "flash_bomb",
    "sonic_bomb",
    "dung_bomb",
    "meat",
  ];

  weaknessesDb.rows.forEach(
    (element) =>
      (weaknessesObject[element.state] = getStatesObject(
        element,
        weaknessesDefinition,
        itemsDefinition,
      )),
  );

  return weaknessesObject;
}

function getStatesObject(state, weaknessesDefinition, itemsDefinition) {
  const weaknesses = {};
  const items = [];

  for (var prop in state) {
    if (Object.prototype.hasOwnProperty.call(state, prop)) {
      if (weaknessesDefinition.includes(prop) && state[prop] > 3) {
        weaknesses[prop] = state[prop];
      } else if (itemsDefinition.includes(prop) && state[prop] > 0) {
        items.push(prop);
      }
    }
  }

  const stateObject = {
    weaknesses: weaknesses,
    items: items,
  };

  return stateObject;
}

async function getAilments(monsterId) {
  const ailments = [];
  const ailmentsDb = await database.query({
    text: "SELECT * FROM monster_ailment WHERE monster_id = $1;",
    values: [monsterId],
  });

  if (ailmentsDb.rows.length > 0) {
    ailmentsDb.rows.forEach((result) => {
      ailments.push(result.ailment);
    });
  }

  return ailments;
}

async function getHabitats(monsterId) {
  let query = "SELECT ";
  query += "a.*, b.name, b.map ";
  query += "FROM monster_habitat ";
  query += "AS a INNER JOIN locations AS b ON a.location_id = b._id ";
  query += "WHERE a.monster_id = $1 GROUP BY (a._id, b.name, b.map, b._id) ";
  query += "ORDER BY b._id;";
  const habitats = {};
  const habitatsDb = await database.query({
    text: query,
    values: [monsterId],
  });

  for (const habitat of habitatsDb.rows) {
    habitats[habitat._id] = {
      locationName: habitat.name,
      locationMap: habitat.map,
      startArea: habitat.start_area,
      moveArea: habitat.move_area,
      restArea: habitat.rest_area === "NaN" ? "0" : habitat.rest_area.toString().replace(".0", ""),
    };
  }

  return habitats;
}

async function getDamage(monsterId) {
  const physicalDmg = {};
  const elementalDmg = {};

  const physicalDefinition = ["cut", "impact", "shot", "ko"];
  const elementalDefinition = ["fire", "water", "ice", "thunder", "dragon"];

  const damagesDb = await database.query({
    text: "SELECT * FROM monster_damage WHERE monster_id = $1;",
    values: [monsterId],
  });

  const bodyDmg = {};

  for (const damage of damagesDb.rows) {
    for (var prop in damage) {
      if (Object.prototype.hasOwnProperty.call(damage, prop)) {
        if (physicalDefinition.includes(prop)) {
          physicalDmg[prop] = damage[prop];
        } else if (elementalDefinition.includes(prop)) {
          elementalDmg[prop] = damage[prop];
        }
      }
    }

    const damageObj = {
      physical: physicalDmg,
      elemental: elementalDmg,
    };

    bodyDmg[damage.body_part] = damageObj;
  }

  return bodyDmg;
}

async function getRewards(monsterId) {
  let query = "SELECT ";
  query += "a.*, b.name, b.icon_name, b.icon_color ";
  query += "FROM hunting_rewards ";
  query += "AS a INNER JOIN items AS b ON a.item_id = b._id ";
  query +=
    "WHERE a.monster_id = $1 GROUP BY (a.condition, a._id, b.name, b.icon_name, icon_color) ";
  query += "ORDER BY a.rank DESC, _id;";
  // "SELECT a.*, b.name, b.map FROM monster_location AS a INNER JOIN locations AS b ON a.location_id = b._id WHERE a.monster_id = 60 GROUP BY (a.condition, b.name, b.map) ORDER BY b._id;";
  const rewardsDb = await database.query({
    text: query,
    values: [monsterId],
  });

  const rewards = {};

  for (const reward of rewardsDb.rows) {
    if (!rewards.hasOwnProperty(reward.rank)) {
      rewards[reward.rank] = {};
    }
    if (!rewards[reward.rank].hasOwnProperty(reward.condition)) {
      rewards[reward.rank][reward.condition] = {};
    }

    rewards[reward.rank][reward.condition][reward.item_id] = {
      itemName: reward.name,
      itemIcon: reward.icon_name,
      itemColor: reward.icon_color,
      stackSize: reward.stack_size,
      percentage: reward.percentage,
    };
  }

  return rewards;
}

async function getQuestsToMonster(monsterId) {
  let query = "SELECT ";
  query += "a.*, b.name, b.stars, b.rank, b.hub ";
  query += "FROM monster_to_quest ";
  query += "AS a INNER JOIN quests AS b ON a.quest_id = b._id ";
  query += "WHERE a.monster_id = $1 GROUP BY (b.hub, a.quest_id, b.stars, b.rank, b.name, a._id) ";
  query += "ORDER BY a.quest_id;";

  const qtmDb = await database.query({
    text: query,
    values: [monsterId],
  });

  const quests = {};

  for (const quest of qtmDb.rows) {
    if (!quests.hasOwnProperty(quest.hub)) {
      quests[quest.hub] = {};
    }

    quests[quest.hub][quest.quest_id] = {
      questName: quest.name,
      questStars: quest.stars,
      isUnstable: quest.unstable === 1 ? true : false,
      isHyper: quest.hyper === 1 ? true : false,
    };
  }

  return quests;
}

export default async function monster(req, res) {
  const { id } = req.query;

  const monsterBase = await database.query({
    text: "SELECT * FROM monsters WHERE _id = $1;",
    values: [id],
  });

  const base = {
    id: id,
    class: monsterHelpers.getMonsterClass(id),
    name: monsterBase.rows[0].name,
    iconName: monsterBase.rows[0].icon_name,
    sortName: monsterBase.rows[0].sort_name,
    baseHp: monsterBase.rows[0].base_hp,
  };

  res.status(200).json({
    summary: {
      base: base,
      states: await getWeaknesses(id),
      ailments: await getAilments(id),
      habitats: await getHabitats(id),
    },
    damage: await getDamage(id),
    huntingRewards: await getRewards(id),
    quests: await getQuestsToMonster(id),
  });
}
