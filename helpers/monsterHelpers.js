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

function getClassIdFromName(className) {
  let classId;

  switch (className) {
    default:
    case "large":
      classId = "0";
      break;
    case "small":
      classId = "1";
      break;
    case "deviant":
      classId = "2";
      break;
  }

  return classId;
}

exports.getMonsterClass = getMonsterClass;
exports.getClassIdFromName = getClassIdFromName;
