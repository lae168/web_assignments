window.addEventListener("load", () => {
    if (localStorage.getItem('form_prj')) {
        window.location.href = "landing.html";
    }
});

const inputName = document.getElementById("name");
const nameError = document.getElementById("errorName");
const inputMail = document.getElementById("email");
const mailError = document.getElementById("errorMail");
const inputPwd = document.getElementById("password");
const pwdError = document.getElementById("errorPwd");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", async function (event) {
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
        try {
            
            const response = await fetch('http://httpbin.org/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nameValue, mailValue, pwdValue })
            });

            if (!response.ok) {
                throw new Error('Invalid credentials');
            }


            localStorage.setItem('form_prj',
                JSON.stringify(data));

            
            console.log('Login successful!');
            console.log(response.json().then(res => console.log(res)));
        } catch (error) {
            console.error('Login failed:', error);
        }


        
        window.location.href = "landing.html";
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

})