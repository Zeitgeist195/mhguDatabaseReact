import database from "infra/database";

async function getHabitats(monsterId) {
  let query = "SELECT ";
  query += "a.*, b.name, b.map ";
  query += "FROM monster_habitat ";
  query += "AS a INNER JOIN locations AS b ON a.location_id = b._id ";
  query += "WHERE a.monster_id = $1 GROUP BY (a._id, b.name, b.map, b._id) ";
  query += "ORDER BY b._id;";
  const habitats = {};
  const habitatsDb = await database.query({
    text: query,
    values: [monsterId],
  });

  for (const habitat of habitatsDb.rows) {
    habitats[habitat._id] = {
      locationName: habitat.name,
      locationMap: habitat.map,
      startArea: habitat.start_area,
      moveArea: habitat.move_area,
      restArea: habitat.rest_area === "NaN" ? "0" : habitat.rest_area.toString().replace(".0", ""),
    };
  }

  return habitats;
}

module.exports = {
  getHabitats: getHabitats
};