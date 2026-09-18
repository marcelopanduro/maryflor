/* ==========================================================================
   MAR Y FLOR - LÓGICA DE INTERACCIÓN Y CATÁLOGO DIGITAL (VANILLA JS)
   Ubicación: Iquitos, Loreto, Perú
   ========================================================================== */

// ==========================================
// 1. CONFIGURACIÓN GENERAL Y CONSTANTES
// ==========================================
// Reemplazar únicamente este número por el oficial (incluyendo código de país, ej: "51987654321")
const NUMERO_WHATSAPP = "51000000000"; 

const CONFIG = {
  LS_CART_KEY: "mar_y_flor_cart_v1",
  LS_THEME_KEY: "mar_y_flor_theme_v1",
  CURRENCY_SYMBOL: "S/",
  NOTIF_DURATION: 3000
};

// ==========================================
// 2. BASE DE DATOS DE PRODUCTOS (ARRAY)
// ==========================================
// Para agregar o modificar productos, solo debes editar o agregar objetos a este array.
const productos = [
  {
    id: 1,
    nombre: "Perfume Ekos Frescor Castaña 150ml",
    precio: 89.00,
    precioAnterior: 110.00,
    descripcion: "Fragancia envolvente con extracto aromático de castaña, notas cálidas y reconfortantes. Ideal para el día a día en el clima tropical.",
    marca: "natura",
    categoria: "perfumes",
    imagen: "assets/images/product-1.jpg",
    stock: true,
    descuento: 19,
    destacado: true
  },
  {
    id: 2,
    nombre: "Crema Corporal Tododia Algodón 400ml",
    precio: 52.00,
    precioAnterior: null,
    descripcion: "Nutrición prebiótica para el cuerpo. Piel firme, suave y profundamente hidratada con un aroma suave y delicado.",
    marca: "tododia",
    categoria: "cuidado-personal",
    imagen: "assets/images/product-2.jpg",
    stock: true,
    descuento: 0,
    destacado: true
  },
  {
    id: 3,
    nombre: "Perfume Kaiak Vital Masculino 100ml",
    precio: 125.00,
    precioAnterior: 145.00,
    descripcion: "Una explosión de frescura marina combinada con notas especiadas y maderosas. Brinda vitalidad durante todo el día.",
    marca: "kaiak",
    categoria: "perfumes",
    imagen: "assets/images/product-3.jpg",
    stock: true,
    descuento: 14,
    destacado: true
  },
  {
    id: 4,
    nombre: "Gorra Urbana Minimalista Mar y Flor",
    precio: 45.00,
    precioAnterior: null,
    descripcion: "Gorra ajustables de algodón de alta durabilidad, diseño limpio y bordado discreto. Protección solar y estilo moderno.",
    marca: "otras",
    categoria: "accesorios",
    imagen: "assets/images/product-4.jpg",
    stock: true,
    descuento: 0,
    destacado: false
  },
  {
    id: 5,
    nombre: "Audífonos Inalámbricos Bluetooth Pro",
    precio: 79.00,
    precioAnterior: 99.00,
    descripcion: "Cancelación de ruido pasiva, alta calidad de sonido con bajos profundos y estuche de carga magnético portátil.",
    marca: "otras",
    categoria: "tecnologia",
    imagen: "assets/images/product-5.jpg",
    stock: true,
    descuento: 20,
    destacado: true
  },
  {
    id: 6,
    nombre: "Pulpa Hidratante para Manos Ekos Maracuyá",
    precio: 38.00,
    precioAnterior: null,
    descripcion: "Textura ligera de rápida absorción. Reequilibra e hidrata la piel de las manos dejando un aroma frutal fresco.",
    marca: "ekos",
    categoria: "cuidado-personal",
    imagen: "assets/images/product-6.jpg",
    stock: false, // Ejemplo de Producto Agotado
    descuento: 0,
    destacado: false
  },
  {
    id: 7,
    nombre: "Perfume Ccorori Yanbal 50ml",
    precio: 135.00,
    precioAnterior: 160.00,
    descripcion: "Aroma oriental dulce e intenso con notas de vainilla, chocolate y rosa. Un clásico de elegancia sensual.",
    marca: "yanbal",
    categoria: "perfumes",
    imagen: "assets/images/product-7.jpg",
    stock: true,
    descuento: 15,
    destacado: true
  },
  {
    id: 8,
    nombre: "Colonia L'essence Flores Blancas 200ml",
    precio: 48.00,
    precioAnterior: null,
    descripcion: "Frescura floral ligera y femenina para aplicar generosamente después de la ducha y mantenerse refrescada.",
    marca: "lessence",
    categoria: "perfumes",
    imagen: "assets/images/product-8.jpg",
    stock: true,
    descuento: 0,
    destacado: false
  }
];

