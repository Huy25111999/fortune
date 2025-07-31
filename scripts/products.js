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
        image: product.image.replace(/^\/fortune\//, '../')
      }));
    }
    filterProducts();
  });

let filteredProducts = [...products];
const itemsPerPage = 8;
let currentPage = 1;

function renderProducts() {
  const list = document.getElementById('product-list');
  list.innerHTML = '';

  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageItems = filteredProducts.slice(start, end);

  if (pageItems.length === 0) {
    list.innerHTML = '<p>Không tìm thấy sản phẩm.</p>';
    return;
  }

  pageItems.forEach((p, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-3 mb-4 product-card';

    let bestSellerLabel;
    if (p.sale) {
      bestSellerLabel = `<span class="badge rounded-pill position-absolute top-0 end-0">Best-seller</span>`
    } else {
      bestSellerLabel = ``
    }

    col.innerHTML = `
            <div class="card h-100 text-center card-wrapper">
                        <div class="hover-area">
                            <div class="text-decoration-none text-dark product-link">
                                ${bestSellerLabel}
                                <img src="${p.image}" class="card-img-top" alt="${p.name}">
                                <h6 class="card-title text-start mb-0 ps-3">${p.name}</h6>
                            </div>  
                            <div class="card-overlay"></div>
                            <div class="card-overlay-content">
                                <a class="text-decoration-none" href="detail.html?id=${p.id}">
                                <button class="btn btn-light">Xem chi tiết</button>
                                </a>
                            </div>
                        </div>

                        <div class="card-body text-start">
                            <p class="card-text text-muted">Giá: <a href="detail.html?id=${p.id}">Liên hệ</a> </p>
                        </div>
                    </div>
        `;
    list.appendChild(col);
    applyLinkThemeColor(window.theme?.link);

  });
}

function renderPagination() {
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  // const totalPages = Math.min(2, Math.ceil(filteredProducts.length / itemsPerPage));

  const pagination = document.getElementById('pagination');
  pagination.innerHTML = '';

  // Nút Previous
  const prevLi = document.createElement('li');
  prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
  prevLi.innerHTML = `<a class="page-link" href="#"><i class="fa-solid fa-chevron-left"></i></a>`;
  prevLi.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      renderPagination();
    }
  });
  pagination.appendChild(prevLi);

  // for (let i = 1; i <= totalPages; i++) {
  //   const li = document.createElement('li');
  //   li.className = `page-item ${i === currentPage ? 'active' : ''}`;
  //   li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
  //   li.addEventListener('click', (e) => {
  //     e.preventDefault();
  //     currentPage = i;
  //     renderProducts();
  //     renderPagination();
  //   });
  //   pagination.appendChild(li);
  // }

  for (let i = 1; i <= totalPages; i++) {
    const isDisabled = i >= 3; // từ trang 3 trở đi sẽ bị disable
    const li = document.createElement('li');
    li.className = `page-item ${i === currentPage ? 'active' : ''} ${isDisabled ? 'disabled' : ''}`;
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;

    if (!isDisabled) {
      li.addEventListener('click', (e) => {
        e.preventDefault();
        currentPage = i;
        renderProducts();
        renderPagination();
      });
    }

    pagination.appendChild(li);
  }

  // Nút Next
  const nextLi = document.createElement('li');
  // nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
  const isNextDisabled = currentPage >= 2 || currentPage === totalPages;
  nextLi.className = `page-item ${isNextDisabled ? 'disabled' : ''}`;
  nextLi.innerHTML = `<a class="page-link" href="#"><i class="fa-solid fa-chevron-right"></i></a>`;

  nextLi.addEventListener('click', (e) => {
    e.preventDefault();
    // if (currentPage < totalPages) {
    if (currentPage < 2) {
      currentPage++;
      renderProducts();
      renderPagination();
    }
  });
  pagination.appendChild(nextLi);
  applyLinkThemeColor(window.theme?.link);
}

let selectedCategory = '';
let searchKeyword = '';

function filterProducts() {
  filteredProducts = products.filter(p => {
    const matchKeyword =
      p.name.toLowerCase().includes(searchKeyword) ||
      p.desc.toLowerCase().includes(searchKeyword);

    const matchCategory =
      !selectedCategory || p.category === selectedCategory;

    return matchKeyword && matchCategory;
  });

  currentPage = 1;
  renderProducts();
  renderPagination();
}

document.querySelectorAll('.list-group-item a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const category = this.getAttribute('data-category');
    selectedCategory = category === 'all' ? '' : category;
    filterProducts();
  });

});


document.getElementById('searchInput').addEventListener('input', function () {
  searchKeyword = this.value.toLowerCase();
  filterProducts();
});

// Khởi tạo
renderProducts();
renderPagination();