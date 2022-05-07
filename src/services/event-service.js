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
}

export default new EventService();