document.addEventListener('DOMContentLoaded', function() {
    const customerForm = document.getElementById('customer-form');
    const paymentForm = document.getElementById('payment-form');
    const continueBtn = document.getElementById('continue-to-payment');
    const backBtn = document.getElementById('back-to-info');
    const completeBtn = document.getElementById('complete-payment');
    const orderSummary = document.getElementById('order-summary');
    const orderTotal = document.getElementById('order-total');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');
    
    const visaCards = [
        {
            number: '4111111111111111',
            expiry: '14/12',
            cvv: '123',
            name: 'hussien',
            balance: 10000,
            hasBalance: true
        },
        {
            number: '4222222222222222',
            expiry: '06/24',
            cvv: '456',
            name: 'empty',
            balance: 0,
            hasBalance: false
        }
    ];
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let orderAmount = 0;
    
    function renderOrderSummary() {
        orderSummary.innerHTML = '';
        
        if (cart.length === 0) {
            orderSummary.innerHTML = '<p>No items in cart</p>';
            orderTotal.textContent = '0.00 $';
            return;
        }
        
        let subtotal = 0;
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            const itemElement = document.createElement('div');
            itemElement.className = 'summary-row';
            itemElement.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>${itemTotal.toFixed(2)} $</span>
            `;
            orderSummary.appendChild(itemElement);
        });
        
        const shipping = Math.max(5, subtotal * 0.05);
        
        const shippingElement = document.createElement('div');
        shippingElement.className = 'summary-row';
        shippingElement.innerHTML = `
            <span>Shipping :</span>
            <span>${shipping.toFixed(2)} $</span>
        `;
        orderSummary.appendChild(shippingElement);
        
        orderAmount = subtotal + shipping;
        orderTotal.textContent = orderAmount.toFixed(2) + ' $';
    }
    
    continueBtn.addEventListener('click', function() {
        let isValid = true;
        const requiredFields = customerForm.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#d63031';
                isValid = false;
            } else {
                field.style.borderColor = '#15ce15';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all required fields');
            return;
        }
        
        customerForm.style.display = 'none';
        paymentForm.style.display = 'block';
        
        step1.classList.remove('active');
        step1.classList.add('completed');
        step2.classList.add('active');
    });
    
    backBtn.addEventListener('click', function() {
        paymentForm.style.display = 'none';
        customerForm.style.display = 'block';
        
        step2.classList.remove('active');
        step1.classList.add('active');
        step1.classList.remove('completed');
    });
    
    completeBtn.addEventListener('click', function() {
        let isValid = true;
        const paymentFields = paymentForm.querySelectorAll('[required]');
        
        paymentFields.forEach(field => {
            if (!field.value.trim()) {
                field.style.borderColor = '#d63031';
                isValid = false;
            } else {
                field.style.borderColor = '#ddd';
            }
        });
        
        if (!isValid) {
            alert('Please fill in all card details');
            return;
        }
        
        const cardNumber = document.getElementById('card-number').value.replace(/\s/g, '');
        const cardExpiry = document.getElementById('card-expiry').value;
        const cardCvv = document.getElementById('card-cvv').value;
        const cardName = document.getElementById('card-name').value;
        
        const card = visaCards.find(c => 
            c.number === cardNumber && 
            c.expiry === cardExpiry && 
            c.cvv === cardCvv
        );
        
        if (!card) {
            showError('Card details are incorrect');
            return;
        }
        
        if (!card.hasBalance || card.balance < orderAmount) {
            showError('Insufficient card balance');
            return;
        }
        
        processPayment();
    });
    
    function showError(message) {
        completeBtn.disabled = true;
        completeBtn.style.backgroundColor = '#d63031';
        completeBtn.innerHTML = `${message} <i class="fas fa-exclamation-circle ms-2"></i> `;
        
        paymentForm.style.animation = 'shake 0.5s';
        setTimeout(() => {
            paymentForm.style.animation = '';
        }, 500);
        
        setTimeout(() => {
            completeBtn.disabled = false;
            completeBtn.style.backgroundColor = '#00b894';
            completeBtn.innerHTML = 'Complete Payment <i class="fas fa-lock ms-2"></i>';
        }, 2000);
    }
    
    function processPayment() {
        completeBtn.disabled = true;
        completeBtn.innerHTML = 'Processing Payment ... <i class="fas fa-spinner fa-spin ms-2"></i> ';
        
        setTimeout(() => {
            localStorage.removeItem('cart');
            cart = [];
            
            completeBtn.style.backgroundColor = '#00b894';
            completeBtn.innerHTML = 'Payment Successful !<i class="fas fa-check-circle ms-2"></i>';
            
            step2.classList.remove('active');
            step2.classList.add('completed');
            step3.classList.add('active');
            
            paymentForm.style.display = 'none';
            
            showOrderConfirmation();
        }, 2000);
    }
    
    function showOrderConfirmation() {
        const customerName = document.getElementById('name').value;
        const customerEmail = document.getElementById('email').value;
        
        const confirmationHTML = `
            <div style="text-align: center; padding: 30px 0;">
                <i class="fas fa-check-circle fa-5x" style="color: #00b894; margin-bottom: 20px;"></i>
                <h2 style="color: #00b894; margin-bottom: 15px;">Payment Successful !</h2>
                <p style="margin-bottom: 25px; font-size: 18px;">
                    Thank you ${customerName} for your purchase from our store
                </p>
                <p style="margin-bottom: 25px;">
                    Order details will be sent to your email: <strong>${customerEmail}</strong>
                </p>
                <p style="margin-bottom: 30px;">
                    Reference Number: #${Math.floor(100000 + Math.random() * 900000)}
                </p>
                <a href="index.html" class="checkout-btn" style="text-decoration: none; display: inline-block; background-color: #6c5ce7;">
                    Back to Store
                    <i class="fas fa-store ms-2"></i>
                </a>
            </div>
        `;
        
        paymentForm.innerHTML = confirmationHTML;
        paymentForm.style.display = 'block';
    }
    
    renderOrderSummary();
});