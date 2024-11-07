import React, { useContext, useState } from 'react';
import { allGrocieries } from '../../../allGrocieries/allGrocieries';
import CatalogItem from '../CatalogItems/CatalogItems';
import InputComponent from '../inputcomponent/inputcomponent';
import SelectComponent from '../selectComponent/selectComponent';
import SortButton from '../sortbutton/sortbutton';
import '../CatalogPage/CatalogPage.css';

const сatalog = () => {
  const { items } = useContext(allGrocieries);
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase().trim());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory
  });

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === 'desc' ? b.price - a.price : a.price - b.price;
  });

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const toggleSortOrder = () => setSortOrder(prevOrder => (prevOrder === 'desc' ? 'asc' : 'desc'));

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
      <div className="catalog-items">
        {sortedItems.length > 0 ? (
          sortedItems.map((item, index) => (
            <CatalogItem
              key={index}
              id={item.id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
            />
          ))
        ) : (
          <p>No items match your search!!!!!!!</p>
        )}
      </div>
    </div>
  );
};

export default сatalog;