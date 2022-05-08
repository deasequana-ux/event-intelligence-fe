import api from "../http-config"
class UserService{
    getUsers(page,pageSize){
        return api.get(`/Users?Page=${page}&PageSize=${pageSize}`)
    }
}

export default new UserService();