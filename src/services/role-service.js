import api from "../http-config"
class RoleService{
    getRoles(page,pageSize){
        return api.get(`/Roles?Page=${page}&PageSize=${pageSize}`)
    }
}

export default new RoleService();