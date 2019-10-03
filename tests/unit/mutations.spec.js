import mutations from '@/store/mutations'
import initialState from '@/store/state'
import user from './fixtures/user'

describe('mutations', () => {
    let state;

    beforeEach(() => {
        state = { ...initialState }
    });

    test('sets new user', () => {
        const expectedUser = user;

        //chamar diretamente a nossa mutation, mandando esse state, passando o nosso usuário.
        mutations.SET_USER(state, expectedUser);

        expect(state.user).toEqual(expectedUser);
        expect(state.user).not.toBe(expectedUser);

        //esperamos que o state tenha sido setado sendo o nosso usuário, e garantir
        // que é uma função pura, esperar que o valor do state seja uma cópia do usuário original.
    })
});