import database from "../../../../infra/database.js";

const status = async (request, response) => {
  try {
    const result = await database.query("SELECT 1 + 1 AS sum;");

    console.log("teste result2", result.rows);

    response.status(200).json({
      status: 200,
      message: "API is working more than never!",
    });
  } catch (error) {
    response.status(error.status || 500).json({
      status: error.status || 500,
      message: error.message || "Error during the query.",
    });
  }
};

export default status;
