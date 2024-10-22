let groceries = [
    { id: 1, name: "Apple", price: 1.2, category: "Fruits" },
    { id: 2, name: "Banana", price: 0.5, category: "Fruits" },
    { id: 3, name: "Carrot", price: 0.8, category: "Vegetables" },
    { id: 4, name: "Broccoli", price: 1.5, category: "Vegetables" },
    { id: 5, name: "Milk", price: 1.3, category: "Dairy" },
    { id: 6, name: "Cheese", price: 2.5, category: "Dairy" }
];

export const getAllGroceries = (req, res) => {
    res.json(groceries);
};

export const addGrocery = (req, res) => {
    const { name, price, category } = req.body;
    const newItem = { id: groceries.length + 1, name, price, category };
    
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

    groceries[itemIndex] = { id: Number(id), name, price, category };
    res.json(groceries[itemIndex]);
};
