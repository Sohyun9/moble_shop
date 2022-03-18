const mypagebtn = document.getElementById("btn1");

mypagebtn.addEventListener("click", login);

function login() {
    const req = {
        name: body.name,
        phone: body.phone,
        address: body.address
    };

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