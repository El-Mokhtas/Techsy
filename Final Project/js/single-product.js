// const products = [
//     { name: "iPhone 14", price: 35000, image: "/imeges/10.jpg" },
//     { name: "Samsung Galaxy S23", price: 32000, image: "/imeges/11.jpg" },
//     { name: "AirPods Pro", price: 6000, image: "/imeges/12.jpg" }
// ];

// const container = document.getElementById("productsContainer");

// products.forEach(product => {
//     const card = document.createElement("div");
//     card.classList.add("product-card");
//     card.innerHTML = `
//         <img src="${product.image}" alt="${product.name}">
//         <h4>${product.name}</h4>
//         <p>${product.price} EGP</p>
//         <button>أضف للسلة</button>
//     `;
//     container.appendChild(card);
// });


/*صفحة الديتيلز*/

    const currentProduct = {
        id: "product-1",
        name: "Apple MacBook Air M4",
        image: "/Front-end/imeges/1.jpg",
};


    window.onload = () => {
        const favIcon = document.getElementById("favIcon");
        let favorites =
            JSON.parse(localStorage.getItem("favoriteProducts")) || [];
        const found = favorites.find((item) => item.id === currentProduct.id);
        if (found) favIcon.classList.add("active");
};

    function changeImage(clickedImg) {
        const mainImg = document.getElementById("mainImg");
        const thumbnails = document.querySelectorAll(".thumbnails img");
        mainImg.src = clickedImg.src.replace("60/60", "600/400");
        thumbnails.forEach((img) => img.classList.remove("active"));
        clickedImg.classList.add("active");
}

    function toggleFavorite() {
        const favIcon = document.getElementById("favIcon");
        const msg = document.getElementById("favMsg");
        let favorites =
            JSON.parse(localStorage.getItem("favoriteProducts")) || [];
            const exists = favorites.find((item) => item.id === currentProduct.id);

        if (exists) {
            favorites = favorites.filter((item) => item.id !== currentProduct.id);
            favIcon.classList.remove("active");
            msg.textContent = "Removed from favorites";
        } else {
            favorites.push(currentProduct);
            favIcon.classList.add("active");
            msg.textContent = "Added to favorites successfully";
        }

        localStorage.setItem("favoriteProducts", JSON.stringify(favorites));
        msg.style.display = "block";
        setTimeout(() => (msg.style.display = "none"), 3000);
}

    function changeQty(val) {
        const qty = document.getElementById("qty");
        let current = parseInt(qty.textContent);
        current = Math.max(1, current + val);
        qty.textContent = current;
        let notAllowed = document.getElementsByClassName("rem");
        for(let i= 0 ; i < notAllowed.length ; i++){
            if(current === 1){
                notAllowed[i].style = "cursor: not-allowed; opacity: 0.5;";
            }
            else{
                notAllowed[i].style = "cursor: pointer; opacity: 1;";
            }
        }
}

    function addToCart() {
        const msg = document.getElementById("cartMsg");
        msg.style.display = "flex";
        setTimeout(() => (msg.style.display = "none"), 3000);
}

// /*Add to card count*/
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;
updateCartDisplay();

document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
    cartCount++;
    localStorage.setItem("cartCount", cartCount);
    updateCartDisplay();
    });
});

document.querySelectorAll(".cart-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
        if (cartCount > 0) {
            cartCount--;
            localStorage.setItem("cartCount", cartCount);
            updateCartDisplay();
        }
    });
});

function updateCartDisplay() {
    document.querySelectorAll(".cart-count").forEach((el) => {
        el.innerText = cartCount;
    });
}


function toggleMenu(header) {
    const container = header.closest(".description-item");
    const menu = container.querySelector(".all-details");
    const icon = container.querySelector(".icon i");

    menu.classList.toggle("open");

    if (menu.classList.contains("open")) {
        icon.classList.remove("fa-plus");
        icon.classList.add("fa-minus");
    } else {
        icon.classList.remove("fa-minus");
        icon.classList.add("fa-plus");
    }
}


// const ratingData = {
//     totalRatings: 10,
//     counts: {
//         1: 0,
//         2: 0,
//         3: 0,
//         4: 0,
//         5: 0
//     }
// };

// function updateRatings() {
//     const { counts } = ratingData;
//     let totalScore = 0;
//     let totalCount = 0;

//     for (let i = 1; i <= 5; i++) {
//         const count = counts[i] || 0;
//         totalScore += i * count;
//         totalCount += count;
//     }

//     const avg = totalCount > 0 ? (totalScore / totalCount).toFixed(1) : "0.0";
//     const avgElement = document.querySelector(".overall-score");
//     if (avgElement) {
//         avgElement.innerHTML = `${avg} <span>/ 5</span>`;
//     }

//     const bars = document.querySelectorAll(".ratings-bars .bar");
//         bars.forEach((bar, index) => {
//             const rating = index + 1;
//             const count = counts[rating] || 0;
//             const percent = totalCount > 0 ? (count / totalCount) * 100 : 0;

