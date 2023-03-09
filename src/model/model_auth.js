const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

const authModel = {
  register: ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `INSERT INTO users (id, name, email, password) VALUES($1, $2, $3, $4)`,
        [uuidv4(), name, email, password],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            return resolve("ADD_SUCCESS");
          }
        }
      );
    });
  },

  login: ({ email, password }) => {
    console.log(email, password);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE email=$1`, [email], (err, result) => {
        if (err) return reject(err.message);
        if (result.rows.length == 0) return reject("email/password salah.");

        bcrypt.compare(
          password,
          result.rows[0].password,
          function (err, hashingResult) {
            if (err) return reject(err.message);
            if (!hashingResult) return reject("username/password salah.");
            return resolve(result.rows[0]);
          }
        );
      });
    });
  },

  get: function (queryParams) {
    console.log(queryParams);
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows);
        }
      });
    });
  },

  getDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * from users WHERE id='${id}'`, (err, result) => {
        if (err) {
          return reject(err.message);
        } else {
          return resolve(result.rows[0]);
        }
      });
    });
  },

  // id, name, email, phone, password, pin, balance, img

  update: function (req, id) {
    return new Promise((success, failed) => {
      const { name, email, phone, password, pin, balance } = req.body;
      db.query(`SELECT * FROM users WHERE id='${id}'`, (error, result) => {
        if (error) {
          return failed(error.message);
        } else {
          // console.log(result);
          if (result.rows.length < 1) {
            return failed("Id not found!");
          } else {
            db.query(
              `UPDATE users SET name='${name || result.rows[0].name}', email='${
                email || result.rows[0].email
              }', phone='${phone || result.rows[0].phone}', password='${
                password || result.rows[0].password
              }', pin='${pin || result.rows[0].pin}', balance='${
                balance || result.rows[0].balance
              }', img='${
                req.file != undefined ? req.file.filename : result.rows[0].img
              }' WHERE id='${id}'`,
              (error) => {
                if (error) {
                  return failed(error.message);
                } else {
                  return success(result.rows);
                }
              }
            );
          }
        }
      });
    });
  },

  // update: (req, id) => {
  //   return new Promise((resolve, reject) => {
  //     const { name, email, phone, password, pin, balance, img } = req.body;

  //     db.query(`SELECT * FROM users WHERE id='${id}'`, (err, result) => {
  //       if (err) {
  //         return reject(err.message);
  //       } else {
  //         db.query(
  //           `UPDATE users SET name='${name || result.rows[0].name}', email='${
  //             email || result.rows[0].email
  //           }', phone='${phone || result.rows[0].phone}', password='${
  //             password || result.rows[0].password
  //           }', pin='${pin || result.rows[0].pin}', balance='${
  //             balance || result.rows[0].balance
  //           }', img='${img || result.rows[0].img}'
  //            WHERE id='${id}'`,
  //           (err, result) => {
  //             if (err) {
  //               return reject(err.message);
  //             } else {
  //               return resolve({
  //                 id,
  //                 name,
  //                 email,
  //                 phone,
  //                 password,
  //                 pin,
  //                 balance,
  //                 img,
  //               });
  //             }
  //           }
  //         );
  //       }
  //     });
  //   });
  // },
};

module.exports = authModel;
