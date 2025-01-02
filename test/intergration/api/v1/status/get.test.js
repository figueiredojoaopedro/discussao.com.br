test("GET to api/v1/status should return 200", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName=local_db",
  );

  expect(response.status).toBe(200);

  const response_body = await response.json();

  // test updated_at
  const parsed_updated_at = new Date(response_body.updated_at).toISOString();
  expect(response_body.updated_at).toEqual(parsed_updated_at);

  // test database_version
  expect(response_body.dependencies.database.version).toEqual("16.0");

  // test opened_connections
  expect(response_body.dependencies.database.opened_connetions).toEqual(1);

  // test max_connections
  expect(response_body.dependencies.database.max_connections).toEqual(100);
});
