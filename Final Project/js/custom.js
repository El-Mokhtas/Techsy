function openSidebar() {
  document.getElementById("sidebar").style.display = "block";
}

function closeSidebar() {
  document.getElementById("sidebar").style.display = "none";
}
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        {
            id: 1,
            name: "VivoBook 15 X1504VA",
            desc: "ASUS Laptop VivoBook 15 X1504VA-NJ005W, Intel Core i5-1335U Processor, 15.6 FHD Display, 512GB SSD Storage, 8GB DDR4 RAM, Intel UHD Graphics, Windows 11, Blue - 90NB10J1-M008L0",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/r/m/rmzs0p9_k17ningnun4mochw_2.jpeg",
            price: 600,
            oldPrice: 700,
            rating: 5,
            inStock: true,
            size: "col-lg-3 col-md-6 col-sm-12 mb-3"
        },
        {
            id: 2,
            name: "Lenovo Laptop IdeaPad ",
            desc: "Lenovo Laptop IdeaPad Slim 3 15IRH8, Intel Core i5-13420H Processor, 15.6\" FHD Display, 512GB SSD Storage, 8GB LPDDR5 RAM, Intel UHD Graphics, Windows 11 Home, Grey",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/g/a/gauotdd_hihfhusjjpaxdq89.png",
            price: 500,
            oldPrice: 540,
            rating: 4,
            inStock: true,
            size: "col-lg-3 col-md-6 col-sm-12 mb-3"
        },
        {
            id: 3,
            name: "ASUS TUF Gaming",
            desc: "ASUS TUF Gaming Laptop A15 FA506NCR-HN007W, AMD Ryzen 7 7435HS Processor, 15.6\" FHD Display, 512GB SSD Storage, 8GB DDR5 RAM, NVIDIA GeForce RTX 3050 Graphics 4GB, Windows 11, Black - 90NR0JV7-M001T0",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/u/p/up76nbi_lfrbe4rnc4o2qfjg.png",
            price: 1000,
            oldPrice: 1200,
            rating: 5,
            inStock: false,
            size: "col-lg-6 col-md-6 col-sm-12 mb-3"
        },
        {
            id: 4,
            name: "SHP Pavilion",
            desc: "HP Pavilion x360 2-in-1 Laptop 14-ek1019ne, Intel Core i5-1335U Processor, 14\" FHD Display, 512GB SSD Storage, 8GB DDR4 RAM, Intel Iris Xe Graphics, Windows 11 Home, Silver - 9U5Y5EA",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/w/b/wblky3f_l8okhypjwcn2itmm.png",
            price: 1000,
            oldPrice: 1200,
            rating: 5,
            inStock: true,
            size: "col-lg-6 col-md-6 col-sm-12 mb-3"
        },
        {
            id: 5,
            name: "Lenovo LOQ Gaming",
            desc: "Lenovo LOQ Gaming Laptop 15IRX9, Intel Core i5-13450HX Processor, 15.6\" FHD Display, 512GB SSD Storage, 24GB DDR5 RAM, NVIDIA GeForce RTX 3050 Graphics 6GB, DOS, Grey - 83DV012HE",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/l/o/loq-15-irx9-ct1-01_6duqgp1fiade1gpx_1.jpg",
            price: 1500,
            oldPrice: 1600,
            rating: 5,
            inStock: true,
            size: "col-lg-3 col-md-6 col-sm-12 mb-3"
        },
        {
            id: 6,
            name: "Apple MacBook",
            desc: "Apple MacBook Pro Laptop, Apple M4 Processor, 14.2\" Liquid Retina XDR Display, 1TB SSD Storage, 16GB RAM, Apple, macOS, Black - MW2V",
            image: "https://api-rayashop.freetls.fastly.net/media/catalog/product/cache/4e49ac3a70c0b98a165f3fa6633ffee1/k/a/kafl9da_xdldwt9fdabsfo4b.jpeg",
            price: 5000,
            oldPrice: 6000,
            rating: 5,
            inStock: true,
            size: "col-lg-3 col-md-6 col-sm-12 mb-3"
        }
    ];
