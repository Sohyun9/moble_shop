const connection = require('../config/dbconfig.js');
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser')
const http = require('http');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session());
app.use(express.json());

const output = {
    login: (req, res) => {
        res.render("login");
    },
    register: (req, res) => {
        res.render("member");
    },

    //메인화면
    home: (req, res) => {
        res.render("main");
    },
    main: (req, res) => {
        res.render("main2")
    },

    //구매화면 구성(메인화면)
    purchase1: (req, res) => {
        res.render("purchase1");
    },
    purchase2: (req, res) => {
        res.render("purchase2");
    },
    purchase3: (req, res) => {
        res.render("purchase3");
    },
    purchase4: (req, res) => {
        res.render("purchase4");
    },
    purchase5: (req, res) => {
        res.render("purchase5");
    },
    purchase6: (req, res) => {
        res.render("purchase6");
    },
    purchase7: (req, res) => {
        res.render("purchase7");
    },
    purchase8: (req, res) => {
        res.render("purchase8");
    },

    //구매페이지(coat)
    coat: (req, res) => {
        res.render("Coat");
    },
    coat1: (req, res) => {
        res.render("Coat1");
    },
    coat2: (req, res) => {
        res.render("Coat2");
    },
    coat3: (req, res) => {
        res.render("Coat3");
    },
    coat4: (req, res) => {
        res.render("Coat4");
    },
    coat5: (req, res) => {
        res.render("Coat5");
    },
    coat6: (req, res) => {
        res.render("Coat6");
    },
    coat7: (req, res) => {
        res.render("Coat7");
    },
    coat8: (req, res) => {
        res.render("Coat8");
    },

    //마이페이지
    mypage: (req, res) => {
        res.render("mypage",
            user = JSON.stringify(req.body.id),
            phone = JSON.stringify(req.body.phone),
            address = JSON.stringify(req.body.address)
        );
        console.log(req.body);
    }
}

const controller = {
    //윈도우즈 응용프로그램에 들어가는 전체 회원 정보 출력
    getMembers: async (req, res) => {
        connection.query('SELECT * FROM member', (err, rows) => {
            if (err) throw err;
            res.send(rows);
            // console.log(req.body);
        })
    },

    //웹 회원가입
    insertMembers: async (req, res) => {
        //javascript 구조분해할당
        const user_id = req.body.id;
        connection.query("SELECT id FROM member WHERE id = ?", [user_id], function (err, rows) {
            if (rows[0].id != user_id) {
                const { name, gender, phone, address, id, pwd } = req.body;
                const sql = `INSERT INTO member VALUES ('${id}','${pwd}','${name}','${address}','${gender}','${phone}');`
                connection.query(sql, (err, rows) => {
                    if (err) throw err;
                    connection.query("CREATE TABLE " + id + "_buy" + " (info CHAR(100), sum int(30))", function (err, result) {
                        if (err) throw err;
                    })
                    connection.query("CREATE TABLE " + id + "_basket" + " (info CHAR(100), sum int(30))", function (err, result) {
                        if (err) throw err;
                    })
                    if (err) reject(`${err}`);

                    res.send({ success: true });
                })
            }
            else {
                res.send({ success: false, msg: "중복된 아이디가 있습니다." });
            }
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
        var password = req.body.pwd;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (rows.length) {
                if (rows[0].id === id) {
                    connection.query('SELECT * FROM member WHERE pwd = ?', [password], function (err, rows) {
                        if (rows[0].pwd === password) {
                            req.session.loginData = id;
                            req.session.loginCheck = true;
                            req.session.save(function () {
                                res.send({ success: true });
                            });
                            console.log('로그인 한 계정 : ' + req.session.loginData + ", " + req.session.loginCheck);
                        }
                        else {
                            console.log(rows[0].id + id);
                            res.send({ success: false, msg: "비밀번호가 틀렸습니다." });
                        }
                    })
                }
                else {
                    console.log(rows[0].id);
                    res.send({ success: false, msg: "존재하지 않는 아이디입니다." });
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

    mypage: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        console.log(id);
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                if (rows[0].id === id) {
                    connection.query('SELECT name, address, phone, gender, id FROM member WHERE id = ?', [id], (err, rows) => {
                        if (err) throw err;
                        res.send(rows[0]);
                        console.log(rows[0]);
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

module.exports = {
    controller,
    output
};