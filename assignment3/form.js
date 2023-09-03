// script.js
document.addEventListener("DOMContentLoaded", function () {
    const inputName = document.getElementById("name");
    const nameError = document.getElementById("errorName");
    const inputMail = document.getElementById("email");
    const mailError = document.getElementById("errorMail");
    const inputPwd = document.getElementById("password");
    const pwdError = document.getElementById("errorPwd");
    const loginBtn = document.getElementById("login-btn");


    const formAnchor = document.getElementById("form");

    function changeAnchorColor() {
        formAnchor.style.color = "blue";
        formAnchor.style.borderBottomColor = "blue"

    }


    window.addEventListener("load", changeAnchorColor);

    loginBtn.addEventListener("click", function (event) {
        event.preventDefault();

        const nameValue = inputName.value;
        const regexName = /^(?=.*[a-z])(?=.*\d).+$/;

        const mailValue = inputMail.value;
        const regexMail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        const pwdValue = inputPwd.value;
        const regexPwd = /^.{6}$/;

        if (regexName.test(nameValue)) {
            nameError.textContent = "";
        } else {
            nameError.textContent = "Name must inclde a lowercase letter and a number";

        }

        if (regexMail.test(mailValue)) {
            mailError.textContent = "";
        } else {
            mailError.textContent = "Invalid email format";

        }


        if (regexPwd.test(pwdValue)) {
            pwdError.textContent = "";
        } else {
            pwdError.textContent = "Password must contain 6 characters";

        }
    });
});