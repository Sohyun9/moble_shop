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
    }
}


module.exports = controller;