const connection = require('../config/dbconfig.js');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(session());

const controller = {
    getMembers: async (req, res) => {
        connection.query('SELECT * FROM member', (err, rows) => {
            if (err) throw err;
            res.send(rows);
            console.log(req.session);
        })
    },

    insertMembers: async (req, res) => {
        //javascript 구조분해할당
        const { name, gender, phone, address, id, password } = req.body;
        const sql = `INSERT INTO member VALUES
        ('${name}','${gender}','${phone}','${address}','${id}','${password}');`

        connection.query(
            sql, (err, rows) => {
                if (err) throw err;
                res.send(rows);
            });
    },

    loginMembers: async (req, res) => {
        const id = req.body.id;
        const password = req.body.password;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (rows.length) {
                if (rows[0].id === id) {
                    connection.query('SELECT * FROM member WHERE password = ?', [password], function (err, rows) {
                        if (rows[0].password == password) {
                            req.session.loginData = id;
                            req.session.loginCheck = true;
                            req.session.save(function () {
                                console.log({ 'result': 'ok' })
                            });
                            res.send('로그인 성공 ' + rows[0].name + '님 반갑습니다.');
                            console.log('로그인 한 계정 : ' + rows[0].name + ", " + req.session.loginCheck);
                        }
                        else {
                            console.log(rows[0].id + id);
                            res.send({ 'result': 'pwerror' })
                        }
                    })
                }
                else {
                    console.log(rows[0].id);
                    res.send({ 'result': 'iderror' });
                }
            }
        })
    },

    logoutMembers: async (req, res) => {
        if (req.session.loginData) {
            console.log('로그아웃 성공');
            req.session.destroy(function (err) {
                if (err) { return next(err); }
                res.redirect('/');
            })
        }
        else {
            console.log('로그인 상태가 아닙니다.');
        }
    },

    searchMembers: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                if (rows[0].id === id) {
                    connection.query('SELECT name, address, phone, gender, id FROM member', (err, rows) => {
                        if (err) throw err;
                        res.send("로그인한 회원 정보 " + rows[0].name);
                    })
                }
            }
            else {
                res.send("로그인 상태가 아닙니다.")
            }
        })
    },

    loginCheck: async (req, res) => {
        if (req.session.loginData) {
            res.send()
        }
        else {
            res.send({ loggedIn: false })
        }
    },

    infoUpdate: async (req, res) => {
        const name = req.body.name;
        const address = req.body.address;
        const id = req.body.id;
        const password = req.body.password;

        connection.query('UPDATE member SET address=?, id=?, passsword=? WHERE name=?', [address, id, password, name], function (err, rows) {
            console.log(name + address + id + password);
            res.send("ok");
        })
    },

    basket: async (req, res) => {
        if (req.session.loginData) {
            const id = req.session.loginData;
            connection.query('')
        }
    }
}

module.exports = controller;