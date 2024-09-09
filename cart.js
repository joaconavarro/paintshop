document.addEventListener('DOMContentLoaded', () => {
    const cartDrawer = document.getElementById('cart-drawer');
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    const cartButton = document.getElementById('cart-button');
    const cartButtonDiv = document.getElementById('cart-button-div');
    const checkoutButton = document.getElementById('checkout-button');
    const closeDrawerButton = document.getElementById('close-drawer');
    const cart = {}; // Object to store cart items with their quantities

    // Function to update the cart quantity display
    function updateCartButtonQuantity() {
        if (!cartButton) {
            console.error('Cart button not found!');
            return;
        }
        const totalQuantity = Object.values(cart).reduce((total, item) => total + item.quantity, 0);
        
        // Update only the quantity text node, preserve existing HTML structure
        const quantityElement = cartButton.querySelector('.cart-quantity');
        if (quantityElement) {
            quantityElement.textContent = `(${totalQuantity})`;
        } else {
            // Create a new quantity element if it doesn't exist
            cartButton.insertAdjacentHTML('beforeend', ` <span class="cart-quantity">(${totalQuantity})</span>`);
        }
    }

    // Function to render cart items
    function renderCart() {
        if (!cartItemsContainer) {
            console.error('Cart items container not found!');
            return;
        }
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let totalPrice = 0;
    
        for (const [itemId, item] of Object.entries(cart)) {
            const itemHTML = `
                <div class="cart-item" data-id="${itemId}">
                    <div class="cart-item-info">
                        <img src="${item.image}" alt="${item.title}" style="width:50px">
                        <div>
                            <h4>${item.title}</h4>
                            <p>${item.price}</p>
                            <p>Quantity: ${item.quantity}</p>
                        </div>
                    </div>
                    <div class="cart-item-actions">
                        <button class="increase-quantity">+</button>
                        <button class="decrease-quantity">-</button>
                        <button class="remove-item">Remove</button>
                    </div>
                </div>
            `;
            cartItemsContainer.innerHTML += itemHTML;
            totalPrice += parseFloat(item.price.replace('$', '')) * item.quantity;
        }
    
        // Update total price
        if (totalPriceElement) {
            totalPriceElement.textContent = `Total: $${totalPrice.toFixed(2)}`;
        } else {
            console.error('Total price element not found!');
        }
    
        // Update the cart button quantity display
        updateCartButtonQuantity();
    }
    

    // Add item to cart
    function addToCart(item) {
        const itemId = item.title; // Assuming title is unique
        if (cart[itemId]) {
            if (cart[itemId].quantity < item.stock) {
                cart[itemId].quantity += 1;
            } else {
                console.log('Cannot increase quantity. Stock limit reached.');
                return;
            }
        } else {
            cart[itemId] = {
                image: item.image,
                title: item.title,
                price: item.price,
                quantity: 1,
                stock: item.stock // Ensure stock is included
            };
        }
        renderCart();
    }
    

    // Handle cart actions
    function handleCartAction(event) {
        const target = event.target;
        if (!target.closest('.cart-item-actions')) return;
    
        const itemElement = target.closest('.cart-item');
        if (!itemElement) return;
    
        const itemId = itemElement.getAttribute('data-id');
        const item = cart[itemId];
    
        if (!item) {
            console.error('Item not found in cart:', itemId);
            return;
        }
    
        if (target.classList.contains('increase-quantity')) {
            if (item.quantity < item.stock) {
                item.quantity += 1;
            } else {
                console.log('Cannot increase quantity. Stock limit reached.');
                return;
            }
        } else if (target.classList.contains('decrease-quantity')) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            } else {
                delete cart[itemId];
            }
        } else if (target.classList.contains('remove-item')) {
            delete cart[itemId];
        }
        renderCart();
    }
    
    
    

    // Add event listeners
    document.addEventListener('click', (event) => {
        if (event.target.classList.contains('add-to-cart')) {
            const item = {
                image: event.target.dataset.image,
                title: event.target.dataset.title,
                price: event.target.dataset.price,
                stock: event.target.dataset.stock
            };
            addToCart(item);
        } else if (event.target.classList.contains('increase-quantity') ||
                   event.target.classList.contains('decrease-quantity') ||
                   event.target.classList.contains('remove-item')) {
            handleCartAction(event);
        }
    });

    // Open and close drawer
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            cartDrawer.classList.toggle('show');
        });
    }

    if (closeDrawerButton) {
        closeDrawerButton.addEventListener('click', () => {
            cartDrawer.classList.remove('show');
        });
    }

    // Checkout button navigation
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            window.location.href = '/pagar-mp.html';
        });
    }
});
