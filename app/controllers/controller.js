const connection = require('../config/dbconfig.js');
const express = require('express');
const session = require('express-session');

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
                if(rows[0].id === id) {
                    connection.query('SELECT * FROM member WHERE password = ?', [password], function(err, rows){
                        if(err) throw err;
                        if(rows[0]!=undefined){
                            req.session.loggedin = true;
                            req.session.id = rows[0].id;
                            req.session.save(function(){
                                res.redirect('/');
                            })
                            res.end();
                            res.send('로그인 성공 ' + rows[0].name + '님 반갑습니다.');
                            console.log('로그인 한 계정 : ' + rows[0].id + ", " + rows[0].password);
                        }else{
                            res.send({'result':'pwerror'})
                        }
                    })
                }
            }
            else{
                res.send({'result':'iderror'});
            }
        })
    },

    searchMembers : async (req, res) => {
        const id = req.session.id;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function(err, rows){
            if(rows.length){
                if(rows.length){
                    if(rows.id === this.id) {
                        connection.query('SELECT name, address, phone, gender, id FROM member', (err, rows) => {
                            if(err) throw err;
                            res.send("로그인한 회원 정보 <br>" + rows);
                        })
                    }
                }
            }
        })
    }
}

module.exports = controller;