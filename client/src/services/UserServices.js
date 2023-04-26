import axios from "axios";

const UserService = {
  getUsers: async () => {
    const response = await axios.get('/users')
   .catch(function (error) {
     return error;
   });
    return response.data;
  }
};

export default UserService;