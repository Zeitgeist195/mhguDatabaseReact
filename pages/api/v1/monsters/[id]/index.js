import database from "infra/database";

export default async function monster(req, res) {
  const { id } = req.query;

  const monsterBase = await database.query({
    text: "SELECT * FROM monsters WHERE _id = $1;",
    values: [id],
  });

  const stateAndWeakness = [];

  const monsterWeaknesses = await database.query({
    text: "SELECT * FROM monster_weakness WHERE monster_id = $1;",
    values: [id],
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

  const states = {};

  monsterWeaknesses.rows.forEach((element) => {
    const weakenesses = {};
    const items = {};

    for (var prop in element) {
      if (Object.prototype.hasOwnProperty.call(element, prop)) {
        if (weakenessesDefinition.includes(prop) && element[prop] > 3) {
          weakenesses[prop] = element[prop];
        } else if (itemsDefinition.includes(prop) && element[prop] > 0) {
          items[prop] = element[prop];
        }
      }
    }

    const stateObject = {
      weakenesses: weakenesses,
      items: items,
    };

    states[element.state] = stateObject;
  });

  res.status(200).json({
    summary: {
      monster: monsterBase.rows[0],
      states: states,
    },
  });
}