const productsContainer = document.getElementById('products-container');

function loadCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(product) {
    const cart = loadCart();
    const existingProduct = cart.find(item => item.id === product.id);
    
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }
    
    saveCart(cart);
    showAlert(`Product ${product.name} added to cart!`);
    updateCartCounter();
}

function showAlert(message) {
    const sweetAlert = document.createElement('div');
    sweetAlert.classList.add('sweetAlert');
    sweetAlert.innerHTML = `
        <i class="fas fa-check-circle fa-4x text-success"></i>
        <br>
        ${message}
    `;
    document.body.appendChild(sweetAlert);
    setTimeout(() => {
        sweetAlert.remove();
    }, 2000);
}
function errorAlert(message) {
    const sweetAlert = document.createElement('div');
    sweetAlert.classList.add('sweetAlert');
    sweetAlert.innerHTML = `
        <i class="fas fa-exclamation-circle fa-4x text-danger"></i>
        <br>
        ${message}
    `;
    document.body.appendChild(sweetAlert);
    setTimeout(() => {
        sweetAlert.remove();
    }, 2000);
}

function updateCartCounter() {
    const cart = loadCart();
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCounter = document.getElementById('cart-counter');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
    }
}

products.forEach(product => {
    const stars = Array(product.rating).fill('<i class="fa fa-star"></i>').join('');
    
    const productHTML = `
        <div class="${product.size}">
            <div class="product">
                <div class="product-image">
                    <span class="badge ${product.inStock ? 'in-stock' : 'out-of-stock'}">
                        ${product.inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <img src="${product.image}" alt="${product.name}">
                    <div class="product-actions">
                        <button class="add-to-wishlist" data-id="${product.id}">
                            <i class="fa fa-heart"></i>
                        </button>
                        <button class="add-to-cart" data-id="${product.id}"
                        data-name="${product.name}"
                        data-price="${product.price}" 
                        data-old-price="${product.oldPrice}"
                        data-image="${product.image}" 
                        data-rating="${product.rating}" 
                        data-in-stock="${product.inStock}">
                            <i class="fa-solid fa-cart-plus me-3"></i>
                        </button>
                        <a href="/single-product.html" class="view-details"> <i class="fa fa-eye"></i> </a>

                    </div>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <span class="stars">${stars}</span>
                    <div class="prices">
                        <span class="price">${product.price} $</span>
                        <span class="old-price">${product.oldPrice} $</span>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    productsContainer.innerHTML += productHTML;
});

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        if (this.getAttribute('data-in-stock') === 'false') {
            errorAlert('This product is out of stock!');
            return;
        }
        
        const product = {
            id: this.getAttribute('data-id'),
            name: this.getAttribute('data-name'),
            price: parseFloat(this.getAttribute('data-price')),
            oldPrice: parseFloat(this.getAttribute('data-old-price')),
            image: this.getAttribute('data-image'),
            rating: parseInt(this.getAttribute('data-rating')),
            inStock: this.getAttribute('data-in-stock') === 'true'
        };
        
        addToCart(product);
    });
});

document.addEventListener('DOMContentLoaded', updateCartCounter);
});
// window.localStorage.clear()



// Hero section image slideshow - Hussien Yousef
const images = [
    "./imgs/Laptop_3__1.png",
    "./imgs/Mobiles_1__3.png", 
    "./imgs/Tv_1__1_1.png"
];

let currentIndex = 0;
const slideshowImage = document.getElementById('img-slide');

function changeImage() {
    currentIndex = (currentIndex + 1) % images.length; 
    slideshowImage.src = images[currentIndex]; 
}

setInterval(changeImage, 3000);

// Stacked images click effect - Jihad Abdelnaser
const stackedImages = document.querySelectorAll('.stacked');
  stackedImages.forEach(img => {
    img.addEventListener('click', () => {
      images.forEach(i => i.classList.remove('clicked'));
      img.classList.add('clicked');
    });
  });