// ==========================================
// 3. ESTADO DE LA APLICACIÓN (STATE)
// ==========================================
const state = {
  cart: [],
  filters: {
    search: "",
    category: "all",
    brand: "all",
    sort: "default"
  },
  currentCarouselIndex: 0,
  activeModalProductId: null
};

// ==========================================
// 4. SELECTORES DEL DOM
// ==========================================
const DOM = {
  // Header & Nav
  header: document.getElementById("header"),
  mainNav: document.getElementById("main-nav"),
  btnHamburger: document.getElementById("btn-hamburger"),
  btnThemeToggle: document.getElementById("btn-theme-toggle"),
  btnCartToggle: document.getElementById("btn-cart-toggle"),
  cartCount: document.getElementById("cart-count"),

  // Carrusel Destacados
  carouselContainer: document.getElementById("carousel-container"),
  carouselDots: document.getElementById("carousel-dots"),
  btnPrevSlide: document.getElementById("prev-slide"),
  btnNextSlide: document.getElementById("next-slide"),

  // Filtros & Catálogo
  searchInput: document.getElementById("search-input"),
  filterCategory: document.getElementById("filter-category"),
  filterBrand: document.getElementById("filter-brand"),
  sortOrder: document.getElementById("sort-order"),
  productsGrid: document.getElementById("products-grid"),
  categoryButtons: document.querySelectorAll("[data-category-filter]"),

  // Modal Producto
  productModal: document.getElementById("product-modal"),
  btnCloseModal: document.getElementById("btn-close-modal"),
  modalImage: document.getElementById("modal-product-image"),
  modalTitle: document.getElementById("modal-product-title"),
  modalCategory: document.getElementById("modal-product-category"),
  modalBrand: document.getElementById("modal-product-brand"),
  modalStock: document.getElementById("modal-product-stock"),
  modalPrice: document.getElementById("modal-product-price"),
  modalOldPrice: document.getElementById("modal-product-old-price"),
  modalDescription: document.getElementById("modal-product-description"),
  btnModalAddCart: document.getElementById("btn-modal-add-cart"),

  // Pedido Temporal (Drawer Cart)
  cartDrawer: document.getElementById("cart-drawer"),
  btnCloseCart: document.getElementById("btn-close-cart"),
  cartItemsContainer: document.getElementById("cart-items"),
  cartTotal: document.getElementById("cart-total"),
  btnWhatsappOrder: document.getElementById("btn-whatsapp-order"),
  footerWhatsappLink: document.getElementById("footer-whatsapp-link")
};

// ==========================================
// 5. RENDIMIENTO Y FUNCIONES AUXILIARES
// ==========================================
function formatPrice(amount) {
  return `${CONFIG.CURRENCY_SYMBOL} ${parseFloat(amount).toFixed(2)}`;
}

function showNotification(message, type = "info") {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.style.cssText = `
      position: fixed;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 999;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      pointer-events: none;
      width: 90%;
      max-width: 360px;
    `;
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;
  toast.style.cssText = `
    background: var(--color-primary, #1F2E3D);
    color: var(--color-background, #F5EEDF);
    padding: 0.75rem 1.25rem;
    border-radius: 20px;
    font-size: 0.88rem;
    font-weight: 500;
    text-align: center;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    border: 1px solid var(--color-accent, #906E4E);
    opacity: 0;
    transform: translateY(10px);
    transition: all 0.3s ease;
  `;

  container.appendChild(toast);

  // Animación de entrada
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
    toast.style.transform = "translateY(0)";
  });

  // Salida automática
  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    setTimeout(() => toast.remove(), 300);
  }, CONFIG.NOTIF_DURATION);
}

