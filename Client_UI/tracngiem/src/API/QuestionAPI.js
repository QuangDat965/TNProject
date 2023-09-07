const API_URL = 'http://103.38.236.189:83/Tn'; // Thay thế bằng URL thực tế của API

const QuestionAPI = {
    get: async (endpoint) => {
        try {
          const response = await fetch(`${API_URL}/${endpoint}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching data:', error);
          throw error;
        }
      },
    
      post: async (endpoint, data) => {
        try {
          const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error creating item:', error);
          throw error;
        }
      },
    
      put: async (endpoint, data) => {
        try {
          const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error updating item:', error);
          throw error;
        }
      },
    
      delete: async (endpoint) => {
        try {
          const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'DELETE'
          });
          const responseData = await response.json();
          return responseData;
        } catch (error) {
          console.error('Error deleting item:', error);
          throw error;
        }
      }
    };

export default QuestionAPI;