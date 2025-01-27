document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert('Please fill in both fields.');
        return;
    }

    // Simulate login success for demo purposes
    alert('Login successful (demo only)');
});
const hideCharacterCheckbox = document.getElementById('hide-character');
const passwordField = document.getElementById('password');

hideCharacterCheckbox.addEventListener('change', () => {
    const type = hideCharacterCheckbox.checked ? 'password' : 'text';
    passwordField.setAttribute('type', type);
});