// ==========================================
// 6. RENDERIZADO DE PRODUCTOS Y CATÁLOGO
// ==========================================
function createProductCardHTML(p) {
  const isAgotado = !p.stock;
  const priceFormatted = formatPrice(p.precio);
  const oldPriceHTML = p.precioAnterior ? `<span class="product-old-price">${formatPrice(p.precioAnterior)}</span>` : "";
  const discountHTML = p.descuento > 0 ? `<span class="badge-discount">-${p.descuento}%</span>` : "";
  const stockBadgeHTML = isAgotado ? `<span class="badge-out-stock">Agotado</span>` : "";

  return `
    <article class="product-card ${isAgotado ? 'out-of-stock' : ''}" data-id="${p.id}">
      <div class="product-card-media">
        <div class="product-badges">
          ${discountHTML}
          ${stockBadgeHTML}
        </div>
        <img src="${p.imagen}" alt="${p.nombre}" class="product-card-image" loading="lazy" onerror="this.src='https://placehold.co/400x400/1F2E3D/F5EEDF?text=${encodeURIComponent(p.nombre)}';">
      </div>
      <div class="product-card-body">
        <span class="product-brand">${p.marca}</span>
        <h3 class="product-title">${p.nombre}</h3>
        <p class="product-description-snippet">${p.descripcion}</p>
        <div class="product-pricing">
          <span class="product-price">${priceFormatted}</span>
          ${oldPriceHTML}
        </div>
        <div class="product-card-actions">
          <button type="button" class="btn btn-add-cart" data-action="add-cart" data-id="${p.id}" ${isAgotado ? 'disabled' : ''}>
            ${isAgotado ? 'Agotado' : 'Agregar'}
          </button>
          <button type="button" class="btn-view-details" data-action="view-details" data-id="${p.id}" aria-label="Ver detalles de ${p.nombre}">
            👁️
          </button>
        </div>
      </div>
    </article>
  `;
}

function filterAndSortProducts() {
  return productos.filter(p => {
    // Buscador por nombre, marca o categoría
    const q = state.filters.search.toLowerCase().trim();
    const matchesSearch = !q || 
      p.nombre.toLowerCase().includes(q) || 
      p.marca.toLowerCase().includes(q) || 
      p.categoria.toLowerCase().includes(q) ||
      p.descripcion.toLowerCase().includes(q);

    // Filtro por Categoría
    const matchesCategory = state.filters.category === "all" || p.categoria === state.filters.category;

    // Filtro por Marca
    const matchesBrand = state.filters.brand === "all" || p.marca === state.filters.brand;

    return matchesSearch && matchesCategory && matchesBrand;
  }).sort((a, b) => {
    switch (state.filters.sort) {
      case "price-asc": return a.precio - b.precio;
      case "price-desc": return b.precio - a.precio;
      case "name-asc": return a.nombre.localeCompare(b.nombre);
      case "name-desc": return b.nombre.localeCompare(a.nombre);
      default: return 0; // Relevancia / Orden por defecto
    }
  });
}

function renderCatalog() {
  if (!DOM.productsGrid) return;

  const items = filterAndSortProducts();

  if (items.length === 0) {
    DOM.productsGrid.innerHTML = `
      <div class="loading-state">
        <p>🌸 No se encontraron productos con los filtros seleccionados.</p>
      </div>
    `;
    return;
  }

  DOM.productsGrid.innerHTML = items.map(p => createProductCardHTML(p)).join("");
}

// ==========================================
// 7. CARRUSEL DE PRODUCTOS DESTACADOS
// ==========================================
function renderFeaturedCarousel() {
  if (!DOM.carouselContainer) return;

  const featured = productos.filter(p => p.destacado);

  if (featured.length === 0) {
    DOM.carouselContainer.innerHTML = `<div class="carousel-placeholder-notice"><p>Próximamente más productos destacados.</p></div>`;
    return;
  }

  DOM.carouselContainer.innerHTML = featured.map(p => `
    <div class="carousel-slide" style="min-width: 260px; scroll-snap-align: start;">
      ${createProductCardHTML(p)}
    </div>
  `).join("");

  // Renderizar Indicadores (Dots)
  if (DOM.carouselDots) {
    DOM.carouselDots.innerHTML = featured.map((_, index) => `
      <span class="dot ${index === 0 ? 'active' : ''}" data-slide="${index}" role="tab"></span>
    `).join("");
  }
}

function setupCarouselControls() {
  if (!DOM.carouselContainer) return;

  const scrollAmount = 280;

  if (DOM.btnNextSlide) {
    DOM.btnNextSlide.addEventListener("click", () => {
      DOM.carouselContainer.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });
  }

  if (DOM.btnPrevSlide) {
    DOM.btnPrevSlide.addEventListener("click", () => {
      DOM.carouselContainer.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });
  }
}

