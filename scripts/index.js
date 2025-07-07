/*---Product---*/
let products = [];

const isGithub = location.hostname.includes("github.io");
const dataPath = isGithub ? "/fortune/data/products.json" : "../data/products.json";
fetch(dataPath)
    .then(response => response.json())
    .then(data => {
        products = data;
        if (!isGithub) {
            products = products.map(product => ({
                ...product,
                mainImage: product.mainImage.replace(/^\/fortune\//, '')
            }));
        }
        renderProducts(products);
    });

const productContainer = document.getElementById('product-list');
const noResult = document.getElementById('noResult');

function renderProducts(data) {
    productContainer.innerHTML = '';
    noResult.style.display = data.length === 0 ? 'block' : 'none';

    const limited = data.slice(0, 8);
    limited.forEach((p, index) => {
        const card = document.createElement('div');
        card.className = 'col-md-3 mb-4 product-card';
        card.setAttribute('data-name', p.name.toLowerCase());

        let bestSellerLabel;
        if (p.sale) {
            bestSellerLabel = `<span class="badge rounded-pill position-absolute top-0 end-0">Best-seller</span>`
        } else {
            bestSellerLabel = ``
        }

        card.innerHTML = `
                     <div class="card h-100 text-center card-wrapper">
                        <div class="hover-area">
                            <div class="text-decoration-none text-dark product-link">
                                ${bestSellerLabel}
                                <img src="${p.mainImage}" class="card-img-top" alt="${p.name}">
                                <h6 class="card-title text-start mb-0 ps-3">${p.name}</h6>
                            </div>  
                            <div class="card-overlay"></div>
                            <div class="card-overlay-content">
                                <a class="text-decoration-none" href="products/detail.html?id=${p.id}">
                                <button class="btn btn-light">Xem chi tiết</button>
                                </a>
                            </div>
                        </div>

                        <div class="card-body text-start">
                            <p class="card-text text-muted">Giá: <a href="products/detail.html?id=${p.id}">Liên hệ</a> </p>
                        </div>
                    </div>
                    `;
        productContainer.appendChild(card);
    });
}

// Render products
renderProducts(products);

// Search products
document.getElementById('searchInput').addEventListener('input', function () {
    const keyword = this.value.toLowerCase();
    const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
    renderProducts(filtered);
});

document.getElementById('quick-search').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const keyword = this.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(keyword));
        renderProducts(filtered);

        const productList = document.getElementById('our-products');
        if (productList) {
            productList.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

document.querySelectorAll('.list-group-item a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const category = this.getAttribute('data-category');

        let filtered;
        if (category === 'all') {
            filtered = products;
        } else {
            filtered = products.filter(p => p.category === category);
        }

        renderProducts(filtered);
    });
});
