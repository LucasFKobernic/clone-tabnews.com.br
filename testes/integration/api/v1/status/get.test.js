import orchestrator from "testes/orchestrator.js";

beforeAll(async () => {
  await orchestrator.WaitForAllServices();
});

describe("GET /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.updated_at).toBeDefined();
      const paserdUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(paserdUpdatedAt);

      expect(responseBody.dependencies.database.postgres_version).toBeDefined();
      expect(responseBody.dependencies.database.postgres_version).toEqual(16.2);

      expect(responseBody.dependencies.database.max_connections).toBeDefined();
      expect(responseBody.dependencies.database.max_connections).toEqual(100);

      expect(responseBody.dependencies.database.connection_used).toBeDefined();
      expect(responseBody.dependencies.database.connection_used).toEqual(1);
    });
  });
});
