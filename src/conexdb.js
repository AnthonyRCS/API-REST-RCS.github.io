// import mysql from "mysql";
// import { promisify } from "util";
// import { database } from "./key.js";

// const pool = mysql.createPool(database);

// pool.getConnection((err, connection) => {
// if (err) {
// if (err.code === "PROTOCOL_CONNECTION_LOST") {
//     console.error("DATABASE CONNECETION WAS CLOSED");
// }
// if (err.code === "ER_CON_COUNT_ERROR") {
//     console.error("DATABASE WAAS TO MANU CONNECTIONS");
// }
// if (err.code === "ECONNREFUSED") {
//     console.error("DATABASE CONNECTION WAS REFUSED");
// }
// }if (connection) connection.release();
// console.log("DATABASE CONECTADA YUPI!");
// return;
// });
// pool.query = promisify(pool.query);

// export default pool;

import mysql from "mysql";
import { promisify } from "util";
import { database } from "./key.js";

const pool = mysql.createPool(database);

pool.getConnection(async (err, connection) => {
  if (err) {
    switch (err.code) {
      case "PROTOCOL_CONNECTION_LOST":
        console.error("DATABASE CONNECTION WAS CLOSED");
        break;
      case "ER_CON_COUNT_ERROR":
        console.error("DATABASE HAD TOO MANY CONNECTIONS");
        break;
      case "ECONNREFUSED":
        console.error("DATABASE CONNECTION WAS REFUSED");
        break;
      default:
        console.error("DATABASE CONNECTION ERROR:", err);
    }
    return;
  }
  connection.release();
  console.log("DATABASE CONNECTED YUPI!");
});

pool.query = promisify(pool.query);

export default pool;
