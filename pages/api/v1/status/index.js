import database from "/infra/database.js";

async function status(request, response) {
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

export default status;
