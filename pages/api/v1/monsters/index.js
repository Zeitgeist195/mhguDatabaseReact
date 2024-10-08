import database from "infra/database.js";
import monsterHelpers from "helpers/monsterHelpers.js";

async function monsters(req, res) {
  const dbResponse = await database.query("SELECT * FROM monsters ORDER BY name;");

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
