const togglePasswordButton = document.querySelector('#toggle-password');
const passwordElement = document.querySelector('#password');
const closedEyeIcon = document.querySelector('#closed-eye');
const openEyeIcon = document.querySelector('#open-eye');
let isPasswordVisible = true;

togglePasswordButton.addEventListener('click', function() {
    if(!isPasswordVisible) {
        // make password visible
        passwordElement.type = 'text';
        closedEyeIcon.classList.add('hide');
        openEyeIcon.classList.remove('hide');
    } else {
        // make password hidden
        passwordElement.type = 'password';
        closedEyeIcon.classList.remove('hide');
        openEyeIcon.classList.add('hide');
    }
    isPasswordVisible = !isPasswordVisible;
});