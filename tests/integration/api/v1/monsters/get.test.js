test("GET to /api/v1/monsters should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/monsters");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.dependencies.database.version).toBeDefined();
  expect(responseBody.dependencies.database.max_connections).toBeGreaterThanOrEqual(1);
  expect(responseBody.dependencies.database.opened_connections).toBeGreaterThanOrEqual(0);
});

// TODO tests
