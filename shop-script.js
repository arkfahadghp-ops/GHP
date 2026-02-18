const products = [
    { id: 1, name: "Zypsum", price: 600, category: "Nutrition", img: "resorse/WhatsApp Image 2026-02-18 at 3.35.59 PM.png" },
    { id: 2, name: "BloomMax Bio-Stimulant", price: 850, category: "Bio-Stimulants", img: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "NitroFast Liquid", price: 450, category: "Nutrition", img: "https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&w=300&q=80" }
];

let cart = [];

// Initialize Shop
function initShop() {
    const display = document.getElementById('product-display');
    display.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-img">
            <span class="sub-heading" style="font-size: 0.6rem">${p.category}</span>
            <h4>${p.name}</h4>
            <span class="price">৳ ${p.price}</span>
            <button class="btn primary full-width" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
    `).join('');
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
    const overlay = document.getElementById('cartOverlay');
    overlay.style.display = overlay.style.display === 'block' ? 'none' : 'block';
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    updateCartUI();
    
    // Optional: Open cart automatically when item added
    if(!document.getElementById('cartDrawer').classList.contains('open')) {
        toggleCart();
    }
}

function updateCartUI() {
    const cartContainer = document.getElementById('cartItems');
    const countLabel = document.getElementById('cart-count');
    const totalLabel = document.getElementById('cartTotal');
    
    countLabel.innerText = cart.length;
    
    if (cart.length === 0) {
        cartContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
        totalLabel.innerText = "৳ 0";
        return;
    }

    let total = 0;
    cartContainer.innerHTML = cart.map((item, index) => {
        total += item.price;
        return `
            <div class="cart-item">
                <div style="flex: 1">
                    <h5 style="color: var(--primary)">${item.name}</h5>
                    <small>৳ ${item.price}</small>
                </div>
                <button onclick="removeFromCart(${index})" style="background:none; border:none; color:var(--secondary); cursor:pointer">
                    <i data-lucide="trash-2" size="18"></i>
                </button>
            </div>
        `;
    }).join('');
    
    totalLabel.innerText = `৳ ${total}`;
    lucide.createIcons(); // Refresh icons for trash can
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

window.onload = initShop;