import database from "infra/database.js";
import monsterHelpers from "helpers/monsterHelpers.js";

async function monsters(req, res) {
  const { type } = req.query;
  const dbResponse = await database.query({
    text: "SELECT * FROM monsters WHERE class = $1 ORDER BY name;",
    values: [monsterHelpers.getClassIdFromName(type)],
  });

  const monsters = [];

  dbResponse.rows.forEach((monster) => {
    const monsterObject = {
      _id: monster._id,
      classId: monster.class,
      className: monsterHelpers.getMonsterClass(monster.class),
      name: monster.name,
      icon_name: monster.icon_name,
    };

    monsters.push(monsterObject);
  });

  res.status(200).json({
    monsters: monsters,
  });
}

export default monsters;
