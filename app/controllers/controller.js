const connection = require('../config/dbconfig.js');
const MySQLStore = require('express-session');

const controller = {
    getMembers : async (req, res) => {
        connection.query('SELECT * FROM member', (err, rows) => {
            if(err) throw err;
            res.send(rows);
        })
    },

    insertMembers : async (req, res) => {
        //javascript 구조분해할당
        const {name, gender, phone, address, id, password} = req.body;
        const sql = `INSERT INTO member VALUES
        ('${name}','${gender}','${phone}','${address}','${id}','${password}');`

        connection.query(
            sql,(err, rows) =>{
                if(err) throw err;
                res.send(rows);
            });
    },

    loginMembers : async (req, res) => {
        const id = req.body.id;
        const password = req.body.password;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function(err, rows){
            if(rows.length){
                if(rows.id === this.id) {
                    connection.query('SELECT * FROM member WHERE password = ?', [password], function(err, rows){
                        if(err) throw err;
                        if(rows.length){
                            
                            res.send({'result':'ok'})
                            console.log(id + ", " + password);
                        }else{
                            res.send({'result':'pwfalse'})
                        }
                    })
                }
            }
            else{
                res.send({'result':'idfalse'});
            }
        })
    }
}


module.exports = controller;