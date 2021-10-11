const handelSubmit = () => {
  let userName = document.getElementById("userName").value;
  let password = document.getElementById("password").value;

  if (userName === "") {
    return;
  }

  if (password === "") {
    return;
  }

  console.log(userName);
  console.log(password);

  document.getElementById("userName").value = "";
  document.getElementById("password").value = "";
};
