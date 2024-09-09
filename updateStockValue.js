let jsonData = {};

function fetchJsonData() {
    fetch('items.json') // URL to your JSON file
        .then(response => response.json())
        .then(data => {
            jsonData = data; // Store JSON data in variable
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

fetchJsonData(); // Call this function to load the data when your app starts

function updateStockOnCheckout() {
    // Ensure jsonData is loaded
    if (!jsonData.items) {
        console.error('JSON data not loaded');
        return;
    }

    // Update stock based on cart
    jsonData.items.forEach(item => {
        const cartItem = cart[item.title];
        if (cartItem) {
            const newStock = parseInt(item.stock, 10) - cartItem.quantity;
            item.stock = newStock;
        }
    });

    console.log('Updated JSON Data:', jsonData); // Debugging

    // Send updated data to the server
    fetch('update-stock', { // URL to your server endpoint
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
    // Redirect to checkout page or perform further actions
    //window.location.href = '/pagar-mp.html';
});
