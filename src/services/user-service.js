import api from "../http-config"
class UserService{
    getUsers(page,pageSize){
        return api.get(`/Users?Page=${page}&PageSize=${pageSize}`)
    }
    createUser(payload){
        return api.post(`/Users`, payload)
    }
    deleteUser(id){
        return api.delete(`/Users/${id}`)
    }
    updateUser(payload){
        return api.put(`/Users`, payload)
    }
}

export default new UserService();