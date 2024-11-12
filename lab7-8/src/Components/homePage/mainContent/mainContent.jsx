import { useState, useEffect } from 'react';
import './mainContent.css';
import CatalogItem from '../../Catalog/CatalogItems/CatalogItems'; // Імпортуємо компонент CatalogItem
import ViewMoreButton from '../viewButton/viewButton';
import { fetchItems } from '../../../server/api'; // Імпортуємо функцію для запиту товарів з сервера

const GrocieryItems = () => {
    const [items, setItems] = useState([]); // Стан для зберігання товарів
    const [visibleItems, setVisibleItems] = useState(6); // Встановлюємо кількість видимих товарів
    const [loading, setLoading] = useState(true); // Стан для індикатора завантаження
    const [error, setError] = useState(null); // Стан для помилки

    useEffect(() => {
        const loadItems = async () => {
            try {
                const response = await fetchItems(); // Отримуємо товари з сервера
                setItems(response.data); // Зберігаємо товари в стані
            } catch (error) {
                setError("Не вдалося завантажити товари");
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false); // Завершуємо завантаження
            }
        };
        loadItems(); // Завантажуємо товари при завантаженні компонента
    }, []);

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6); // Збільшуємо кількість видимих товарів
    };

    if (loading) return <p>Завантаження...</p>;
    if (error) return <p>{error}</p>; // Виводимо повідомлення про помилку

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">Топ місяця</h2>
            <div className="grocery-grid">
                {/* Перебираємо товари і відображаємо кожен за допомогою CatalogItem */}
                {items.slice(0, visibleItems).map((item) => ( 
                    <CatalogItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}  // Передаємо картинку як пропс
                    />
                ))}
            </div>
            {/* Показуємо кнопку "Показати більше", якщо є ще товари для відображення */}
            {visibleItems < items.length && ( 
                <ViewMoreButton onClick={handleViewMore} /> 
            )}
        </section>
    );
};

export default GrocieryItems;
