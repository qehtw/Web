import axios from 'axios';

export const fetchItems = async (searchTerm = '', sortOrder = 'desc', category = '' ,size = '', type = '' ) => {
  const response = await axios.get('http://localhost:9000/api/groceries', {
    params: {
      search: searchTerm,
      sort: sortOrder === 'asc' ? 'asc' : 'desc',
      category: category,
      size: size,
      type: type
    },
  });
  return response;
};

export const fetchItemById = async (id) => {
  const response = await axios.get(`http://localhost:9000/api/groceries/${id}`);
  return response;
};