window.addEventListener("load", () => {
    if (!localStorage.getItem('form_prj')) {
        window.location.href = "form.html";
    }


    let welcome = document.getElementById("name");
    let {name, ...storage} = JSON.parse(localStorage.getItem('form_prj'));

    welcome.innerHTML = `Welcome ${name}`;
});

