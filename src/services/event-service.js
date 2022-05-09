import api from "../http-config"
class EventService{
    getEvents(page,pageSize){
        return api.get(`/Events?Page=${page}&PageSize=${pageSize}`)
    }
    createEvent(event){
        return api.post("/Events", event)
    }
    UpdateEvent(event){
        return api.put("/Events", event)
    }
    GetEventById(id){
        return api.get(`/Events/${id}`)
    }
    DeleteEvent(id){
        return api.delete(`/Events/${id}`)
    }
    getCandidateUsersToAssign(id){
        return api.get(`/Events/${id}/candidates`)
    }
    assignUsersToEvent(payload){
        return api.post(`/Events/assign/users`, payload)
    }
    getAssignedUsers(id){
        return api.get(`/Events/${id}/participants`)
    }
    getCommentsByEventId(page,pageSize,id){
        return api.get(`/Events/${id}/comments?Page=${page}&PageSize=${pageSize}`)
    }
    commentToEvent(payload){
        return api.post(`/Comments`, payload)
    }

}

export default new EventService();