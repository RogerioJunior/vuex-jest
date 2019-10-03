jest.mock('@/api');
import flushPromises from 'flush-promises'
import actions from '@/store/actions'
import api from '@/api'
import userFixture from './fixtures/user'

describe('store actions', () => {
    let commit;

    beforeEach(() => {
        commit = jest.fn()
    });

    test('searches for user', async () => {
        const expectedUser = 'kuroski';

        await actions.SEARCH_USER({ commit }, { username: expectedUser });
        // garantir que todas a promises foram resolvidas neste momento do teste
        await flushPromises();

        // ao chamar a action, nós esperamos que o nosso serviço de API tenha sido
        // chamado na função searchUser e que tenha sido passado o nosso usuário esperado.
        expect(api.searchUser).toHaveBeenCalledWith(expectedUser);
        expect(commit).toHaveBeenCalledWith('SET_USER', userFixture);
    })
});