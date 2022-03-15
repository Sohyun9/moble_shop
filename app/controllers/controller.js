const connection = require('../config/dbconfig.js');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
const request = require('request');
const fs = require('fs').promises;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session());
app.use(express.json());

const controller = {
    //윈도우즈 응용프로그램에 들어가는 전체 회원 정보 출력
    getMembers: async (req, res) => {
        connection.query('SELECT * FROM member', (err, rows) => {
            if (err) throw err;
            res.send(rows);
            console.log(req.session);
        })
    },

    //웹 회원가입
    insertMembers: async (req, res) => {
        //javascript 구조분해할당
        const { name, gender, phone, address, id, password } = req.body;
        const sql = `INSERT INTO member VALUES
        ('${name}','${gender}','${phone}','${address}','${id}','${password}');`
        connection.query(
            sql, (err, rows) => {
                if (err) throw err;
                res.send("yes");
            })
    },

    //아이디 중복 체크
    checkId: async (req, res) => {
        const user_id = req.body.id;

        connection.query("SELECT id FROM member WHERE id = ?", [user_id], function (err, rows) {
            console.log(rows);
            var checkid = "0";

            if (rows[0] === undefined) {
                checkid = "1";
                res.send(checkid);
            }
            else {
                res.send(checkid);
            }
        })
    },

    //로그인
    loginMembers: async (req, res) => {
        var id = req.body.id;
        var password = req.body.password;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (rows.length) {
                if (rows[0].id === id) {
                    connection.query('SELECT * FROM member WHERE password = ?', [password], function (err, rows) {
                        if (rows[0].password === password) {
                            req.session.loginData = id;
                            req.session.loginCheck = true;
                            req.session.save(function () {
                                res.json('ok');
                            });
                            console.log('로그인 한 계정 : ' + rows[0].id + ", " + req.session.loginCheck);
                        }
                        else {
                            console.log(rows[0].id + id);
                            res.json('pwerror');
                        }
                    })
                }
                else {
                    console.log(rows[0].id);
                    res.json('iderror');
                }
            }
        })
    },

    //로그아웃
    logoutMembers: async (req, res) => {
        if (req.session.loginData) {
            console.log('로그아웃 성공');
            res.send("yes");
            res.clearCookie();
            req.session.destroy(function () {
                req.session;
            });
        } else {
            console.log('로그인 상태가 아닙니다.');
            res.send("no");
        }
    },

    //회원정보
    searchMembers: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                if (rows[0].id === id) {
                    connection.query('SELECT name, address, phone, gender, id FROM member WHERE id = ?', [id], (err, rows) => {
                        if (err) throw err;
                        res.send(rows);
                    })
                }
            }
            else {
                res.send("로그인 상태가 아닙니다.")
            }
        })
    },

    //테스트용 로그인 확인
    loginCheck: async (req, res) => {
        if (req.session.loginData) {
            res.send()
        }
        else {
            res.send({ loggedIn: false })
        }
    },

    //회원정보 수정
    infoUpdate: async (req, res) => {
        const name = req.body.name;
        const address = req.body.address;
        const id = req.body.id;
        const password = req.body.password;
        //우선 id를 고유키값으로 수정되지 않게 구현
        connection.query('UPDATE member SET address=?, name=?, password=?,  WHERE id=?', [address, id, password, name], function (err, rows) {
            console.log(name + address + id + password);
            res.send("ok");
        })
    },

    //회원탈퇴
    deleteMember: async (req, res) => {
        const id = req.body.id;

        if (req.session.loginCheck === true) {
            if (req.session.loginData === id) {
                connection.query('DELETE FROM member WHERE id = ?', [id], (err, rows) => {
                    if (err) throw err;
                    console.log("테이블 데이터 삭제 성공");
                    res.send("yes");
                })
            }

            else {
                res.send("error");
            }
        }
        else {
            res.send("error");
        }
    },

    //장바구니
    basket: async (req, res) => {
        if (req.session.loginData) {
            const id = req.session.loginData;
            connection.query('')
        }
    },

    //API 테스트용
    login: async (req, res) => {
        var opts = {
            host: 'localhost',
            port: 4003,
            method: 'POST',
            path: '/test',
            headers: {}
        };

        http.request(opts, function (req, res) {
            res.send(req.body);
        })
    }
}

module.exports = controller;