const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const historyModel = {
  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getHistoryById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from history WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  add: ({ name, balance, category }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO history (id, name, balance, category) VALUES ('${uuidv4()}','${name}','${balance}','${category}')`,
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve({ name, balance, category });
          }
        }
      );
    });
  },

  update: ({ id, name, balance, category }) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM history WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          db.query(
            `UPDATE history SET name='${
              name || result.rows[0].name
            }', balance='${balance || result.rows[0].balance}', category='${
              category || result.rows[0].category
            }'
             WHERE id='${id}'`,
            (err, result) => {
              if (err) {
                return reject(err.message);
              } else {
                return resolve({ id, name, balance });
              }
            }
          );
        }
      });
    });
  },

  remove: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE from history WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve("success delete");
        }
      });
    });
  },
};

module.exports = historyModel;
