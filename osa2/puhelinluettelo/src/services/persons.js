import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = uusiHlo => {
    const request = axios.post(baseUrl, uusiHlo)
    return request.then(response => response.data)
}


const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const update = (id, uusiHlo) => {
    const request = axios.put(`${baseUrl}/${id}`, uusiHlo)
    return request.then(response => response.data)
  }

const exportedObject = {
    getAll, create, deletePerson, update
}


export default exportedObject