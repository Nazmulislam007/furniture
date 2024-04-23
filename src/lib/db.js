import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  const dbconnection = await mysql.createConnection({
    host: "localhost",
    database: "renocommerce",
    user: "root",
    waitForConnections: false,
    connectionLimit: 10,
    maxIdle: 0, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 0,
  });
  // const dbconnection = await mysql.createConnection({
  //   host: "localhost",
  //   database: "renocommerce",
  //   user: "renocom",
  //   password: "aprjun365",
  // });
  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    throw Error(error.message);
    return { error };
  }
}
