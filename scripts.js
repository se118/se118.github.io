let cart = [];
let total = 0;

// Add product to cart
function addProduct(name, price, button) {
    cart.push({ name, price });
    total += price;
    updateCart();
    triggerFireworks(button);
}

// Update cart display
function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `<p>${item.name}: LE ${item.price.toFixed(2)}</p>`).join('');
    document.getElementById('total-price').textContent = `LE ${total.toFixed(2)}`;
}

// Fireworks effect on product add
function triggerFireworks(button) {
    const canvas = document.getElementById('fireworks-canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Simple Firework Animation
    let fireworks = [];
    const numParticles = 100;
    
    for (let i = 0; i < numParticles; i++) {
        const x = button.getBoundingClientRect().left + button.offsetWidth / 2;
        const y = button.getBoundingClientRect().top + button.offsetHeight / 2;
        fireworks.push(new Firework(x, y));
    }

    function Firework(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 5 + 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
        this.alpha = 1;
        this.dx = (Math.random() - 0.5) * 8;
        this.dy = (Math.random() - 0.5) * 8;
        this.gravity = 0.1;
    }

    Firework.prototype.update = function () {
        this.x += this.dx;
        this.y += this.dy;
        this.dy += this.gravity;
        this.alpha -= 0.02;
    };

    Firework.prototype.draw = function (ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    function animateFireworks() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fireworks = fireworks.filter(firework => firework.alpha > 0);
        fireworks.forEach(firework => {
            firework.update();
            firework.draw(ctx);
        });

        if (fireworks.length > 0) {
            requestAnimationFrame(animateFireworks);
        }
    }

    animateFireworks();
}

// Checkout button event
document.getElementById('checkout-button').addEventListener('click', () => {
    const orderDetails = cart.map(item => `${item.name}: LE ${item.price.toFixed(2)}`).join(', ');
    const message = `Order: ${orderDetails} Total: LE ${total.toFixed(2)}`;
    window.open(`https://wa.me/201112418887?text=${encodeURIComponent(message)}`);
});
