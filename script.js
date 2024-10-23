let cart = [];
let products = [];

// Render products in the store
function renderProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    
    products.forEach(product => {
        const productElement = `
            <div class="product" data-id="${product.id}">
                <img src="${product.imageUrl}" alt="${product.name}" />
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
                <p class="description">${product.description}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        productList.innerHTML += productElement;
    });
}

// Add new product to the store
document.getElementById('add-product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const description = document.getElementById('product-description').value;
    const imageUrl = document.getElementById('product-image').value;

    const newProduct = {
        id: products.length + 1,
        name,
        price,
        description,
        imageUrl
    };

    products.push(newProduct);
    renderProducts();

    // Clear the form
    document.getElementById('add-product-form').reset();
});

// Admin login
document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const password = document.getElementById('admin-password').value;
    const adminPassword = '88#Seif#88'; // Set your desired admin password here

    if (password === adminPassword) {
        document.getElementById('admin-section').style.display = 'block';
        alert('Admin login successful.');
    } else {
        alert('Invalid password. Access denied.');
    }
});

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartProduct = cart.find(p => p.id === productId);
    
    if (cartProduct) {
        cartProduct.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
}

// Remove product from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// Update the cart display and total price
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPrice = document.getElementById('total-price');

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.name} - $${item.price.toFixed(2)} 
            <div class="quantity-control">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
            </div>
            <button onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPrice.textContent = total.toFixed(2);
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

// Increase product quantity in the cart
function increaseQuantity(index) {
    cart[index].quantity++;
    updateCartUI();
}

// Decrease product quantity in the cart
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        removeFromCart(index);
    }
    updateCartUI();
}

// Checkout and send order details to WhatsApp
function checkout() {
    if (cart.length === 0) {
        alert("Your cart is empty.");
        return;
    }

    let message = "Order details:%0A%0A";
    cart.forEach(item => {
        message += `${item.name} - Quantity: ${item.quantity}, Price: $${(item.price * item.quantity).toFixed(2)}%0A`;
    });
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    message += `%0ATotal Price: $${total.toFixed(2)}`;

    const phoneNumber = '201112418887';  // Replace with the target phone number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;

    // Redirect to WhatsApp to send the message
    window.open(whatsappURL, '_blank');
}

// Load initial products
function loadInitialProducts() {
    products = [
        { id: 1, name: "Product 1", price: 29.99, description: "High-quality product with great features", imageUrl: "https://m.media-amazon.com/images/I/81fsQAqKoWL.__AC_SX300_SY300_QL70_FMwebp_.jpg" },
        { id: 2, name: "Product 2", price: 49.99, description: "Premium design and durability", imageUrl: "https://m.media-amazon.com/images/I/71L2vXVmsKL.__AC_SX300_SY300_QL70_FMwebp_.jpg" },
        { id: 3, name: "Product 3", price: 19.99, description: "Affordable product for everyday use", imageUrl: "https://m.media-amazon.com/images/I/71wqAVUafBL.__AC_SX300_SY300_QL70_FMwebp_.jpg" }
    ];
    renderProducts();
}

// Initialize the app
loadInitialProducts();
