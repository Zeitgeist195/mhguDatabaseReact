function getMonsterClass(classId) {
  let literalClass = "";
  switch (classId) {
    default:
    case "0":
      literalClass = "Large";
      break;
    case "1":
      literalClass = "Small";
      break;
    case "2":
      literalClass = "Deviant";
      break;
  }
}

exports.getMonsterClass = getMonsterClass;
