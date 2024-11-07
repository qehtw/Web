import { useContext, useState } from 'react';
import './mainContent.css';
import { allGrocieries } from '../../../allGrocieries/allGrocieries';
import CatalogItem from '../../Catalog/CatalogItems/CatalogItems';
import ViewMoreButton from '../viewButton/viewButton';

const GrocieryItems = () => {
    const { items } = useContext(allGrocieries);
    const [visibleItems, setVisibleItems] = useState(6);

    const handleViewMore = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 6); 
    };

    return (
        <section className="new-arrivals">
            <h2 className="new-arrivals-title">Топ місяця</h2>
            <div className="grocery-grid">
                {items.slice(0, visibleItems).map((item) => ( 
                    <CatalogItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        image={item.image}
                    />
                ))}
            </div>
            {visibleItems < items.length && ( 
                <ViewMoreButton onClick={handleViewMore} /> 
            )}
        </section>
    );
};

export default GrocieryItems;
