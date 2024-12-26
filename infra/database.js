import { Client } from "pg";

const query = async (queryObject) => {
  // try {
  const client = new Client({
    hosts: process.env.POSTGRES_HOSTS,
    port: process.env.POSTRGES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  await client.connect();

  const result = await client
    .query(queryObject)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      throw error;
    });
  console.log("result: ", result);

  await client.end();
  return result;
  // } catch (error) {
  //   throw error;
  // }
};

export default {
  query: query,
};
