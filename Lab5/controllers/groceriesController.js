let groceries = [
    { id: 1, name: "Apple", price: 1.2, category: "Fruits" },
    { id: 2, name: "Banana", price: 0.5, category: "Fruits" },
    { id: 3, name: "Carrot", price: 0.8, category: "Vegetables" },
    { id: 4, name: "Broccoli", price: 1.5, category: "Vegetables" },
    { id: 5, name: "Milk", price: 1.3, category: "Dairy" },
    { id: 6, name: "Cheese", price: 2.5, category: "Dairy" }
];

export const getAllGroceries = (req, res) => {
    let { search, sort } = req.query;
    
    let filteredGroceries = [...groceries];

    if (search) {
        search = search.toLowerCase();
        filteredGroceries = filteredGroceries.filter(item =>
            item.name.toLowerCase().includes(search) ||
            item.category.toLowerCase().includes(search)
        );
    }

    if (sort === "Low_to_high") {
        filteredGroceries.sort((a, b) => a.price - b.price);
    } else if (sort === "High_to_low") {
        filteredGroceries.sort((a, b) => b.price - a.price);
    } else if (sort === "A_to_Z") {
        filteredGroceries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === "Z_to_A") {
        filteredGroceries.sort((a, b) => b.name.localeCompare(a.name));
    }

    res.json(filteredGroceries);
};

export const addGrocery = (req, res) => {
    const { name, price, category } = req.body;

    const maxId = groceries.length > 0 ? Math.max(...groceries.map(item => item.id)) : 0;

    const newItem = { id: maxId + 1, name, price, category };
    
    const existingItem = groceries.find(item => item.name === name);
    if (existingItem) {
        return res.status(400).json({ message: "Product already exists" });
    }

    groceries.push(newItem);
    res.status(201).json(newItem);
};

export const editGrocery = (req, res) => {
    const { id } = req.params;
    const { name, price, category } = req.body;

    const itemIndex = groceries.findIndex(item => item.id == id);

    if (itemIndex === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const existingItemWithSameName = groceries.find(item => item.name === name && item.id != id);
    
    if (existingItemWithSameName) {
        return res.status(400).json({ message: "Product name already exists" });
    }

    groceries[itemIndex] = { id: Number(id), name, price, category };

    res.json(groceries[itemIndex]);
};

export const deleteGrocery = (req, res) => {
    console.log("Delete request received for ID:", req.params.id);

    const { id } = req.params;
    const itemIndex = groceries.findIndex(item => item.id == id);
    
    if (itemIndex === -1) {
        console.log("Product not found");
        return res.status(404).json({ message: "Product not found" });
    }

    groceries.splice(itemIndex, 1);
    console.log("Product deleted successfully");
    res.status(200).json({ message: "Product deleted successfully" });
};