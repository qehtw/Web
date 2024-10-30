import './mainContent.css'; 

const groceries = () => {
    const groceries = [
        {id: 1, name: "Apple", price: 1.2, category: "Fruits", image: require('../../images/Apple.jpg')},
        {id: 2, name: "Banana", price: 0.5, category: "Fruits", image: require('../../images/Banana.jpg') },
        {id: 3, name: "Carrot", price: 0.8, category: "Vegetables", image: require('../../images/Carrot.jpg') },
        {id: 4, name: "Broccoli", price: 1.5, category: "Vegetables", image: require('../../images/Broccoli.jpg') },
        {id: 5, name: "Milk", price: 1.3, category: "Dairy", image: require('../../images/Milk.jpg') },
        {id: 6, name: "Cheese", price: 2.5, category: "Dairy", image: require('../../images/Cheese.jpg') },
        {id: 7, name: "Pineapple", price: 2.5, category: "Dairy", image: require('../../images/Pineapple.jpg') }
    ];

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">Best sellers</h2>
            <div className="grocery-grid">
                {groceries.map(grocery => (
                    <div key={grocery.id} className="grocery-block">
                        <img src={grocery.image} alt={grocery.name} className="grocery-image" />
                        <p className="grocery-name">{grocery.name}</p>
                        <p className="grocery-category">{grocery.category}</p>
                        <p className="grocery-price">{grocery.price}</p> 
                    </div>
                ))}
            </div>
        </section>
    );
};

export default groceries;