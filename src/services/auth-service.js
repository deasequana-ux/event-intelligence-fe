import api from "../http-config"
class AuthService{
    login(loginFormObject){
        return api.post("/Auth", loginFormObject)
    }
}

export default new AuthService();