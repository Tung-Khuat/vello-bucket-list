import axios from 'axios';

const BASE_URL = 'http://3.250.152.98:3000/api';

const config = {
   headers: {
      'api-key': 'ceae7a87-2b74-4403-990c-31343fd0de9f',
   },
};

export const getListItems = () => {
   const API_URL = `${BASE_URL}/item`;
   const response = axios.get(API_URL, config);
   return response;
};

export const updateListItem = (uuid, updatedItem) => {
   const API_URL = `${BASE_URL}/item/${uuid}`;
   const response = axios.put(API_URL, updatedItem, config);
   return response;
};

export const deleteListItem = (uuid) => {
   const API_URL = `${BASE_URL}/item/${uuid}`;
   const response = axios.delete(API_URL, config);
   return response;
};
