document.addEventListener('DOMContentLoaded', function() {
    // Menu data - replace with your actual menu items
    const menuData = {
        'starters': [
            { id: 1, name: 'Paneer Tikka', description: 'Cottage cheese marinated in spices and grilled', price: 300, veg: true },
            { id: 2, name: 'Chicken Tikka', description: 'Tender chicken pieces marinated in spices and grilled', price: 400, veg: false },
            { id: 3, name: 'Spring Rolls', description: 'Crispy vegetable spring rolls with sweet chili sauce', price: 250, veg: true },
            { id: 4, name: 'Hara Bhara Kebab', description: 'Spinach and green pea patties', price: 280, veg: true }
        ],
        'main-course': [
            { id: 5, name: 'Butter Chicken', description: 'Tender chicken in rich tomato and butter gravy', price: 500, veg: false },
            { id: 6, name: 'Paneer Butter Masala', description: 'Cottage cheese in creamy tomato gravy', price: 400, veg: true },
            { id: 7, name: 'Dal Makhani', description: 'Black lentils cooked with butter and cream', price: 350, veg: true },
            { id: 8, name: 'Veg Biryani', description: 'Fragrant basmati rice with mixed vegetables', price: 300, veg: true }
        ],
        'desserts': [
            { id: 9, name: 'Gulab Jamun', description: 'Soft milk dumplings in sugar syrup', price: 150, veg: true },
            { id: 10, name: 'Rasmalai', description: 'Cottage cheese patties in sweetened milk', price: 180, veg: true },
            { id: 11, name: 'Chocolate Mousse', description: 'Rich chocolate dessert with whipped cream', price: 200, veg: true },
            { id: 12, name: 'Kaju Katli', description: 'Cashew fudge with silver leaf', price: 250, veg: true }
        ],
        'beverages': [
            { id: 13, name: 'Mojito (Mocktail)', description: 'Mint, lime, and soda', price: 150, veg: true },
            { id: 14, name: 'Mango Lassi', description: 'Sweet yogurt drink with mango', price: 120, veg: true },
            { id: 15, name: 'Masala Chai', description: 'Spiced Indian tea', price: 80, veg: true },
            { id: 16, name: 'Fresh Lime Soda', description: 'Sweet or salty lime drink', price: 100, veg: true }
        ]
    };

    const menuItemsContainer = document.getElementById('menu-items');
    const selectedItemsList = document.getElementById('selected-items-list');
    const categoryTabs = document.querySelectorAll('.category');
    let selectedItems = [];

    // Load menu items for the first category by default
    loadMenuItems('starters');

    // Add click event to category tabs
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            categoryTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            // Load menu items for selected category
            const category = this.getAttribute('data-category');
            loadMenuItems(category);
        });
    });

    // Load menu items for a specific category
    function loadMenuItems(category) {
        const items = menuData[category] || [];
        menuItemsContainer.innerHTML = '';

        if (items.length === 0) {
            menuItemsContainer.innerHTML = '<p class="no-items">No items available in this category.</p>';
            return;
        }

        items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.dataset.id = item.id;
            itemElement.innerHTML = `
                <div class="item-info">
                    <h4>${item.name} <span class="item-price">₹${item.price}</span></h4>
                    <p class="item-desc">${item.description}</p>
                    <div class="item-meta">
                        <span class="item-type ${item.veg ? 'veg' : 'non-veg'}">
                            ${item.veg ? '🟢 Veg' : '🔴 Non-Veg'}
                        </span>
                    </div>
                </div>
                <button class="add-to-menu">
                    <i class="fas fa-plus"></i> Add
                </button>
            `;
            menuItemsContainer.appendChild(itemElement);
        });

        // Add event listeners to all add buttons
        document.querySelectorAll('.add-to-menu').forEach(button => {
            button.addEventListener('click', function() {
                const menuItem = this.closest('.menu-item');
                const itemId = parseInt(menuItem.dataset.id);
                addToSelectedItems(itemId);
            });
        });
    }

    // Add item to selected items
    function addToSelectedItems(itemId) {
        // Find the item in all categories
        let selectedItem = null;
        for (const category in menuData) {
            const found = menuData[category].find(item => item.id === itemId);
            if (found) {
                selectedItem = found;
                break;
            }
        }

        if (!selectedItem) return;

        // Check if item is already selected
        const existingItem = selectedItems.find(item => item.id === itemId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            selectedItems.push({
                ...selectedItem,
                quantity: 1
            });
        }

        updateSelectedItems();
    }

    // Update the selected items list
    function updateSelectedItems() {
        selectedItemsList.innerHTML = '';
        let totalPrice = 0;
        let totalItems = 0;

        if (selectedItems.length === 0) {
            selectedItemsList.innerHTML = '<li class="empty-cart">No items selected yet</li>';
        } else {
            selectedItems.forEach((item, index) => {
                const itemTotal = item.price * item.quantity;
                totalPrice += itemTotal;
                totalItems += item.quantity;

                const li = document.createElement('li');
                li.className = 'selected-item';
                li.innerHTML = `
                    <div class="item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-price">₹${item.price} x ${item.quantity} = ₹${itemTotal}</span>
                    </div>
                    <div class="item-actions">
                        <button class="quantity-btn minus" data-index="${index}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-btn plus" data-index="${index}">+</button>
                        <button class="remove-item" data-index="${index}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                `;
                selectedItemsList.appendChild(li);
            });
        }

        // Update summary
        document.querySelector('.total-items span').textContent = totalItems;
        document.querySelector('.total-price span').textContent = totalPrice;

        // Add event listeners to quantity buttons
        document.querySelectorAll('.quantity-btn').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                if (this.classList.contains('plus')) {
                    selectedItems[index].quantity += 1;
                } else if (this.classList.contains('minus')) {
                    if (selectedItems[index].quantity > 1) {
                        selectedItems[index].quantity -= 1;
                    } else {
                        selectedItems.splice(index, 1);
                    }
                }
                updateSelectedItems();
            });
        });

        // Add event listeners to remove buttons
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const index = parseInt(this.dataset.index);
                selectedItems.splice(index, 1);
                updateSelectedItems();
            });
        });
    }

    // Handle form submission
    document.getElementById('submit-menu').addEventListener('click', function() {
        if (selectedItems.length === 0) {
            alert('Please add items to your menu before submitting.');
            return;
        }

        // Create a simple form to submit the data
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = '#'; // Replace with your form submission URL
        
        // Add selected items to form data
        selectedItems.forEach((item, index) => {
            const itemInput = document.createElement('input');
            itemInput.type = 'hidden';
            itemInput.name = `items[${index}][name]`;
            itemInput.value = item.name;
            form.appendChild(itemInput);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'hidden';
            quantityInput.name = `items[${index}][quantity]`;
            quantityInput.value = item.quantity;
            form.appendChild(quantityInput);
        });

        // Add total price
        const totalInput = document.createElement('input');
        totalInput.type = 'hidden';
        totalInput.name = 'total_price';
        totalInput.value = document.querySelector('.total-price span').textContent;
        form.appendChild(totalInput);

        // Submit the form
        document.body.appendChild(form);
        form.submit();
    });
});
