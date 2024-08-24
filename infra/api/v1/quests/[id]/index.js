import database from "infra/database";

export default async function quests(req, res) {
  const { id } = req.query;

  const monsterBase = await database.query({
    text: "SELECT * FROM quests WHERE _id = $1;",
    values: [id],
  });

  const base = {
    id: id,
    class: getMonsterClass(id),
    name: monsterBase.rows[0].name,
    iconName: monsterBase.rows[0].icon_name,
    sortName: monsterBase.rows[0].sort_name,
    baseHp: monsterBase.rows[0].base_hp,
  };

  res.status(200).json({
    summary: {
      base: base,
      states: await getWeaknesses(id),
      ailments: await getAilments(id),
      habitats: await getHabitats(id),
    },
    damage: await getDamage(id),
    huntingRewards: await getRewards(id),
    quests: await getMonsterQuests(id),
  });
}
