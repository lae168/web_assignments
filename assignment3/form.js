window.addEventListener("load", () => {
    if (localStorage.getItem('form_prj')) {
        window.location.href = "profile.html";
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const inputName = document.getElementById("name");
    const nameError = document.getElementById("errorName");
    const inputMail = document.getElementById("email");
    const mailError = document.getElementById("errorMail");
    const inputPwd = document.getElementById("password");
    const pwdError = document.getElementById("errorPwd");
    const loginBtn = document.getElementById("login-btn");


    const formAnchor = document.getElementById("form");
    // Call the function to change the button's color when the page loads
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

        if (regexName.test(nameValue) &&
            regexMail.test(mailValue) &&
            regexPwd.test(pwdValue)
        ) {
            nameError.textContent = "";
            mailError.textContent = "";
            pwdError.textContent = "";
            const data = {
                name: nameValue,
                mail: mailValue,
                pwd: pwdValue
            };

            localStorage.setItem('form_prj',
                JSON.stringify(data));

            window.location.href = "profile.html";
        } else {
            if (!regexName.test(nameValue)) {
                nameError.textContent = "Name must include a lowercase letter and a number";
            } else {
                nameError.textContent = "";
            }



            if (!regexMail.test(mailValue)) {
                mailError.textContent = "Invalid email format";
            } else {
                mailError.textContent = "";
            }


            if (!regexPwd.test(pwdValue)) {
                pwdError.textContent = "Password must contain 6 characters";
            } else {
                pwdError.textContent = "";
            }
        }

    });
});