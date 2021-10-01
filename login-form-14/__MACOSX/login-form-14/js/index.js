function validation() {
    let username = document.getElementById("username").value;
    let pass = document.getElementById("password").value;
    if (username != "" && pass != "") {
        document.getElementById("submit").disabled = false;
    } else {
        document.getElementById("submit").disabled = true;
    }
}