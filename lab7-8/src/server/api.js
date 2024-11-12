import axios from 'axios';

export const fetchItems = async (searchTerm = '', sortOrder = 'desc', category = '') => {
  const response = await axios.get('http://localhost:9000/api/groceries', {
    params: {
      search: searchTerm,
      sort: sortOrder === 'asc' ? 'asc' : 'desc',
      category: category
    },
  });
  return response;
};

// Функція для отримання товару за його ID
export const fetchItemById = async (id) => {
  const response = await axios.get(`http://localhost:9000/api/groceries/${id}`);
  return response;
};