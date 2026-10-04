const foods = [

  {
    id: 1,
    name: "Margherita Pizza",
    category: "Pizza",
    price: 899,
    rating: 4.9,
    description: "Classic cheese, tomato and fresh basil.",
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 2,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 1299,
    rating: 4.9,
    description: "Loaded with pepperoni and melted cheese.",
    image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 3,
    name: "Classic Beef Burger",
    category: "Burger",
    price: 699,
    rating: 4.8,
    description: "Juicy beef patty with fresh crunchy veggies.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 4,
    name: "Crispy Chicken Burger",
    category: "Burger",
    price: 599,
    rating: 4.7,
    description: "Crispy chicken, creamy sauce and soft buns.",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 5,
    name: "Creamy Alfredo Pasta",
    category: "Pasta",
    price: 799,
    rating: 4.8,
    description: "Creamy white sauce pasta with Italian herbs.",
    image: "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 6,
    name: "Spaghetti Pasta",
    category: "Pasta",
    price: 749,
    rating: 4.6,
    description: "Italian-style pasta with rich tomato sauce.",
    image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 7,
    name: "Golden French Fries",
    category: "Sides",
    price: 249,
    rating: 4.7,
    description: "Hot, crispy and perfectly seasoned fries.",
    image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 8,
    name: "Chicken Nuggets",
    category: "Sides",
    price: 399,
    rating: 4.6,
    description: "Golden nuggets served with a tasty dip.",
    image: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 9,
    name: "Chocolate Shake",
    category: "Drinks",
    price: 299,
    rating: 4.8,
    description: "Rich chocolate milkshake, chilled and creamy.",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 10,
    name: "Fresh Lemonade",
    category: "Drinks",
    price: 199,
    rating: 4.5,
    description: "Refreshing lemon drink with a citrus twist.",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 11,
    name: "Double Cheese Burger",
    category: "Burger",
    price: 899,
    rating: 4.9,
    description: "Double patties with extra melted cheese.",
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?auto=format&fit=crop&w=700&q=85"
  },

  {
    id: 12,
    name: "Loaded Fries",
    category: "Sides",
    price: 449,
    rating: 4.7,
    description: "Crispy fries with a delicious cheesy topping.",
    image: "https://images.unsplash.com/photo-1518013431117-eb1465fa5752?auto=format&fit=crop&w=700&q=85"
  }

];


let cart = JSON.parse(localStorage.getItem("foodieHubCart")) || [];

let activeCategory = "All";

let couponApplied =
  localStorage.getItem("foodieHubCoupon") === "true";

let toastTimer;


const foodGrid = document.getElementById("foodGrid");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

const cartPanel = document.getElementById("cartPanel");
const cartItems = document.getElementById("cartItems");

const overlay = document.getElementById("overlay");

const checkoutModal =
  document.getElementById("checkoutModal");

const successModal =
  document.getElementById("successModal");


function money(amount) {

  return "Rs. " +
    Math.round(amount).toLocaleString("en-PK");

}


function saveCart() {

  localStorage.setItem(
    "foodieHubCart",
    JSON.stringify(cart)
  );

  localStorage.setItem(
    "foodieHubCoupon",
    couponApplied
  );

}


/* ================= FOOD RENDER ================= */

function renderFoods() {

  const query =
    searchInput.value.trim().toLowerCase();


  const filteredFoods = foods.filter(food => {

    const categoryMatch =
      activeCategory === "All" ||
      food.category === activeCategory;


    const searchMatch =
      `${food.name} ${food.category} ${food.description}`
        .toLowerCase()
        .includes(query);


    return categoryMatch && searchMatch;

  });


  foodGrid.innerHTML =
    filteredFoods.map(food => `

      <article class="food-card">

        <img
          class="food-image"
          src="${food.image}"
          alt="${food.name}"
          loading="lazy"
        >

        <div class="food-info">

          <div class="food-meta">

            <h3>
              ${food.name}
            </h3>

            <span class="rating">
              ★ ${food.rating}
            </span>

          </div>

          <p class="food-description">
            ${food.description}
          </p>

          <div class="food-bottom">

            <span class="food-price">
              ${money(food.price)}
            </span>

            <button
              class="add-btn"
              data-add="${food.id}"
            >
              + Add to Cart
            </button>

          </div>

        </div>

      </article>

    `).join("");


  emptyMessage.hidden =
    filteredFoods.length !== 0;

}


/* ================= FILTER ================= */

document
  .getElementById("filters")
  .addEventListener("click", event => {

    const button =
      event.target.closest("[data-category]");

    if (!button) return;


    activeCategory =
      button.dataset.category;


    document
      .querySelectorAll(".filter-btn")
      .forEach(btn => {

        btn.classList.toggle(
          "active",
          btn === button
        );

      });


    renderFoods();

  });


