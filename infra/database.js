import { Client } from "pg";

const query = async (queryObject) => {
  const client = new Client({
    hosts: process.env.POSTGRES_HOSTS,
    port: process.env.POSTRGES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });

  try {
    await client.connect();

    const result = await client
      .query(queryObject)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        throw error;
      });

    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.end();
  }
};

export default {
  query: query,
};
