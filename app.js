document.addEventListener('DOMContentLoaded', () => {
    let jsonData = {};
    let cart = {}; // Define cart here

    // Fetch JSON data
    function fetchJsonData() {
        fetch('items.json') // Fetch JSON data from the server
            .then(response => response.json())
            .then(data => {
                jsonData = data;
                console.log('Loaded JSON Data:', jsonData);
            })
            .catch(error => console.error('Error fetching JSON:', error));
    }

    fetchJsonData(); // Load JSON data when the page loads

    // Update stock on checkout
    function updateStockOnCheckout() {
        if (!jsonData.items) {
            console.error('JSON data not loaded');
            return;
        }

        jsonData.items.forEach(item => {
            const cartItem = cart[item.title];
            if (cartItem) {
                const newStock = parseInt(item.stock, 10) - cartItem.quantity;
                item.stock = newStock;
            }
        });

        console.log('Updating stock with:', jsonData); // Debugging

        fetch('/update-stock', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        }).then(response => {
            if (response.ok) {
                console.log('Stock updated successfully.');
            } else {
                console.error('Failed to update stock.');
            }
        }).catch(error => {
            console.error('Error:', error);
        });
    }

    document.getElementById('checkout-button').addEventListener('click', () => {
        updateStockOnCheckout();
        //window.location.href = '/pagar-mp.html';
    });
    
});