//             bar.children[0].textContent = count;
//             bar.querySelector(".fill").style.width = percent + "%";
//         });
// }



// // إظهار الفورم فقط لما يدوس على الزر الأساسي
// document.querySelector(".review-btn").addEventListener("click", () => {
//     document.getElementById("reviewForm").style.display = "flex";
// });

// document.querySelector(".close").addEventListener("click", () => {
//     document.getElementById("reviewForm").style.display = "none";
// });

// let show_comment = document.querySelector(".text-comment")

// // إرسال التقييم
// let tankMsg = document.querySelector(".done-rate")
// let show = document.querySelector(".show-user")
// function submitReview() {
//     document.getElementById("reviewForm").style.display = "none";
//     setTimeout(function(){
//         tankMsg.style.display = "block";
//         setTimeout(function(){
//             tankMsg.style.display = "none";
//         }, 1000);
//     }, 200);
//     show_comment.style.display = "none"
//     show.style.display = "flex"
//     document.querySelector(".rating-box").style = "align-items: flex-start;"

// }

// document.addEventListener("DOMContentLoaded", function () {
//     updateRatings();
// });


let selectedRating = 0;

// تحميل من localStorage أو إنشاء جديد
let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

function updateRatings() {
    let totalRatings = reviews.length;
    let counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalScore = 0;

    reviews.forEach((review) => {
        counts[review.rating]++;
        totalScore += review.rating;
});

    const avg = totalRatings > 0 ? (totalScore / totalRatings).toFixed(1) : "0.0";
    document.querySelector(".overall-score").innerHTML = `${avg} <span>/ 5</span>`;

    const bars = document.querySelectorAll(".ratings-bars .bar");
    bars.forEach((bar, index) => {
        const rating = index + 1;
        const count = counts[rating];
        const percent = totalRatings ? (count / totalRatings) * 100 : 0;

        bar.children[0].textContent = count;
        bar.querySelector(".fill").style.width = percent + "%";
    });
}

function renderReviews() {
    const list = document.querySelector(".comment");
    list.innerHTML = "";

    const oldMessage = document.querySelector(".text-comment");
    if (oldMessage) oldMessage.remove();

    if (reviews.length === 0) {
        const message = document.createElement("h1");
        message.className = "text-comment";
        message.innerHTML = `no comment <i class="fa fa-comment" aria-hidden="true"></i>`;
        list.appendChild(message);
        return;
    }

    reviews.forEach((review) => {
        const card = document.createElement("div");
        card.className = "show-user";

        card.innerHTML = `
        <div class="stars">
            <span class="star-color">
            ${'<i class="fa fa-star"></i>'.repeat(review.rating)}
            </span>
            <span class="star-empty">
            ${'<i class="fa fa-star"></i>'.repeat(5 - review.rating)}
            </span>
        </div>
        <p>${review.comment}</p>
        <span>By Ziad Mohamed • ${review.date || "Unknown date"}</span>
        `;
        list.appendChild(card);
    });
}

document.querySelector(".review-btn").addEventListener("click", () => {
    document.getElementById("reviewForm").style.display = "flex";
});

document.querySelector(".close").addEventListener("click", () => {
    document.getElementById("reviewForm").style.display = "none";
});

    const starsEls = document.querySelectorAll("#reviewForm .stars i");
    starsEls.forEach((star, index) => {
        star.addEventListener("click", () => {
            selectedRating = index + 1;
            starsEls.forEach((s, i) => {
                s.style.color = i < selectedRating ? "gold" : "#ccc";
            });
        });
    });

function submitReview(event) {
    if (event) event.preventDefault();

    const commentInput = document.querySelector("#reviewForm textarea");
    const comment = commentInput.value.trim();

    if (selectedRating === 0 || comment === "") {
        alert("Please select a rating and write a comment.");
        return;
    }

    const newReview = {
        rating: selectedRating,
        comment,
        date: new Date().toLocaleString("en-GB")
    };

    reviews.unshift(newReview);
    localStorage.setItem("reviews", JSON.stringify(reviews));

    commentInput.value = "";
    selectedRating = 0;
    starsEls.forEach((s) => (s.style.color = "#ccc"));
    document.getElementById("reviewForm").style.display = "none";
    setTimeout(function(){document.querySelector(".done-rate").style.display = "block";},0)
    setTimeout(function() {document.querySelector(".done-rate").style.display = "none";}, 3000);

    updateRatings();
    renderReviews();
}


// تأكد من استدعاء الكل بعد تحميل الصفحة
document.addEventListener("DOMContentLoaded", () => {
    updateRatings();
    renderReviews();

    // زر الإرسال موصل بـ submitReview
    const submitBtn = document.querySelector("#submitBtn");
    if (submitBtn) {
        submitBtn.addEventListener("click", submitReview);
    }
});


