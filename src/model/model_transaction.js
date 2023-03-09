const db = require("../../helper(db)/connection");
const { v4: uuidv4 } = require("uuid");

const transactionModel = {
  add: ({ receiver_id, sender_id, amount, date }) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET balance = balance - $1 where users.id = $2`,
        [amount, sender_id],
        (err, result) => {
          if (err) {
            return reject(err.message);
          } else {
            db.query(
              `UPDATE users SET balance = balance + $1 where users.id = $2`,
              [amount, receiver_id],
              (err, result) => {
                if (err) {
                  return reject(err.message);
                } else {
                  db.query(
                    `INSERT INTO transaksi (id, receiver_id, sender_id, amount) VALUES ('${uuidv4()}','${receiver_id}','${sender_id}','${amount}')`,
                    (err, result) => {
                      if (err) {
                        return reject(err.message);
                      } else {
                        return resolve({ receiver_id, sender_id, amount });
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    });
  },
};

module.exports = transactionModel;
