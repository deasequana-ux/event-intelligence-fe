import api from "../http-config"
class MessageService{
    getReceivedMessage(page,pageSize,userId){
        return api.get(`/Messages/${userId}/received?Page=${page}&PageSize=${pageSize}`)
    }
    getSentMessage(page,pageSize,userId){
        return api.get(`/Messages/${userId}/sent?Page=${page}&PageSize=${pageSize}`)
    }
}

export default new MessageService();