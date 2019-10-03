import api from '@/api'

export default {
    SEARCH_USER({ commit }, { username }) {
        return new Promise(async (resolve, reject) => {
            try {
                // primeiro chamando a nossa api.searchUser enviando o username que está sendo passado por parâmetro.
                //     E logo em seguida com a resposta, fazer o commit de uma mutação
                //     enviando o nosso usuário retornado do serviço de API.
                const user = await api.searchUser(username);
                commit('SET_USER', user);
                resolve(user)
            } catch(error) {
                reject(error)
            }
        })
    }
}