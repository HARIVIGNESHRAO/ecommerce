let cart = JSON.parse(localStorage.getItem('cart')) || [];

const products = [
    { id: 1, name: "Premium Hoodie", price: 1299, img: "https://picsum.photos/id/20/300/300" },
    { id: 2, name: "Slim Fit Jeans", price: 899, img: "https://picsum.photos/id/21/300/300" },
    { id: 3, name: "White Sneakers", price: 1599, img: "https://picsum.photos/id/60/300/300" },
    { id: 4, name: "Casual Shirt", price: 699, img: "https://picsum.photos/id/64/300/300" },
];

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById('cartCount').textContent = cart.length;
}

function navigateTo(page) {
    const main = document.getElementById('main-content');

    if (page === 'home') {
        main.innerHTML = `<h1 style="text-align:center; margin-top:3rem;">Welcome to Trendy Fashion Store</h1>`;
    }
    else if (page === 'shop') {
        let html = `<h1>Our Products</h1><div class="products-grid">`;
        products.forEach(p => {
            html += `
                <div class="product-card">
                    <img src="${p.img}" alt="${p.name}">
                    <h3>${p.name}</h3>
                    <p>₹${p.price}</p>
                    <button class="add-to-cart" onclick="addToCart(${p.id})">Add to Cart</button>
                </div>`;
        });
        html += `</div>`;
        main.innerHTML = html;
    }
    else if (page === 'cart') {
        let html = `<h1>Your Cart</h1>`;
        if (cart.length === 0) {
            html += `<p>Your cart is empty</p>`;
        } else {
            cart.forEach((item, i) => {
                html += `<div class="cart-item">
                    <span>${item.name} - ₹${item.price}</span>
                    <button onclick="removeFromCart(${i})">Remove</button>
                </div>`;
            });
            const total = cart.reduce((sum, item) => sum + item.price, 0);
            html += `<h2>Total: ₹${total}</h2>`;
        }
        main.innerHTML = html;
    }
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    saveCart();
    alert(`${product.name} added to cart!`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    navigateTo('cart');
}

// Theme Toggle
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    document.querySelector('.theme-toggle').textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Initial Load
navigateTo('home');
saveCart();