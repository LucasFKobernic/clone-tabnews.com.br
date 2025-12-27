import { createRouter } from "next-connect";
import database from "/infra/database.js";
import controller from "infra/controller.js";
const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseName = process.env.POSTGRES_DB;
  const activeConnections = await database.query({
    text: "SELECT count(*) FROM pg_stat_activity WHERE datname = $1;",
    values: [databaseName],
  });
  const maxConnections = await database.query("SHOW max_connections;");

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        postgres_version: parseFloat(
          databaseVersionResult.rows[0].server_version,
        ),
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        connection_used: parseInt(activeConnections.rows[0].count),
      },
    },
  });
}
