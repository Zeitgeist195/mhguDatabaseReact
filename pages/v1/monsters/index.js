import database from "infra/database.js";

function getLiteralMonsterClass(classId) {
  let className;

  switch (classId) {
    default:
    case "0":
      className = "Large";
      break;
    case "1":
      className = "Small";
      break;
    case "2":
      className = "Deviant";
      break;
  }

  return className;
}

async function monsters(req, res) {
  const dbResponse = await database.query("SELECT * FROM monsters;");

  const large = [];
  const deviant = [];
  const small = [];

  dbResponse.rows.forEach((monster) => {
    const monsterObject = {
      _id: monster._id,
      classId: monster.class,
      className: getLiteralMonsterClass(monster.class),
      name: monster.name,
      icon_name: monster.icon_name,
    };

    switch (monsterObject.classId) {
      default:
      case "0":
        large.push(monsterObject);
        break;
      case "1":
        small.push(monsterObject);
        break;
      case "2":
        deviant.push(monsterObject);
        break;
    }
  });

  res.status(200).json({
    monsters: {
      Large: large,
      Deviant: deviant,
      Small: small,
    },
  });
}

export default monsters;
