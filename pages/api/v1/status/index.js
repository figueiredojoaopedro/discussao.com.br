import database from "infra/database.js";

const status = async (request, response) => {
  const database_name = process.env.POSTGRES_DB;
  const database_opened_connections_result = await database.query({
    text: `SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;`,
    values: [database_name],
  });

  const database_opened_connections =
    database_opened_connections_result.rows[0].count;

  const database_version = (
    await database.query(
      `SELECT setting as version FROM pg_settings WHERE name = 'server_version'`,
    )
  ).rows[0].version;

  const updated_at = new Date().toISOString();
  response.status(200).json({
    updated_at,
    dependencies: {
      database: {
        version: database_version,
        opened_connetions: database_opened_connections,
      },
    },
  });
};

export default status;
