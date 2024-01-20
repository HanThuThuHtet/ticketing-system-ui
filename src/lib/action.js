
const Fetch = async ({uri,page,ticketsPerPage,search=""}) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token is missing');
      }
  
      const url = `http://localhost:8080/api/${uri}?search=${search}&page=${page}&perPage=${ticketsPerPage}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      if (response.status === 403) {
        router.push('/error/403');
        return;
      }
  
      const result = await response.json();
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  

export default Fetch;