  document.addEventListener('DOMContentLoaded', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.getElementById('cart-content');
    const cartSummary = document.getElementById('cart-summary');
    const emptyCart = document.getElementById('empty-cart');
    const cartCounter = document.getElementById('cart-counter');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');

    function renderCart() {
        cartContent.innerHTML = '';
        
        if (cart.length === 0) {
            cartSummary.style.display = 'none';
            emptyCart.style.display = 'block';
            cartCounter.textContent = '0';
            return;
        }
        
        cartSummary.style.display = 'block';
        emptyCart.style.display = 'none';
        
        let subtotal = 0;
        let totalItems = 0;
        
        cart.forEach((item, index) => {
            subtotal += item.price * item.quantity;
            totalItems += item.quantity;
            
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.setAttribute('data-index', index);
            
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <div class="cart-item-price">
                        <span class="cart-item-old-price">${item.oldPrice ? item.oldPrice + ' $' : ''}</span>
                        ${item.price} $
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus-btn"><i class="fas fa-minus"></i></button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1">
                        <button class="quantity-btn plus-btn"><i class="fas fa-plus"></i></button>
                    </div>
                </div>
                <button class="remove-item" title="إزالة من السلة">
                    <i class="fas fa-trash-alt"></i>
                </button>
            `;
            
            cartContent.appendChild(cartItem);
        });
        
        cartCounter.textContent = totalItems;
        subtotalElement.textContent = subtotal.toFixed(2) + ' $';
        
        const shipping = Math.max(5, subtotal * 0.05);
        shippingElement.textContent = shipping.toFixed(2) + ' $';
        
        const total = subtotal + shipping;
        totalElement.textContent = total.toFixed(2) + ' $';
    }
    
    function updateQuantity(index, newQuantity) {
        if (newQuantity < 1) newQuantity = 1;
        
        cart[index].quantity = parseInt(newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }
    
    function removeItem(index) {
        const itemToRemove = document.querySelector(`.cart-item[data-index="${index}"]`);
        
        if (itemToRemove) {
            itemToRemove.style.animation = 'itemRemoved 0.4s ease-out forwards';
            
            setTimeout(() => {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                renderCart();
            }, 400);
        }
    }
    
    cartContent.addEventListener('click', function(e) {
        const cartItem = e.target.closest('.cart-item');
        if (!cartItem) return;
        
        const index = parseInt(cartItem.getAttribute('data-index'));
        
        if (e.target.closest('.plus-btn')) {
            const input = cartItem.querySelector('.quantity-input');
            updateQuantity(index, parseInt(input.value) + 1);
        }
        
        if (e.target.closest('.minus-btn')) {
            const input = cartItem.querySelector('.quantity-input');
            updateQuantity(index, parseInt(input.value) - 1);
        }
        
        if (e.target.closest('.remove-item')) {
            removeItem(index);
        }
    });
    
    cartContent.addEventListener('change', function(e) {
        if (e.target.classList.contains('quantity-input')) {
            const cartItem = e.target.closest('.cart-item');
            const index = parseInt(cartItem.getAttribute('data-index'));
            updateQuantity(index, parseInt(e.target.value));
        }
    });
    
    renderCart();
});