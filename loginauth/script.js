document.getElementById('registerForm').addEventListener('submit', register);
document.getElementById('loginForm').addEventListener('submit', login);
document.getElementById('logoutButton').addEventListener('click', logout);

async function hashPassword(password) {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(password));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function register(event) {
    event.preventDefault();
    const username = document.getElementById('regUsername').value;
    const password = document.getElementById('regPassword').value;

    if (localStorage.getItem(username)) {
        alert('Error: Username already exists!');
        return;
    }

    hashPassword(password).then(hashedPassword => {
        localStorage.setItem(username, hashedPassword);
        alert('Registration successful!');
        document.getElementById('registerForm').reset();
    });
}

function login(event) {
    event.preventDefault();
    const username = document.getElementById('logUsername').value;
    const password = document.getElementById('logPassword').value;

    hashPassword(password).then(hashedPassword => {
        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === hashedPassword) {
            alert('Login successful!');
            showSecuredPage();
        } else {
            alert('Error: Invalid username or password!');
        }
    });
}

function showSecuredPage() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.add('hidden');
    document.getElementById('secured').classList.remove('hidden');
}

function logout() {
    document.getElementById('register').classList.remove('hidden');
    document.getElementById('login').classList.remove('hidden');
    document.getElementById('secured').classList.add('hidden');
    document.getElementById('registerForm').reset();
    document.getElementById('loginForm').reset();
}
