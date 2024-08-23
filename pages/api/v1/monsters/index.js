import database from "infra/database.js";

async function monsters(req, res) {
  const dbResponse = await database.query("SELECT * FROM monsters;");

  const monstersRes = [];

  dbResponse.rows.forEach((monster) => {
    const monsterObject = {
      _id: monster._id,
      class: monster.class,
      name: monster.name,
      icon_name: monster.icon_name,
    };

    monstersRes.push(monsterObject);
  });

  res.status(200).json({
    monsters: monstersRes,
  });
}

export default monsters;