// ==========================================
// 8. MODAL DE DETALLE DE PRODUCTO
// ==========================================
function openProductModal(productId) {
  const p = productos.find(item => item.id === parseInt(productId));
  if (!p || !DOM.productModal) return;

  state.activeModalProductId = p.id;

  DOM.modalImage.src = p.imagen;
  DOM.modalImage.alt = p.nombre;
  DOM.modalTitle.innerText = p.nombre;
  DOM.modalCategory.innerText = p.categoria.replace("-", " ");
  DOM.modalBrand.innerText = p.marca;
  DOM.modalDescription.innerText = p.descripcion;
  DOM.modalPrice.innerText = formatPrice(p.precio);

  if (p.precioAnterior) {
    DOM.modalOldPrice.innerText = formatPrice(p.precioAnterior);
    DOM.modalOldPrice.style.display = "inline";
  } else {
    DOM.modalOldPrice.style.display = "none";
  }

  if (p.stock) {
    DOM.modalStock.innerText = "Disponible";
    DOM.modalStock.style.backgroundColor = "var(--color-surface-alt)";
    DOM.modalStock.style.color = "var(--color-primary)";
    DOM.btnModalAddCart.disabled = false;
    DOM.btnModalAddCart.innerText = "Agregar al pedido";
  } else {
    DOM.modalStock.innerText = "Agotado";
    DOM.modalStock.style.backgroundColor = "var(--color-out-stock)";
    DOM.modalStock.style.color = "#FFFFFF";
    DOM.btnModalAddCart.disabled = true;
    DOM.btnModalAddCart.innerText = "Producto Agotado";
  }

  DOM.productModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden"; // Detener scroll del fondo
}

function closeProductModal() {
  if (!DOM.productModal) return;
  DOM.productModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  state.activeModalProductId = null;
}

// ==========================================
// 9. GESTIÓN DEL PEDIDO TEMPORAL (CARRITO)
// ==========================================
function saveCartToLocalStorage() {
  try {
    localStorage.setItem(CONFIG.LS_CART_KEY, JSON.stringify(state.cart));
  } catch (e) {
    console.warn("No se pudo guardar en localStorage:", e);
  }
}

function loadCartFromLocalStorage() {
  try {
    const saved = localStorage.getItem(CONFIG.LS_CART_KEY);
    if (saved) {
      state.cart = JSON.parse(saved);
    }
  } catch (e) {
    state.cart = [];
  }
}

function addToCart(productId) {
  const p = productos.find(item => item.id === parseInt(productId));
  if (!p) return;

  if (!p.stock) {
    showNotification(`El producto "${p.nombre}" está agotado actualmente.`, "warning");
    return;
  }

  const existingItem = state.cart.find(item => item.id === p.id);

  if (existingItem) {
    existingItem.cantidad += 1;
  } else {
    state.cart.push({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      imagen: p.imagen,
      cantidad: 1
    });
  }

  saveCartToLocalStorage();
  updateCartUI();
  showNotification(`✨ "${p.nombre}" se agregó a tu pedido.`);
}

function updateCartQuantity(productId, delta) {
  const item = state.cart.find(i => i.id === parseInt(productId));
  if (!item) return;

  item.cantidad += delta;

  if (item.cantidad <= 0) {
    removeFromCart(productId);
  } else {
    saveCartToLocalStorage();
    updateCartUI();
  }
}

function removeFromCart(productId) {
  state.cart = state.cart.filter(i => i.id !== parseInt(productId));
  saveCartToLocalStorage();
  updateCartUI();
  showNotification("Producto eliminado del pedido.");
}

function calculateCartTotal() {
  return state.cart.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
}

