document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    // Define a function to fetch and parse data from Google Sheets
    function fetchSheetData(callback) {
        const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRoCz5PkycEarR7M7RP4sMQZq0jp9eeiwHXF41D_Ov2ghb09usBQ5gBGwm9XTyIdK2-R_ac2PBSakv3/pub?gid=0&single=true&output=csv'; // Replace with your sheet URL
    
        fetch(sheetUrl)
        .then(response => response.text())
        .then(text => {

            // Split CSV text into rows
            const rows = text.trim().split('\n').map(row => row.split(','));

            // Ensure there are enough rows and columns
            if (rows.length < 2 || rows[1].length < 2) {
                throw new Error('CSV does not have enough data');
            }

            // Extract username and password from specific rows and columns
            const data = {
                username: rows[1][0]?.trim() || '', // Should be 'admin'
                password: rows[1][1]?.trim() || ''  // Should be '1234'
            };
            callback(data);
        })
        .catch(error => console.error('Error fetching sheet data:', error));
    }

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Fetch sheet data and validate credentials
            fetchSheetData((sheetData) => {
                // Direct comparison since sheetData is an object
                if (username === sheetData.username && password === sheetData.password) {
                    localStorage.setItem('isAuthenticated', 'true');
                    window.location.href = 'admin-site.html'; // Redirect after successful login
                } else {
                    alert('Invalid credentials');
                }
            });
        });
    }
});
