let adminEmail = 'pramietest@gmail.com'; // Replace with your admin email

function onSignIn(googleUser) {
    const idToken = googleUser.getAuthResponse().id_token;
    fetch('http://localhost:3000/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    })
    .then(response => response.json())
    .then(result => {
        if (result.authorized) {
            document.getElementById('login-section').style.display = 'none';
            document.getElementById('admin-panel').style.display = 'block';
        } else {
            document.getElementById('login-error').style.display = 'block';
            gapi.auth2.getAuthInstance().signOut();
        }
    });
}


async function verifyTokenOnServer(idToken) {
    const response = await fetch('/verify-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
    });
    const result = await response.json();
    return result.authorized;
}
