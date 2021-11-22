const APIS = {
  getImage: async (page = 1, limit = 10) => {
    try {
      const data = await fetch(`https://api.unsplash.com/photos/?client_id=${process.env.ACCESS__KEY}&page=${page}&per_page=${limit}`);
      const result = await data.json();
      return result;
    } catch (error) {
      console.log(error);
    }
  },
};

export default APIS;