/* ================= SEARCH ================= */

searchInput.addEventListener(
  "input",
  renderFoods
);


/* ================= ADD TO CART ================= */

foodGrid.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest("[data-add]");

    if (!button) return;


    const id =
      Number(button.dataset.add);


    const existing =
      cart.find(item => item.id === id);


    if (existing) {

      existing.quantity++;

    }

    else {

      const food =
        foods.find(item => item.id === id);

      cart.push({
        ...food,
        quantity: 1
      });

    }


    saveCart();

    renderCart();

    showToast(
      "Added to cart! 🛒"
    );

  }
);


/* ================= BILL ================= */

function calculateBill() {

  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  const delivery =
    subtotal === 0
      ? 0
      : subtotal >= 2000
        ? 0
        : 150;


  const discount =
    couponApplied
      ? Math.round(subtotal * 0.10)
      : 0;


  const total =
    Math.max(
      0,
      subtotal + delivery - discount
    );


  return {
    subtotal,
    delivery,
    discount,
    total
  };

}


/* ================= CART ================= */

function renderCart() {

  const count =
    cart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  document.getElementById(
    "cartCount"
  ).textContent = count;


  if (cart.length === 0) {

    cartItems.innerHTML = `

      <div class="empty-cart">

        <div class="empty-icon">
          🛒
        </div>

        <h3>
          Your cart is empty
        </h3>

        <p>
          Add something delicious!
        </p>

      </div>

    `;

  }

  else {

    cartItems.innerHTML =
      cart.map(item => `

        <div class="cart-item">

          <img
            src="${item.image}"
            alt="${item.name}"
          >

          <div>

            <h4>
              ${item.name}
            </h4>

            <span class="cart-item-price">
              ${money(
                item.price * item.quantity
              )}
            </span>


            <div class="quantity-controls">

              <button
                data-change="${item.id}"
                data-delta="-1"
              >
                −
              </button>

              <span>
                ${item.quantity}
              </span>

              <button
                data-change="${item.id}"
                data-delta="1"
              >
                +
              </button>

            </div>

          </div>


          <button
            class="remove-btn"
            data-remove="${item.id}"
          >
            ✕
          </button>

        </div>

      `).join("");

  }


  const bill =
    calculateBill();


  document.getElementById(
    "subtotal"
  ).textContent =
    money(bill.subtotal);


  document.getElementById(
    "delivery"
  ).textContent =
    bill.delivery === 0 &&
    bill.subtotal > 0
      ? "FREE"
      : money(bill.delivery);


  document.getElementById(
    "discount"
  ).textContent =
    money(bill.discount);


  document.getElementById(
    "total"
  ).textContent =
    money(bill.total);


  document.getElementById(
    "checkoutBtn"
  ).disabled =
    cart.length === 0;

}


/* ================= CART CONTROLS ================= */

cartItems.addEventListener(
  "click",
  event => {

    const changeButton =
      event.target.closest(
        "[data-change]"
      );


    const removeButton =
      event.target.closest(
        "[data-remove]"
      );


    if (changeButton) {

      const id =
        Number(
          changeButton.dataset.change
        );


      const delta =
        Number(
          changeButton.dataset.delta
        );


      const item =
        cart.find(
          food => food.id === id
        );


      if (!item) return;


      item.quantity += delta;


      if (item.quantity <= 0) {

        cart =
          cart.filter(
            food => food.id !== id
          );

      }


      saveCart();

      renderCart();

    }


    if (removeButton) {

      const id =
        Number(
          removeButton.dataset.remove
        );


      cart =
        cart.filter(
          food => food.id !== id
        );


      saveCart();

      renderCart();

      showToast(
        "Item removed."
      );

    }

  }
);


/* ================= CART OPEN/CLOSE ================= */

function openCart() {

  cartPanel.classList.add("open");

  overlay.classList.add("show");

  cartPanel.setAttribute(
    "aria-hidden",
    "false"
  );

  document.body.classList.add(
    "no-scroll"
  );

}


function closeCart() {

  cartPanel.classList.remove("open");

  overlay.classList.remove("show");

  cartPanel.setAttribute(
    "aria-hidden",
    "true"
  );

  document.body.classList.remove(
    "no-scroll"
  );

}


document
  .getElementById("cartBtn")
  .addEventListener(
    "click",
    openCart
  );


document
  .getElementById("closeCart")
  .addEventListener(
    "click",
    closeCart
  );


overlay.addEventListener(
  "click",
  closeCart
);


/* ================= COUPON ================= */

