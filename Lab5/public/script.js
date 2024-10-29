async function fetchGroceries() {
    const response = await fetch('/api/groceries');
    const groceries = await response.json();
    showitems(groceries);
}

fetchGroceries();

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
            <button onclick="deleteItem(${item.id})">Delete</button>
        </div>`;
    }, "");

    groceryList.innerHTML = innerHtml;
}

async function deleteItem(id) {
    try {
        const response = await fetch(`/api/groceries/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchGroceries();
        } else {
            const errorData = await response.json();
            console.error("Server error:", errorData);
            alert("Error deleting item: " + errorData.message);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Error deleting item: " + error.message);
    }
}

function searchAndSortGroceries() {
    const searchTerm = document.getElementById("searchInput").value.trim();
    const sortOption = document.getElementById("sortOptions").value;

    const query = new URLSearchParams({ search: searchTerm, sort: sortOption }).toString();
    fetch(`/api/groceries?${query}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            showitems(data);
        })
        .catch(error => {
            console.error('Error during search and sort:', error);
        });
}

document.getElementById("sortOptions").addEventListener("change", searchAndSortGroceries);

document.getElementById("searchInput").addEventListener("input", searchAndSortGroceries);

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

async function editItem() {
    const editId = document.getElementById("editId").value.trim();
    const editName = document.getElementById("editName").value.trim();
    const editPrice = document.getElementById("editPrice").value;
    const editCategory = document.getElementById("editCategory").value.trim();

    const updatedItem = { name: editName, price: editPrice, category: editCategory };

    try {
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
            const errorData = await response.json();
            alert("Error: " + errorData.message);
        }
    } catch (error) {
        console.error("Network error:", error);
        alert("Error updating item: " + error.message);
    }
}

document.getElementById("edit-btn").onclick = editItem;
