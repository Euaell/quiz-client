import axios from 'axios'

export const BASE_URL = "http://localhost:5249/";

export const ENDPOINTS = {
    employee: "Employee",
    department: "department",
    user: "user",
    login: "login",
    item: "item",
    order: "order",
    services: "services",
}

export const createAPIEndpoint = endpoint => {
    let url = BASE_URL + "api/" + endpoint + "/";

    return {
        fetch: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        post: newRecord => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: id => axios.delete(url + id)
    }
}