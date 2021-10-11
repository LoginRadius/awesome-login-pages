let btnLogin = document.getElementById("login");
let btnSignUp = document.getElementById("signup");

let login = document.querySelector(".login");
let signUp = document.querySelector(".signup");

document.addEventListener("DOMContentLoaded", () => {
    login.classList.add("active");
    signUp.classList.add("inActive");
});
  
btnLogin.onclick = function(){
    login.classList.add("active");
    signUp.classList.add("inActive");
}

btnSignUp.onclick = function(){
   login.classList.remove("active");
   signUp.classList.remove("inActive");
}

