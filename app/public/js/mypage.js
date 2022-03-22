const mypagebtn = document.getElementById("btn1");
// const id = document.getElementById("id");
// const name = document.getElementById("name");
// const pwd = document.getElementById("pwd");
// const phone = document.getElementById("phone");
// const address = document.getElementById("address");
// const connection = require('../../config/dbconfig');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mypagebtn.addEventListener("click", mypage);

function mypage() {
    fetch("/main/mypage", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res.body) {
                location.href = "/main/mysql";
            } else {
                alert(res.msg);
            }
        })
        .catch((err) => {
            console.error(new Error("로그인 중 에러 발생"));
        })
}

