    const groceries = [
        {id: 1, name: "Apple", price: 1.2, category: "Fruits"},
        {id: 2, name: "Banana", price: 0.5, category: "Fruits" },
        {id: 3, name: "Carrot", price: 0.8, category: "Vegetables" },
        {id: 4, name: "Broccoli", price: 1.5, category: "Vegetables" },
        {id: 5, name: "Milk", price: 1.3, category: "Dairy" },
        {id: 6, name: "Cheese", price: 2.5, category: "Dairy" },
        {id: 7, name: "Pineapple", price: 2.5, category: "Dairy" }
    ];

    let filteredItems = [...groceries];

    function showitems(items) {
        const groceryList = document.getElementById("groceryList");
        const itemCount = document.getElementById("itemCount");

        itemCount.textContent = `Showing ${items.length} items`;

        let item_id = 1;

        const innerHtml = items.reduce((gen, item) => {
            gen += `<div class="card"><strong>${item.name}</strong>
                <span><strong id="${item_id}">$${item.price}</strong></span>
                <span>${item.category}</span>
                <span>${item.id}</span>
                </div>`;
                
            item_id++;
            return gen;
        }, "");
        groceryList.innerHTML = innerHtml;
    }

    showitems(groceries);

    function searchGroceries() {
        const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
        filteredItems = groceries.filter(item =>
            item.name.toLowerCase().includes(searchTerm) || item.category.toLowerCase().includes(searchTerm)
        );
        
        sortGroceries();
    }

    function sortGroceries() {
        const sortOption = document.getElementById("sortOptions").value;
        let sortedItems = [...filteredItems];

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
    }

    function addNewItem(){
        const newName = document.getElementById("addName").value.trim();
        const newPrice = document.getElementById("addPrice").value;
        const newCategory = document.getElementById("addCategory").value.trim();

        if(newName.length === 0 || newPrice <= 0 || newCategory.length === 0){
            alert("give normal info");
        } else {
            const newItem = {id: groceries.length + 1, name: newName, price: newPrice, category: newCategory };
            const newgrocieris = groceries.find((element) => element.name == newName);

            if(newgrocieris){
                alert("already exist");
            } else {
                groceries.push(newItem);
                showitems(groceries);
            }
        }       
    }

document.getElementById("item-btn").onclick = addNewItem;

function edit_item(){

    const editId = document.getElementById("editId").value.trim();
    let editName = document.getElementById("editName").value.trim();
    const editPrice = document.getElementById("editPrice").value;
    let editCategory = document.getElementById("editCategory").value.trim();

    if(editPrice <= 0 || editId >= groceries.length+2 ){
        alert("give normal info");
    }else{

        if(document.getElementById("editName").value.trim() == ""){
            editName = groceries[editId-1].name
            console.log(editName)
        }
        if(document.getElementById("editCategory").value.trim() == ""){
            editCategory = groceries[editId-1].category
            console.log(editName)
        }

        const replacedObj = {id: editId , name: editName , price: editPrice , category: editCategory}

        if(groceries[editId-1].name == editName){

            groceries.splice(editId-1, 1 , replacedObj)

            showitems(groceries)
            console.log(groceries)

        }else{
            if(groceries.find((element) => element.name == editName )){
                alert("Боcс цієї качалки не дасть тобі впихнути one more card")
                return
            }

        groceries.splice(editId-1, 1 , replacedObj)


        showitems(groceries)


        console.log(editId,editName,editPrice,editCategory,groceries.indexOf(replacedObj))

        }
    }

}


document.getElementById("edit-btn").onclick = edit_item;