function updateCartUI() {
  // 1. Actualizar Badge Contador
  const totalCount = state.cart.reduce((sum, item) => sum + item.cantidad, 0);
  if (DOM.cartCount) {
    DOM.cartCount.innerText = totalCount;
  }

  // 2. Renderizar Lista de Productos dentro del Panel
  if (!DOM.cartItemsContainer) return;

  if (state.cart.length === 0) {
    DOM.cartItemsContainer.innerHTML = `
      <div class="empty-cart-message">
        <p>Tu pedido está vacío por el momento.</p>
        <p class="empty-cart-sub">Explora el catálogo y agrega tus productos favoritos.</p>
      </div>
    `;
  } else {
    DOM.cartItemsContainer.innerHTML = state.cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-img" onerror="this.src='https://placehold.co/100x100/1F2E3D/F5EEDF?text=M%2BF';">
        <div class="cart-item-info">
          <span class="cart-item-name">${item.nombre}</span>
          <span class="cart-item-price">${formatPrice(item.precio)} c/u</span>
          <div class="cart-item-qty-controls">
            <button type="button" class="qty-btn" data-action="decrease-qty" data-id="${item.id}">-</button>
            <span class="qty-value">${item.cantidad}</span>
            <button type="button" class="qty-btn" data-action="increase-qty" data-id="${item.id}">+</button>
          </div>
        </div>
        <button type="button" class="cart-item-remove" data-action="remove-item" data-id="${item.id}" aria-label="Eliminar producto">Eliminar</button>
      </div>
    `).join("");
  }

  // 3. Actualizar Total
  if (DOM.cartTotal) {
    DOM.cartTotal.innerText = formatPrice(calculateCartTotal());
  }
}

function openCartDrawer() {
  if (!DOM.cartDrawer) return;
  DOM.cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCartDrawer() {
  if (!DOM.cartDrawer) return;
  DOM.cartDrawer.setAttribute("aria-hidden", "true");
}

// ==========================================
// 10. GENERACIÓN DE MENSAJE Y WHATSAPP
// ==========================================
function generateWhatsAppMessage() {
  if (state.cart.length === 0) {
    return encodeURIComponent("¡Hola, Mar y Flor! 👋 Quisiera más información sobre los productos de su catálogo.");
  }

  let text = "Hola, Mar y Flor. 👋\nQuisiera realizar el siguiente pedido:\n\n";

  state.cart.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    text += `• ${item.nombre} x${item.cantidad} — ${formatPrice(subtotal)}\n`;
  });

  text += `\n*Total estimado: ${formatPrice(calculateCartTotal())}*\n\n`;
  text += "¿Podrían confirmarme la disponibilidad y los detalles de entrega en Iquitos? Gracias. 🌸";

  return encodeURIComponent(text);
}

function sendOrderToWhatsApp() {
  if (state.cart.length === 0) {
    showNotification("Tu pedido está vacío. Agrega productos antes de enviar.", "warning");
    return;
  }

  const encodedMessage = generateWhatsAppMessage();
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodedMessage}`;
  
  window.open(url, "_blank");
  showNotification("Redirigiendo a WhatsApp... 📲");
}

// ==========================================
// 11. MENÚ NAVEGACIÓN HAMBURGUESA
// ==========================================
function toggleMobileMenu() {
  if (!DOM.mainNav || !DOM.btnHamburger) return;

  const isExpanded = DOM.btnHamburger.getAttribute("aria-expanded") === "true";
  DOM.btnHamburger.setAttribute("aria-expanded", !isExpanded);
  DOM.mainNav.classList.toggle("active");
}

function closeMobileMenu() {
  if (!DOM.mainNav || !DOM.btnHamburger) return;
  DOM.btnHamburger.setAttribute("aria-expanded", "false");
  DOM.mainNav.classList.remove("active");
}

// ==========================================
// 12. MODO OSCURO (DARK MODE)
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem(CONFIG.LS_THEME_KEY);
  
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark-mode");
    if (DOM.btnThemeToggle) DOM.btnThemeToggle.innerText = "☀️";
  } else {
    document.body.classList.remove("dark-mode");
    if (DOM.btnThemeToggle) DOM.btnThemeToggle.innerText = "🌙";
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark-mode");
  localStorage.setItem(CONFIG.LS_THEME_KEY, isDark ? "dark" : "light");

  if (DOM.btnThemeToggle) {
    DOM.btnThemeToggle.innerText = isDark ? "☀️" : "🌙";
  }
}

