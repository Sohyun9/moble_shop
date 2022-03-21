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
    infoUpdate: (req, res) => {
        res.render("infoUpdate");
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

    //겨울옷
    // winterc1: (req, res) => {
    //     res.render("winterc1");
    // },
    // winterc2: (req, res) => {
    //     res.render("winterc2");
    // },
    // winterc3: (req, res) => {
    //     res.render("winterc3");
    // },
    // winterc4: (req, res) => {
    //     res.render("winterc4");
    // },
    // winterc5: (req, res) => {
    //     res.render("winterc5");
    // },
    // winterc6: (req, res) => {
    //     res.render("winterc6");
    // },

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
            if (rows.id != user_id) {
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
                            alert("비밀번호가 틀렸습니다.");
                        }
                    })
                }
                else {
                    console.log(rows[0].id);
                    res.send({ success: false, msg: "존재하지 않는 아이디입니다." });
                    alert("존재하지 않는 아이디입니다.");
                }
            }
        })
    },

    //로그아웃
    logoutMembers: async (req, res) => {
        if (req.session.loginData) {
            console.log('로그아웃 성공');
            res.clearCookie();
            req.session.destroy(function () {
                res.redirect('/');
            });
        } else {
            console.log('로그인 상태가 아닙니다.');
            res.send("no");
        }
    },

    //마이페이지
    mypage: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                if (rows[0].id === id) {
                    connection.query('SELECT name, address, phone, gender, id, pwd FROM member WHERE id = ?', [id], (err, rows) => {
                        if (err) throw err;
                        res.render("mypage", {
                            id: rows[0].id,
                            name: rows[0].name,
                            pwd: rows[0].pwd,
                            phone: rows[0].phone,
                            address: rows[0].address
                        })
                        console.log(req.body);
                    })
                }
            }
            else {
                res.send("로그인 상태가 아닙니다.")
            }
        })
    },

    winterc1: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc1"', function (err, rows) {
            res.render('winterc1', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
        })
    },

    winterc2: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc2"', function (err, rows) {
            res.render('winterc2', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
        })
    },

    winterc3: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc3"', function (err, rows) {
            res.render('winterc3', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
        })
    },

    winterc4: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc4"', function (err, rows) {
            res.render('winterc4', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
        })
    },

    winterc5: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc5"', function (err, rows) {
            res.render('winterc5', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
        })
    },

    winterc6: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc6"', function (err, rows) {
            res.render('winterc6', {name:rows[0].name, url:rows[0].url, price:rows[0].price, image_name: rows[0].image_name});
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
        var id = req.body.id;
        var address = req.body.address;
        var pwd = req.body.pwd;
        var name = req.body.name;
        var phone = req.body.phone;
        console.log(req.body);
        //우선 id를 고유키값으로 수정되지 않게 구현
        connection.query('UPDATE member SET address=?, name=?, pwd=?, phone=? WHERE id=?', [address, name, pwd, phone, id], function (err, rows) {
            // res.redirect('/main/mypage');
        })
    },

    //회원탈퇴
    deleteMember: async (req, res) => {
        const user = req.session.loginData;
        if (req.session.loginCheck === true) {
            if (req.session.loginData) {
                connection.query('DELETE FROM member WHERE id = ?', [user], (err, rows) => {
                    if (err) throw err;
                    connection.query("DROP TABLE " + user + "_buy", function (err, result) {
                        if (err) throw err;
                    })
                    connection.query("DROP TABLE " + user + "_basket", function (err, result) {
                        if (err) throw err;
                    })
                    console.log("테이블 데이터 삭제 성공");
                    res.redirect("/");
                })
            }

            else {
                res.send("1error");
            }
        }
        else {
            res.send("2error");
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
    rasberry: async (req, res) => {
        var color = req.body.data;
        req.body.name
        var id = "1234";
        if (color) {
            connection.query(`INSERT into rasberry values ('${id}', '${color}')`, (err, rows) => {
                if (err) throw err;
                res.redirect('/main/mypage');
                console.log("데이터 저장 완료");
            })
        }
    }
}

module.exports = {
    controller,
    output
};