document
  .getElementById("applyCoupon")
  .addEventListener(
    "click",
    () => {

      const input =
        document.getElementById(
          "couponInput"
        );


      const message =
        document.getElementById(
          "couponMessage"
        );


      const code =
        input.value
          .trim()
          .toUpperCase();


      if (cart.length === 0) {

        message.textContent =
          "Add food to your cart first.";

        return;

      }


      if (code === "FOOD10") {

        couponApplied = true;

        message.textContent =
          "10% discount applied! 🎉";

        message.style.color =
          "var(--green)";

        showToast(
          "Coupon applied!"
        );

      }

      else {

        couponApplied = false;

        message.textContent =
          "Invalid code. Try FOOD10.";

        message.style.color =
          "var(--danger)";

      }


      saveCart();

      renderCart();

    }
  );


/* ================= CHECKOUT ================= */

function openCheckout() {

  if (cart.length === 0) {

    showToast(
      "Please add food first."
    );

    return;

  }


  closeCart();

  checkoutModal.classList.add(
    "show"
  );

  checkoutModal.setAttribute(
    "aria-hidden",
    "false"
  );

}


function closeCheckout() {

  checkoutModal.classList.remove(
    "show"
  );

  checkoutModal.setAttribute(
    "aria-hidden",
    "true"
  );

}


document
  .getElementById("checkoutBtn")
  .addEventListener(
    "click",
    openCheckout
  );


document
  .getElementById("closeCheckout")
  .addEventListener(
    "click",
    closeCheckout
  );


checkoutModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      checkoutModal
    ) {

      closeCheckout();

    }

  }
);


/* ================= PLACE ORDER ================= */

document
  .getElementById("checkoutForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      const form =
        event.currentTarget;


      if (
        !form.reportValidity()
      ) return;


      const bill =
        calculateBill();


      const name =
        document
          .getElementById(
            "customerName"
          )
          .value
          .trim();


      const orderNumber =
        "FH" +
        Math.floor(
          100000 +
          Math.random() * 900000
        );


      closeCheckout();


      document.getElementById(
        "successMessage"
      ).textContent =
        `Thank you ${name}! Your demo order #${orderNumber} has been placed. Total: ${money(bill.total)}.`;


      successModal.classList.add(
        "show"
      );


      successModal.setAttribute(
        "aria-hidden",
        "false"
      );


      cart = [];

      couponApplied = false;

      saveCart();

      renderCart();

      form.reset();


      document.getElementById(
        "couponInput"
      ).value = "";


      document.getElementById(
        "couponMessage"
      ).textContent =
        "Try FOOD10 for 10% off.";


      document.getElementById(
        "couponMessage"
      ).style.color = "";

    }
  );


/* ================= SUCCESS MODAL ================= */

document
  .getElementById("successClose")
  .addEventListener(
    "click",
    () => {

      successModal.classList.remove(
        "show"
      );

      successModal.setAttribute(
        "aria-hidden",
        "true"
      );

    }
  );


successModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      successModal
    ) {

      successModal.classList.remove(
        "show"
      );

    }

  }
);


/* ================= DARK MODE ================= */

const savedTheme =
  localStorage.getItem(
    "foodieHubTheme"
  );


if (savedTheme === "dark") {

  document.body.classList.add(
    "dark"
  );

  document.getElementById(
    "themeBtn"
  ).textContent = "☀️";

}


document
  .getElementById("themeBtn")
  .addEventListener(
    "click",
    () => {

      const isDark =
        document.body.classList.toggle(
          "dark"
        );


      document.getElementById(
        "themeBtn"
      ).textContent =
        isDark ? "☀️" : "🌙";


      localStorage.setItem(
        "foodieHubTheme",
        isDark ? "dark" : "light"
      );

    }
  );


/* ================= MOBILE MENU ================= */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );


const mainNav =
  document.getElementById(
    "mainNav"
  );


menuBtn.addEventListener(
  "click",
  () => {

    mainNav.classList.toggle(
      "open"
    );


    menuBtn.textContent =
      mainNav.classList.contains(
        "open"
      )
        ? "✕"
        : "☰";

  }
);


mainNav
  .querySelectorAll("a")
  .forEach(link => {

    link.addEventListener(
      "click",
      () => {

        mainNav.classList.remove(
          "open"
        );

        menuBtn.textContent = "☰";

      }
    );

  });


/* ================= ESC KEY ================= */

document.addEventListener(
  "keydown",
  event => {

    if (event.key !== "Escape")
      return;


    closeCart();

    closeCheckout();

    successModal.classList.remove(
      "show"
    );

    mainNav.classList.remove(
      "open"
    );

    menuBtn.textContent = "☰";

  }
);


/* ================= TOAST ================= */

function showToast(message) {

  const toast =
    document.getElementById(
      "toast"
    );


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      () => {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );

}


/* ================= YEAR ================= */

document.getElementById(
  "year"
).textContent =
  new Date().getFullYear();


/* ================= START ================= */

renderFoods();

renderCart();