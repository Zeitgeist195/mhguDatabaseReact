import database from "infra/database.js";
import questHelpers from "helpers/questHelpers";

async function quests(req, res) {
  const villageQuestsDb = await database.query({
    text: "SELECT * FROM quests WHERE hub = $1 ORDER BY (stars), (sort_order);",
    values: ["Village"],
  });

  const guildQuestsDb = await database.query({
    text: "SELECT * FROM quests WHERE hub = $1 ORDER BY (stars), (sort_order);",
    values: ["Guild"],
  });

  const eventQuestsDb = await database.query({
    text: "SELECT * FROM quests WHERE hub = $1 ORDER BY (stars), (sort_order);",
    values: ["Event"],
  });

  const permitQuestsDb = await database.query({
    text: "SELECT * FROM quests WHERE hub = $1 ORDER BY (stars), (sort_order);",
    values: ["Permit"],
  });

  const villageQuests = villageQuestsDb.rows.map((quest) => questHelpers.getQuestObject(quest));
  const guildQuests = guildQuestsDb.rows.map((quest) => questHelpers.getQuestObject(quest));
  const eventQuests = eventQuestsDb.rows.map((quest) => questHelpers.getQuestObject(quest));
  const permitQuests = permitQuestsDb.rows.map((quest) => questHelpers.getQuestObject(quest));

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
