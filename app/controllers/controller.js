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
        res.render("models/member");
    },

    //메인화면
    home: (req, res) => {
        res.render("models/main");
    },
    main: (req, res) => {
        res.render("models/main2")
    },

    //구매화면 구성(메인화면)
    purchase1: (req, res) => {
        res.render("home/purchase1");
    },
    purchase2: (req, res) => {
        res.render("home/purchase2");
    },
    purchase3: (req, res) => {
        res.render("home/purchase3");
    },
    purchase4: (req, res) => {
        res.render("home/purchase4");
    },
    purchase5: (req, res) => {
        res.render("home/purchase5");
    },
    purchase6: (req, res) => {
        res.render("home/purchase6");
    },
    purchase7: (req, res) => {
        res.render("home/purchase7");
    },
    purchase8: (req, res) => {
        res.render("home/purchase8");
    },

    //구매페이지(coat)
    coat: (req, res) => {
        res.render("home/Coat");
    },
    coat1: (req, res) => {
        res.render("home/Coat1");
    },
    coat2: (req, res) => {
        res.render("home/Coat2");
    },
    coat3: (req, res) => {
        res.render("home/Coat3");
    },
    coat4: (req, res) => {
        res.render("home/Coat4");
    },
    coat5: (req, res) => {
        res.render("home/Coat5");
    },
    coat6: (req, res) => {
        res.render("home/Coat6");
    },
    coat7: (req, res) => {
        res.render("home/Coat7");
    },
    coat8: (req, res) => {
        res.render("home/Coat8");
    },

    //마이페이지
    mypage: (req, res) => {
        res.render("home/mypage");
    }
}

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
        var password = req.body.pwd;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (rows.length) {
                if (rows[0].id === id) {
                    connection.query('SELECT * FROM member WHERE pwd = ?', [password], function (err, rows) {
                        if (rows[0].pwd === password) {
                            req.session.loginData = id;
                            req.session.loginCheck = true;
                            req.session.save(function () {
                                res.json({success: true});
                            });
                            console.log('로그인 한 계정 : ' + req.session.loginData + ", " + req.session.loginCheck);
                        }
                        else {
                            console.log(rows[0].id + id);
                            res.json({success: false, msg: "비밀번호가 틀렸습니다."});
                        }
                    })
                }
                else {
                    console.log(rows[0].id);
                    res.json({success: false, msg: "존재하지 않는 아이디입니다."});
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

module.exports = {
    controller,
    output
};