import database from "infra/database";

async function getWeaknesses(monsterId) {
  const weakenessesObject = {};
  const weaknessesDb = await database.query({
    text: "SELECT * FROM monster_weakness WHERE monster_id = $1;",
    values: [monsterId],
  });

  const weakenessesDefinition = [
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
      (weakenessesObject[element.state] = getStatesObject(
        element,
        weakenessesDefinition,
        itemsDefinition,
      )),
  );

  return weakenessesObject;
}

function getStatesObject(state, weakenessesDefinition, itemsDefinition) {
  const weakenesses = {};
  const items = [];

  for (var prop in state) {
    if (Object.prototype.hasOwnProperty.call(state, prop)) {
      if (weakenessesDefinition.includes(prop) && state[prop] > 3) {
        weakenesses[prop] = state[prop];
      } else if (itemsDefinition.includes(prop) && state[prop] > 0) {
        items.push(prop);
      }
    }
  }

  const stateObject = {
    weakenesses: weakenesses,
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

async function getLocation(locationId) {
  const locationDb = await database.query({
    text: "SELECT * FROM locations WHERE _id = $1;",
    values: [locationId],
  });

  return locationDb.rows[0];
}

async function getHabitats(monsterId) {
  const habitats = [];
  const habitatsDb = await database.query({
    text: "SELECT * FROM monster_habitat WHERE monster_id = $1;",
    values: [monsterId],
  });

  for (const habitat of habitatsDb.rows) {
    const habitatObj = {
      location: await getLocation(habitat.location_id),
      startArea: habitat.start_area,
      moveArea: habitat.move_area,
      restArea: habitat.rest_area === "NaN" ? "0" : habitat.rest_area.toString().replace(".0", ""),
    };

    habitats.push(habitatObj);
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

async function getRewards(monsterId, rank) {
  const damagesDb = await database.query({
    text: "SELECT * FROM hunting_rewards WHERE (monster_id = $1 AND rank = $2);",
    values: [monsterId, rank],
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

export default async function monster(req, res) {
  const { id } = req.query;

  const monsterBase = await database.query({
    text: "SELECT * FROM monsters WHERE _id = $1;",
    values: [id],
  });

  res.status(200).json({
    summary: {
      base: monsterBase.rows[0],
      states: await getWeaknesses(id),
      ailments: await getAilments(id),
      habitats: await getHabitats(id),
    },
    damage: await getDamage(id),
    huntingRewards: {
      LRDrops: "",
      HRDrops: "",
      GDrops: "",
    },
    quests: "",
  });
}
