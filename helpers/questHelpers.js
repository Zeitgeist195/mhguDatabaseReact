function getLiteralQuestType(typeId) {
  let typeName;

  switch (typeId) {
    default:
    case "0":
      typeName = "Normal";
      break;
    case "1":
      typeName = "Key";
      break;
    case "2":
      typeName = "Urgent";
      break;
  }

  return typeName;
}

function getLiteralQuestGoal(goalId, questId) {
  let goalName;

  switch (goalId) {
    default:
    case (0, 1, 4, 5):
      goalName = "Red";
      break;
    case 2:
      goalName = "White";
      break;
    case 3:
      if (questId >= 100201) {
        goalName = "Prowler";
      } else {
        goalName = "Green";
      }
      break;
  }

  return goalName;
}

export function getQuestObject(quest) {
  const questObject = {
    _id: quest._id,
    hub: quest.hub,
    stars: quest.stars,
    sortOrder: quest.sort_order,
    name: quest.name,
    goal: quest.goal,
    typeId: quest.type,
    typeName: getLiteralQuestType(quest.type),
    rank: quest.rank,
    goalTypeId: quest.goal_type,
    goalTypeName: getLiteralQuestGoal(quest.goal_type, quest._id),
  };

  return questObject;
}
