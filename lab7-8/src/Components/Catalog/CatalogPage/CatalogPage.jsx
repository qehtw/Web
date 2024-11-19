import React, { useState, useEffect } from 'react';
import { fetchItems } from '../../../server/api';
import CatalogItem from '../CatalogItems/CatalogItems';
import InputComponent from '../inputcomponent/inputcomponent';
import SelectComponent from '../selectComponent/selectComponent';
import SortButton from '../sortbutton/sortbutton';
import './CatalogPage.css';
import Loader from '../../loader/Loader';

const Catalog = () => {
  const [items, setItems] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [fetchTimeout, setFetchTimeout] = useState(null);

  const fetchData = async () => {
    setLoading(true);
 
    if (fetchTimeout) {
      clearTimeout(fetchTimeout);
    }

    const timeoutId = setTimeout(async () => {
      try {
        const response = await fetchItems(searchTerm, sortOrder, selectedCategory);
        setItems(response.data); 
      } catch (error) {
        console.error("Error fetching items:", error);
      }
      setLoading(false);
    }, 5900); 

    setFetchTimeout(timeoutId);
  };

  useEffect(() => {
    fetchData(); 
    return () => {
      if (fetchTimeout) {
        clearTimeout(fetchTimeout);
      }
    };
  }, [searchTerm, sortOrder, selectedCategory]); 

  const filteredItems = items.filter(item => {
    // Перевіряємо, чи існує поле name і виконуємо пошук
    const matchesSearch = item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));
  };

  return (
    <div className="catalog">
      <div className="filters">
        <InputComponent
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name..."
          className="search-bar"
        />
        <SelectComponent
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="filter-select"
          options={[
            { value: '', label: 'All Categories' },
            { value: 'Fruits', label: 'Fruits' },
            { value: 'Vegetables', label: 'Vegetables' },
            { value: 'Dairy', label: 'Dairy' },
            { value: 'COCONUTS', label: 'COCONUTS' }
          ]}
        />
        <SortButton sortOrder={sortOrder} toggleSortOrder={toggleSortOrder} />
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div className="catalog-items">
          {sortedItems.length > 0 ? (
            sortedItems.map((item) => (
              <CatalogItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                description={item.description}
                image={item.image}
              />
            ))
          ) : (
            <p>No items match your search!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Catalog;
