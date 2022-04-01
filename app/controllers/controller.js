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
        connection.query("SELECT * FROM member WHERE id = ?", [user_id], function (err, data) {
            if (data[0] == undefined) {
                const { name, gender, phone, address, id, pwd } = req.body;
                const sql = `INSERT INTO member VALUES ('${id}','${pwd}','${name}','${address}','${gender}','${phone}', '봄웜톤');`
                connection.query(sql, (err, rows) => {
                    if (err) throw err;
                    connection.query("CREATE TABLE " + id + "_buy" + " (name CHAR(20), price int(20))", function (err, result) {
                        if (err) throw err;
                    })
                    connection.query("CREATE TABLE " + id + "_basket" + " (name CHAR(20), price int(20))", function (err, result) {
                        if (err) throw err;
                    })
                    if (err) reject(`${err}`);

                    res.send({ success: true });
                })
            }
            
            else {
                res.send({ success: false, msg: "사용할 수 없는 아이디입니다." });
            }
        })
    },

    //로그인
    loginMembers: async (req, res) => {
        var id = req.body.id;
        var password = req.body.pwd;
        connection.query('SELECT * FROM member WHERE id = ? and pwd = ?', [id, password], function (err, rows) {
            if (err) throw err;
            if (rows.length) {
                req.session.loginData = id;
                req.session.loginCheck = true;
                req.session.save(function () {
                    res.json({ success: true });
                });
                console.log('로그인 한 계정 : ' + req.session.loginData);
            }
            else {
                res.json({ success: false, msg: "존재하지 않는 아이디 이거나 패스워드가 틀렸습니다." });
            }
        })
    },

    //로그아웃
    logoutMembers: async (req, res) => {
        var id = req.session.loginData;
        if (req.session.loginData) {
            console.log(id+':로그아웃 하였습니다.');
            res.clearCookie();
            req.session.destroy(function () {
                res.redirect('/');
            });
        }
    },

    //마이페이지
    mypage: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                if (rows[0].id === id) {
                    connection.query('SELECT name, address, phone, gender, id, pwd, color FROM member WHERE id = ?', [id], (err, rows) => {
                        if (err) throw err;
                        res.render("mypage", {
                            user: rows[0].id,
                            name: rows[0].name,
                            pwd: rows[0].pwd,
                            phone: rows[0].phone,
                            address: rows[0].address,
                            color: rows[0].color
                        })
                    })
                }
            }
            else {
                res.send("로그인 상태가 아닙니다.")
            }
        })
    },

    //회원정보 수정
    infoUpdate: async (req, res) => {
        var id = req.body.id;
        var address = req.body.address;
        var pwd = req.body.pwd;
        var name = req.body.name;
        var phone = req.body.phone;
        var color = req.body.color;

        //우선 id를 고유키값으로 수정되지 않게 구현
        connection.query('UPDATE member SET address=?, name=?, pwd=?, phone=?, color=? WHERE id=?', [address, name, pwd, phone, color, id], function (err, rows) {
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
                res.send("error");
            }
        }
        else {
            res.send("error");
        }
    },

    main: async (req, res) => {
        const id = req.session.loginData;
        const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM member WHERE id = ?', [id], function (err, rows) {
            if (logincheck === true) {
                res.render("main2", {color:rows[0].color})
            }
        })
    },

    //장바구니
    basket: async (req, res) => {
        var name = req.body.name;
        var price = req.body.price;
        console.log(name, price);
        if (req.session.loginData) {
            const id = req.session.loginData;
            var Str = "insert into " + id + "_basket values(?,?)";
            connection.query(Str, [name, price], (err, rows) => {
            })
        }
    },

    //구매이력으로 이동
    buy: async (req, res) => {
        var id = req.session.loginData;
        var name = req.body.name;
        var price = req.body.price;

        connection.query(`INSERT into ` + id + `_buy values ('${name}', '${price}')`, (err, rows) => {
            
            console.log(id+":구매이력 저장");
        })
    },

    popup: async (req, res) => {
        var id = req.session.loginData;

        var name = new Array();
        var price = new Array();

        connection.query("SELECT * FROM " + id + "_buy", (err, rows) => {
            for(var a = 0; a < rows.length; a++){
                name[a] = rows[a].name;
                price[a] = rows[a].price;
            }

            var len = a;

            res.render("Popup", {name, price, len});
        })
    },

    popup2: async (req, res) => {
        var id = req.session.loginData;

        var name = new Array();
        var price = new Array();

        connection.query("SELECT * FROM " + id + "_basket", (err, rows) => {
            for(var a = 0; a < rows.length; a++){
                name[a] = rows[a].name;
                price[a] = rows[a].price;
            }

            var len = a;

            res.render("Popup2", {name, price, len});
        })
    },

    go_buy: async (req, res)=> {
        var id = req.session.loginData;

        connection.query("INSERT INTO " + id +"_buy SELECT * FROM " + id + "_basket;", (err, rows) => {
            connection.query("DELETE FROM " + id + "_basket", (err, rows) => {
                res.redirect('/popup2');
            })
        })
    },

    //라즈베리파이
    rasberry: async (req, res) => {
        var color = req.body.data;
        var id = "1234";
        if (color) {
            connection.query(`INSERT into rasberry values ('${id}', '${color}')`, (err, rows) => {
                if (err) throw err;
                res.redirect('/main/mypage');
                console.log("데이터 저장 완료");
            })
        }
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

    p_send: async (req, res) => {
        const id = req.body.id;
        const user = req.session.loginData;

        console.log(user);
        res.send(user);
    },

    //겨울옷
    winterc1: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc1"', function (err, rows) {
            res.render('winterc1', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    winterc2: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc2"', function (err, rows) {
            res.render('winterc2', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    winterc3: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc3"', function (err, rows) {
            res.render('winterc3', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name })
        })
    },

    winterc4: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc4"', function (err, rows) {
            res.render('winterc4', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    winterc5: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc5"', function (err, rows) {
            res.render('winterc5', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    winterc6: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "winterc6"', function (err, rows) {
            res.render('winterc6', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //메인화면 옷
    purchase1: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C1"', function (err, rows) {
            res.render('purchase1', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase2: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C2"', function (err, rows) {
            res.render('purchase2', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase3: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C3"', function (err, rows) {
            res.render('purchase3', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase4: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C4"', function (err, rows) {
            res.render('purchase4', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase5: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C5"', function (err, rows) {
            res.render('purchase5', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase6: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C6"', function (err, rows) {
            res.render('purchase6', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase7: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C7"', function (err, rows) {
            res.render('purchase7', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    purchase8: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "C8"', function (err, rows) {
            res.render('purchase8', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //봄웜
    springwarm1: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm1"', function (err, rows) {
            res.render("springwarm1", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm2: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm2"', function (err, rows) {
            res.render("springwarm2", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm3: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm3"', function (err, rows) {
            res.render("springwarm3", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm4: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm4"', function (err, rows) {
            res.render("springwarm4", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm5: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm5"', function (err, rows) {
            res.render("springwarm5", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm6: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm6"', function (err, rows) {
            res.render("springwarm6", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm7: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm7"', function (err, rows) {
            res.render("springwarm7", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    springwarm8: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "springwarm8"', function (err, rows) {
            res.render("springwarm8", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //여름쿨
    summercool1: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summercool1"', function (err, rows) {
            res.render("summercool1", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summercool2: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summercool2"', function (err, rows) {
            res.render("summercool2", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summercool3: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summercool3"', function (err, rows) {
            res.render("summercool3", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summercool4: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summercool4"', function (err, rows) {
            res.render("summercool4", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //가을웜
    autumnwarm1: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "autumnwarm1"', function (err, rows) {
            res.render("autumnwarm1", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    autumnwarm2: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "autumnwarm2"', function (err, rows) {
            res.render("autumnwarm2", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    autumnwarm3: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "autumnwarm3"', function (err, rows) {
            res.render("autumnwarm3", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    autumnwarm4: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "autumnwarm4"', function (err, rows) {
            res.render("autumnwarm4", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //겨울쿨
    wintercool1: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "wintercool1"', function (err, rows) {
            res.render("wintercool1", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },
    
    wintercool2: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "wintercool2"', function (err, rows) {
            res.render("wintercool2", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    wintercool3: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "wintercool3"', function (err, rows) {
            res.render("wintercool3", { 
                name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    wintercool4: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "wintercool4"', function (err, rows) {
            res.render("wintercool4", { 
                name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    //여름옷
    summerc1: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc1"', function (err, rows) {
            res.render("summerc1", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc2: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc2"', function (err, rows) {
            res.render("summerc2", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc3: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc3"', function (err, rows) {
            res.render("summerc3", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc4: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc4"', function (err, rows) {
            res.render("summerc4", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc5: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc5"', function (err, rows) {
            res.render("summerc5", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc6: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc6"', function (err, rows) {
            res.render("summerc6", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc7: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc7"', function (err, rows) {
            res.render("summerc7", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    summerc8: async (req, res) => {
        connection.query('SELECT * FROM product WHERE image_name = "summerc8', function (err, rows) {
            res.render("summerc8", { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },
  
    Coat1: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat1"', function (err, rows) {
            res.render('Coat1', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat2: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat2"', function (err, rows) {
            res.render('Coat2', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat3: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat3"', function (err, rows) {
            res.render('Coat3', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat4: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat4"', function (err, rows) {
            res.render('Coat4', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat5: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat5"', function (err, rows) {
            res.render('Coat5', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat6: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat6"', function (err, rows) {
            res.render('Coat6', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat7: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat7"', function (err, rows) {
            res.render('Coat7', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },

    Coat8: async (req, res) => {
        // const id = req.session.loginData;
        // const logincheck = req.session.loginCheck;
        connection.query('SELECT * FROM product WHERE image_name = "Coat8"', function (err, rows) {
            res.render('Coat8', { name: rows[0].name, url: rows[0].url, price: rows[0].price, image_name: rows[0].image_name });
        })
    },
}

module.exports = {
    controller,
    output
};