// ==========================================
// 13. CONFIGURACIÓN DE EVENT LISTENERS
// ==========================================
function bindEvents() {
  // --- Filtros y Búsqueda ---
  if (DOM.searchInput) {
    DOM.searchInput.addEventListener("input", (e) => {
      state.filters.search = e.target.value;
      renderCatalog();
    });
  }

  if (DOM.filterCategory) {
    DOM.filterCategory.addEventListener("change", (e) => {
      state.filters.category = e.target.value;
      renderCatalog();
    });
  }

  if (DOM.filterBrand) {
    DOM.filterBrand.addEventListener("change", (e) => {
      state.filters.brand = e.target.value;
      renderCatalog();
    });
  }

  if (DOM.sortOrder) {
    DOM.sortOrder.addEventListener("change", (e) => {
      state.filters.sort = e.target.value;
      renderCatalog();
    });
  }

  // Clics en la sección visual de Tarjetas de Categorías
  DOM.categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cat = btn.getAttribute("data-category-filter");
      if (cat && DOM.filterCategory) {
        DOM.filterCategory.value = cat;
        state.filters.category = cat;
        renderCatalog();

        // Scroll suave a la sección catálogo
        const catalogSec = document.getElementById("productos");
        if (catalogSec) catalogSec.scrollIntoView({ behavior: "smooth" });
      }
    });
  });

  // --- Delegación de Clics Global para Tarjetas de Productos (Catálogo y Carrusel) ---
  document.addEventListener("click", (e) => {
    const addCartBtn = e.target.closest('[data-action="add-cart"]');
    if (addCartBtn) {
      const id = addCartBtn.getAttribute("data-id");
      addToCart(id);
      return;
    }

    const viewDetailsBtn = e.target.closest('[data-action="view-details"]');
    if (viewDetailsBtn) {
      const id = viewDetailsBtn.getAttribute("data-id");
      openProductModal(id);
      return;
    }
  });

  // --- Eventos Modal Detalle Producto ---
  if (DOM.btnCloseModal) {
    DOM.btnCloseModal.addEventListener("click", closeProductModal);
  }

  if (DOM.productModal) {
    DOM.productModal.addEventListener("click", (e) => {
      if (e.target === DOM.productModal) closeProductModal();
    });
  }

  if (DOM.btnModalAddCart) {
    DOM.btnModalAddCart.addEventListener("click", () => {
      if (state.activeModalProductId) {
        addToCart(state.activeModalProductId);
        closeProductModal();
      }
    });
  }

  // --- Eventos Drawer / Pedido Temporal ---
  if (DOM.btnCartToggle) {
    DOM.btnCartToggle.addEventListener("click", openCartDrawer);
  }

  if (DOM.btnCloseCart) {
    DOM.btnCloseCart.addEventListener("click", closeCartDrawer);
  }

  if (DOM.cartDrawer) {
    DOM.cartDrawer.addEventListener("click", (e) => {
      if (e.target === DOM.cartDrawer) closeCartDrawer();
    });
  }

  // Delegación de eventos dentro del Carrito (Sumar, Restar, Eliminar)
  if (DOM.cartItemsContainer) {
    DOM.cartItemsContainer.addEventListener("click", (e) => {
      const increaseBtn = e.target.closest('[data-action="increase-qty"]');
      if (increaseBtn) {
        updateCartQuantity(increaseBtn.getAttribute("data-id"), 1);
        return;
      }

      const decreaseBtn = e.target.closest('[data-action="decrease-qty"]');
      if (decreaseBtn) {
        updateCartQuantity(decreaseBtn.getAttribute("data-id"), -1);
        return;
      }

      const removeBtn = e.target.closest('[data-action="remove-item"]');
      if (removeBtn) {
        removeFromCart(removeBtn.getAttribute("data-id"));
        return;
      }
    });
  }

  if (DOM.btnWhatsappOrder) {
    DOM.btnWhatsappOrder.addEventListener("click", sendOrderToWhatsApp);
  }

  // --- WhatsApp Flotante y Footer ---
  const floatWspBtn = document.createElement("a");
  floatWspBtn.href = "#";
  floatWspBtn.className = "whatsapp-float-btn";
  floatWspBtn.setAttribute("aria-label", "Contactar por WhatsApp");
  floatWspBtn.innerHTML = "📲";
  document.body.appendChild(floatWspBtn);

  floatWspBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const message = generateWhatsAppMessage();
    window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${message}`, "_blank");
  });

  if (DOM.footerWhatsappLink) {
    DOM.footerWhatsappLink.addEventListener("click", (e) => {
      e.preventDefault();
      const message = generateWhatsAppMessage();
      window.open(`https://wa.me/${NUMERO_WHATSAPP}?text=${message}`, "_blank");
    });
  }

  // --- Navegación Móvil Hamburguesa ---
  if (DOM.btnHamburger) {
    DOM.btnHamburger.addEventListener("click", toggleMobileMenu);
  }

  // Cierre automático del menú móvil al hacer clic en enlaces de navegación
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach(link => {
    link.addEventListener("click", closeMobileMenu);
  });

  // --- Modo Oscuro ---
  if (DOM.btnThemeToggle) {
    DOM.btnThemeToggle.addEventListener("click", toggleTheme);
  }

  // --- Tecla Escape para Cerrar Modales ---
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProductModal();
      closeCartDrawer();
      closeMobileMenu();
    }
  });
}

// ==========================================
// 14. INICIALIZACIÓN
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  loadCartFromLocalStorage();
  renderCatalog();
  renderFeaturedCarousel();
  setupCarouselControls();
  updateCartUI();
  bindEvents();
});