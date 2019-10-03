import axios from 'axios'
import httpAdapter from 'axios/lib/adapters/http'

const instance = axios.create({
    baseURL: 'https://api.github.com',
    //adapter para utilizar o axios com o nock. permite customizar a forma que o axios
    // lida com as requests, possibilitando que o nock consiga interceptar as requisições.
    adapter: httpAdapter,
});

export default {
    //método que recebe o username, retornando uma requisição GET para a api de usuários do github.
    searchUser(username) {
        return instance
            .get(`/users/${username}`)
            .then(result => result.data)
    }
}