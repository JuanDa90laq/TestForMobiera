import { ApiService } from './apiService';

export const UserService = {
  GetLoggedUser(user, password) {
    return ApiService.get(`/users?user=${user}&password=${password}`);
  },
  UpdateUser(user) {
    return ApiService.put(`/users/${user.id}`, { 
      user: user.user,
      name: user.name,
      lastname : user.lastname,
      password : user.password
    });
  },
}


