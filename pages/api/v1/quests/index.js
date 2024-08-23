import database from "infra/database.js";

async function quests(req, res) {
  const dbResponse = await database.query("SELECT * FROM quests ORDER BY sort_order;");

  const villageQuests = [];
  const guildQuests = [];
  const eventQuests = [];
  const permitQuests = [];

  dbResponse.rows.forEach((quests) => {
    const questsObject = {
      _id: quests._id,
      hub: quests.hub,
      stars: quests.stars,
      sort_order: quests.sort_order,
      name: quests.name,
      goal: quests.goal,
      type: quests.type,
      rank: quests.rank,
      goal_type: quests.goal_type,
    };

    switch (questsObject.hub) {
      default:
      case "Village":
        villageQuests.push(questsObject);
        break;

      case "Guild":
        guildQuests.push(questsObject);
        break;

      case "Event":
        eventQuests.push(questsObject);
        break;

      case "Permit":
        permitQuests.push(questsObject);
        break;
    }
  });

  res.status(200).json({
    quests: {
      village: villageQuests,
      guild: guildQuests,
      event: eventQuests,
      permit: permitQuests,
    },
  });
}

export default quests;
