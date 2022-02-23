const connection = require('../config/dbconfig.js')

const controller = {
    getMembers : async (req, res) => {
        connection.query('SELECT * FROM member', (error, rows) => {
            if(error) throw error;
            res.send(rows);
        })
    },

    insertMembers : async (req, res) => {
        //javascript 구조분해할당
        const {name, gender, phone, address, id, password} = req.body;
        const sql = `INSERT INTO member VALUES
        ('${name}','${gender}','${phone}','${address}','${id}','${password}');`

        connection.query(
            sql,(error, rows) =>{
                if(error) throw error;
                res.send(rows);
            });
    },

    searchMembers : async (req, res) => {
        connection.query(`SELECT * FROM member WHERE id = ${id}`, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
              }
              if (res.length) {
                console.log("found tutorial: ", res[0]);
                result(null, res[0]);
                return;
              }
              // not found Tutorial with the id
              result({ kind: "not_found" }, null);
        });
    }
}


module.exports = controller;