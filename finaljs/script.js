const productForm = document.getElementById('productForm');
const titleInput = document.getElementById('title');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const categoryInput = document.getElementById('category');
const editIdInput = document.getElementById('editId');
const submitBtn = document.getElementById('submitBtn');
const productList = document.getElementById('productList');

const searchInput = document.getElementById('searchInput');
const filterCategory = document.getElementById('filterCategory');
const sortPrice = document.getElementById('sortPrice');

let products = JSON.parse(localStorage.getItem('products')) || [];

function saveToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
}

function renderProducts(productsToRender = products) {
    productList.innerHTML = '';

    if (productsToRender.length === 0) {
        productList.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: #777;">No products found.</p>';
        return;
    }

    productsToRender.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');

        const imgSrc = product.image ? product.image : 'https://via.placeholder.com/250?text=No+Image';

        card.innerHTML = `
            <img src="${imgSrc}" alt="${product.title}">
            <div class="product-info">
                <h3>${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">$${Number(product.price).toFixed(2)}</p>
            </div>
            <div class="card-actions">
                <button class="btn-edit" onclick="editProduct(${product.id})">Edit</button>
                <button class="btn-delete" onclick="deleteProduct(${product.id})">Delete</button>
            </div>
        `;
        productList.appendChild(card);
    });
}

productForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const title = titleInput.value.trim();
    const price = parseFloat(priceInput.value);
    const image = imageInput.value.trim();
    const category = categoryInput.value;
    const editId = editIdInput.value;

    if (!title || isNaN(price) || price < 0) {
        alert('Please provide a valid product name and a non-negative price.');
        return;
    }

    if (editId) {
   
        const index = products.findIndex(p => p.id === parseInt(editId));
        if (index !== -1) {
            products[index] = { 
                id: parseInt(editId),
                title, 
                price, 
                image, 
                category 
            };
        }
        submitBtn.textContent = 'Add Product';
    } else {
        const newProduct = {
            id: Date.now(),
            title,
            price,
            image,
            category
        };
        products.push(newProduct);
    }

    saveToLocalStorage();
    productForm.reset();
    editIdInput.value = ''; 
    applyFiltersAndSort(); 
});

window.deleteProduct = function(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(product => product.id !== id);
        saveToLocalStorage();
        applyFiltersAndSort();
    }
}

window.editProduct = function(id) {
    const product = products.find(p => p.id === id);
    if (product) {

        titleInput.value = product.title;
        priceInput.value = product.price;
        imageInput.value = product.image;
        categoryInput.value = product.category;
        
        editIdInput.value = product.id;
        submitBtn.textContent = 'Update Product';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}


function applyFiltersAndSort() {
    let result = [...products];
    const searchTerm = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;
    const sortOption = sortPrice.value;

    if (searchTerm) {
        result = result.filter(p => p.title.toLowerCase().includes(searchTerm));
    }

    if (selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory);
    }

    if (sortOption === 'lowToHigh') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'highToLow') {
        result.sort((a, b) => b.price - a.price);
    }

    renderProducts(result);
}

searchInput.addEventListener('input', applyFiltersAndSort);
filterCategory.addEventListener('change', applyFiltersAndSort);
sortPrice.addEventListener('change', applyFiltersAndSort);

renderProducts();