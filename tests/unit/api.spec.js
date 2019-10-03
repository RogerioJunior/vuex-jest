import flushPromises from 'flush-promises'
// biblioteca para testar requisições http de forma isolada
import nock from 'nock'
import api from '@/api'
import userFixture from './fixtures/user'

describe('api', () => {
    it('searches for the user', async () => {
        const expectedUser = 'kuroski';

        // nock ira interceptar a requisição e retornar umas resposta de status 200 com o usuario esperado (fixture)
        const request = nock('https://api.github.com')
            .get(`/users/${expectedUser}`)
            .reply(200, userFixture);

        //chamar o método do service passando o usuário, e um flushPromise para garantir que
        // todas as promises estarão resolvidas a partir deste ponto.
        const result = await api.searchUser(expectedUser);
        await flushPromises();

        expect(result).toEqual(userFixture);
        expect(request.isDone()).toBe(true);
    })
});