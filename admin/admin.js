document.addEventListener('DOMContentLoaded', () => {
    const loadDataButton = document.getElementById('load-data');
    const saveDataButton = document.getElementById('save-data');
    const itemList = document.getElementById('item-list');
    const itemForm = document.getElementById('item-form');
    const itemIdInput = document.getElementById('item-id');
    const itemImageInput = document.getElementById('item-image');
    const itemTitleInput = document.getElementById('item-title');
    const itemPriceInput = document.getElementById('item-price');
    const itemDescriptionInput = document.getElementById('item-description');
    const itemStockInput = document.getElementById('item-stock');


    function loadItems() {
        fetch('../items.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                items = data.items || []; // Ensure items is an array
                renderItems();
            })
            .catch(error => console.error('Error fetching items:', error));
    }

    // In-memory store for items
    let items = []; 

    // Function to render items in the list
    function renderItems() {
        itemList.innerHTML = items.map(item => `
            <li data-id="${item.id}">
                <img src="${item.image}" alt="${item.title}" style="width:50px">
                <div>
                    <h4>${item.title}</h4>
                    <p>${item.price}</p>
                    <p>${item.description}</p>
                    <p>Stock: ${item.stock}</p>
                    <button class="edit-item">Edit</button>
                    <button class="delete-item">Delete</button>
                </div>
            </li>
        `).join('');
    }

    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault();
        const id = itemIdInput.value;
        const image = itemImageInput.value;
        const title = itemTitleInput.value;
        const price = itemPriceInput.value;
        const description = itemDescriptionInput.value;
        const stock = itemStockInput.value;

        if (id) {
            // Edit existing item
            const item = items.find(item => item.id === id);
            if (item) {
                item.image = image;
                item.title = title;
                item.price = price;
                item.description = description;
                item.stock = stock;
            }
        } else {
            // Add new item
            const newItem = {
                id: Date.now().toString(),
                image,
                title,
                price,
                description,
                stock
            };
            items.push(newItem);
        }

        renderItems();
        itemForm.reset();
    }

    // Function to handle item list click events
    function handleItemListClick(event) {
        const target = event.target;
        const itemElement = target.closest('li');
        const itemId = itemElement && itemElement.dataset.id;

        if (target.classList.contains('edit-item')) {
            const item = items.find(item => item.id === itemId);
            if (item) {
                itemIdInput.value = item.id;
                itemImageInput.value = item.image;
                itemTitleInput.value = item.title;
                itemPriceInput.value = item.price;
                itemDescriptionInput.value = item.description;
                itemStockInput.value = item.stock;
            }
        } else if (target.classList.contains('delete-item')) {
            items = items.filter(item => item.id !== itemId);
            renderItems();
        }
    }

    // Event listeners
    loadDataButton.addEventListener('click', loadItems);
    saveDataButton.addEventListener('click', () => {
        // Save data to localStorage (optional)
        localStorage.setItem('items', JSON.stringify(items));
    });
    itemForm.addEventListener('submit', handleFormSubmit);
    itemList.addEventListener('click', handleItemListClick);

    // Load data from localStorage on page load
    const savedItems = localStorage.getItem('items');
    if (savedItems) {
        items = JSON.parse(savedItems);
        renderItems();
    }
});

