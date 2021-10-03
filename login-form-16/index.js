function show() {
    var password = document.getElementById("password");
    var icon = document.querySelector(".fas");

    // ========== Checking type of password ===========
    if (password.type === "password") {
      password.type = "text";
    } else {
      password.type = "password";
    }
  }