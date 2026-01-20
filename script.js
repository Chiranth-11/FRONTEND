
// HERO SLIDER
const heroImages = ["images/hero1.jpg", "images/hero2.jpg", "images/hero3.jpg","images/hero4.jpg"];
let heroIndex = 0;
const heroSlide = document.getElementById("heroSlide");

function nextHero() {
  heroIndex = (heroIndex + 1) % heroImages.length;
  heroSlide.src = heroImages[heroIndex];
}

function prevHero() {
  heroIndex = (heroIndex - 1 + heroImages.length) % heroImages.length;
  heroSlide.src = heroImages[heroIndex];
}

setInterval(nextHero, 4000);


// PROPERTY FILTER LOGIC (FINAL)
const cards = document.querySelectorAll(".property-card");
const locationSelect = document.getElementById("searchLocation");
const bhkSelect = document.getElementById("searchBHK");
const typeSelect = document.getElementById("searchType");

function filterProperties() {
  const loc = locationSelect.value;
  const bhk = bhkSelect.value;
  const type = typeSelect.value;

  let shown = 0;
  const DEFAULT_LIMIT = 2;

  cards.forEach(card => {
    const area = card.dataset.location;
    const okBhk = bhk === "all" || card.dataset.bhk === bhk;
    const okType = type === "all" || card.dataset.type === type;

    card.style.display = "none";

    // ALL AREAS → only 2
    if (loc === "all") {
      if (okBhk && okType && shown < DEFAULT_LIMIT) {
        card.style.display = "block";
        shown++;
      }
    }
    // SPECIFIC AREA → show all of that area
    else {
      if (area === loc && okBhk && okType) {
        card.style.display = "block";
      }
    }
  });
}

locationSelect.onchange = bhkSelect.onchange = typeSelect.onchange = filterProperties;
filterProperties();


// ------------------- FEEDBACK (SENDS TO BACKEND) -------------------
document.getElementById("feedbackForm").onsubmit = async (e) => {
  e.preventDefault();

  const name = document.getElementById("fbName").value;
  const email = document.getElementById("fbEmail").value;
  const phone = document.getElementById("fbPhone").value;
  const message = document.getElementById("fbMessage").value;

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Enter a valid email address");
    return;
  }

  // Phone validation (Exactly 10 digits)
  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    alert("Enter a valid 10-digit phone number");
    return;
  }

  // If validations pass → send to backend
  try {
    const res = await fetch("http://localhost:3000/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message })
    });

    const result = await res.json();

    if (res.ok) {
      alert("Thank you! Your feedback was submitted.");
      e.target.reset();
    } else {
      alert(result.error || "Unable to send feedback.");
    }
  } catch (err) {
    console.error(err);
    alert("Server not reachable. Make sure backend is running.");
  }
};

// ------------------------------------------------------------------


// PROPERTY DETAILS MODAL
const modal = document.getElementById("detailsModal");
const closeBtn = document.querySelector(".close-btn");

const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalArea = document.getElementById("modalArea");
const modalBhk = document.getElementById("modalBhk");
const modalType = document.getElementById("modalType");
const modalPrice = document.getElementById("modalPrice");
const modalAddress = document.getElementById("modalAddress");
const modalOwner = document.getElementById("modalOwner");
const modalPhone = document.getElementById("modalPhone");

document.querySelectorAll(".view-details").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".property-card");

    modalTitle.textContent   = card.dataset.title;
    modalDesc.textContent    = card.dataset.desc;
    modalArea.textContent    = card.dataset.area;
    modalBhk.textContent     = card.dataset.bhk;
    modalType.textContent    = card.dataset.type;
    modalPrice.textContent   = card.dataset.price;
    modalAddress.textContent = card.dataset.address;
    modalOwner.textContent   = card.dataset.owner;
    modalPhone.textContent   = card.dataset.phone;

    modal.style.display = "flex";
  });
});

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};

let cart = [];
const cartCount = document.getElementById("cartCount");

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.closest(".property-card");
    const title = card.dataset.title;
    const price = card.dataset.price;

    cart.push({ title, price });

    cartCount.innerText = cart.length;

    alert(title + " added to cart!");
  });
});
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const cartList = document.getElementById("cartList");
const emptyMsg = document.getElementById("emptyMsg");

document.getElementById("cartBox").onclick = () => {
  cartList.innerHTML = "";

  if (cart.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";

    cart.forEach(item => {
      const li = document.createElement("li");
      li.textContent = `${item.title} — ${item.price}`;
      cartList.appendChild(li);
    });
  }

  cartModal.style.display = "flex";
};

closeCart.onclick = () => cartModal.style.display = "none";

window.onclick = e => {
  if (e.target === cartModal) cartModal.style.display = "none";
};

function toggleOffer() {
  const x = document.getElementById("specialOffer");
  x.style.display = (x.style.display === "none") ? "block" : "none";
}

