// scripts.js

let cart = [];
let total = 0;

// Fireworks variables
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function addProduct(name, price, button) {
    const product = { name, price };
    cart.push(product);
    total += price;

    // Update cart display
    displayCart();

    // Get the position of the button to position fireworks
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2 + window.scrollY;

    showFireworks(x, y); // Fireworks at the button's position
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - LE ${item.price.toFixed(2)}`; // Changed to LE
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: LE ${total.toFixed(2)}`; // Changed to LE
}

// Fireworks effect function
function showFireworks(x, y) {
    const particles = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw(ctx);

            // Remove particle if it goes out of bounds
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01; // Fade out
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    const orderDetails = cart.map(item => `${item.name}: LE ${item.price.toFixed(2)}`).join(', '); // Changed to LE
    const message = `Order: ${orderDetails} Total: LE ${total.toFixed(2)}`; // Changed to LE
    window.open(`https://wa.me/201112418887?text=${encodeURIComponent(message)}`);
});
// scripts.js

let cart = [];
let total = 0;

// Fireworks variables
const canvas = document.getElementById('fireworks-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function addProduct(name, price, button) {
    const product = { name, price };
    cart.push(product);
    total += price;

    // Update cart display
    displayCart();

    // Get the position of the button to position fireworks
    const rect = button.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2 + window.scrollY;

    showFireworks(x, y); // Fireworks at the button's position
}

function displayCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - LE ${item.price.toFixed(2)}`; // Changed to LE
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: LE ${total.toFixed(2)}`; // Changed to LE
}

// Fireworks effect function
function showFireworks(x, y) {
    const particles = [];
    const numParticles = 100;

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle(x, y));
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            particle.update();
            particle.draw(ctx);

            // Remove particle if it goes out of bounds
            if (particle.alpha <= 0) {
                particles.splice(index, 1);
            }
        });

        if (particles.length) {
            requestAnimationFrame(animate);
        }
    }
    animate();
}

// Particle class
class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 1;
        this.speedX = (Math.random() - 0.5) * 6;
        this.speedY = (Math.random() - 0.5) * 6;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.alpha -= 0.01; // Fade out
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

// Event listener for checkout button
document.getElementById('checkout-button').addEventListener('click', () => {
    const orderDetails = cart.map(item => `${item.name}: LE ${item.price.toFixed(2)}`).join(', '); // Changed to LE
    const message = `Order: ${orderDetails} Total: LE ${total.toFixed(2)}`; // Changed to LE
    window.open(`https://wa.me/201112418887?text=${encodeURIComponent(message)}`);
});
