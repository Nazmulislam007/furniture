import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  // const dbconnection = await mysql.createConnection({
  //   host: "localhost",
  //   database: "renocommerce",
  //   user: "nazmul",
  //   password: "112233",
  // });

  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "renocommerce",
    user: "renocomdb",
    password: "aprjun365",
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
