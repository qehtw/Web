async function fetchGroceries() {
    const response = await fetch('/api/groceries');
    const groceries = await response.json();
    showitems(groceries);
}

fetchGroceries();

// Відображення елементів
function showitems(items) {
    const groceryList = document.getElementById("groceryList");
    const itemCount = document.getElementById("itemCount");

    itemCount.textContent = `Showing ${items.length} items`;

    const innerHtml = items.reduce((gen, item) => {
        return gen += `
        <div class="card">
            <strong>${item.name}</strong>
            <span><strong>$${item.price}</strong></span>
            <span>${item.category}</span>
            <span>ID: ${item.id}</span>
        </div>`;
    }, "");

    groceryList.innerHTML = innerHtml;
}

// Пошук продуктів
function searchGroceries() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    fetch('/api/groceries')
        .then(response => response.json())
        .then(data => {
            const filteredItems = data.filter(item =>
                item.name.toLowerCase().includes(searchTerm) || 
                item.category.toLowerCase().includes(searchTerm)
            );
            showitems(filteredItems);
        });
}

// Сортування продуктів
function sortGroceries() {
    const sortOption = document.getElementById("sortOptions").value;
    fetch('/api/groceries')
        .then(response => response.json())
        .then(data => {
            let sortedItems = [...data];

            if (sortOption === "Low_to_high") {
                sortedItems.sort((a, b) => a.price - b.price);
            } else if (sortOption === "High_to_low") {
                sortedItems.sort((a, b) => b.price - a.price);
            } else if (sortOption === "A_to_Z") {
                sortedItems.sort((a, b) => a.name.localeCompare(b.name));
            } else if (sortOption === "Z_to_A") {
                sortedItems.sort((a, b) => b.name.localeCompare(a.name));
            }

            showitems(sortedItems);
        });
}

// Додавання нового продукту
async function addNewItem() {
    const newName = document.getElementById("addName").value.trim();
    const newPrice = document.getElementById("addPrice").value;
    const newCategory = document.getElementById("addCategory").value.trim();

    const newItem = { name: newName, price: newPrice, category: newCategory };

    const response = await fetch('/api/groceries', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
    });

    if (response.ok) {
        fetchGroceries();
    } else {
        alert("Product already exists");
    }
}

document.getElementById("item-btn").onclick = addNewItem;

// Редагування продукту
async function editItem() {
    const editId = document.getElementById("editId").value.trim();
    const editName = document.getElementById("editName").value.trim();
    const editPrice = document.getElementById("editPrice").value;
    const editCategory = document.getElementById("editCategory").value.trim();

    const updatedItem = { name: editName, price: editPrice, category: editCategory };

    const response = await fetch(`/api/groceries/${editId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedItem)
    });

    if (response.ok) {
        fetchGroceries();
    } else {
        alert("Product not found or invalid data");
    }
}

document.getElementById("edit-btn").onclick = editItem;
