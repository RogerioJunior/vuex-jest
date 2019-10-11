// Utilizando o jest.mock, o jest ira procurar por src/store/__mocks__/actions.js ao invés do original src/store/actions.js
jest.mock('@/store/actions');
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UserView from '@/views/UserView'
import VUserSearchForm from '@/components/VUserSearchForm'
import VUserProfile from '@/components/VUserProfile'
import initialState from '@/store/state'
//importamos as nossas actions da store, que na realidade é o arquivo de mock que iremos criar.
import actions from '@/store/actions'
import userFixture from './fixtures/user'

//criar uma instancia local para ser passada ao componente, indicando todas as dependencia que serão utilizadas
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserView', () => {

    let state;

    //buildar estrutura de testes
    const build = () => {
        const wrapper = shallowMount(UserView, { // shallowMount renderiza apenas o primeiro nivel do componente
            // passamos para o nosso componente a nossa instância local do vue, assim como uma nova store
            //     (isso é exatamente o que é feito no main.js )
            localVue,
            store: new Vuex.Store({
                state,
                actions,
            })
        });
//retorna objeto contendo o wrapper e todos os seletores, elementos e utilitarios que podem ser usados entre os testes
        return {
            wrapper,
            userSearchForm: () => wrapper.find(VUserSearchForm),
            userProfile: () => wrapper.find(VUserProfile)
        }
    };

    // sempre chamado antes de cada test. resetar as variaveis
    beforeEach(() => {
        //resetando entre cada teste, todas as mock functions para o estado original, para nenhum teste impactar nos resultados do outro.
        jest.resetAllMocks();
        state = { ...initialState }
    });

    // test('renders the component', () => {
    //     const { wrapper } = build();
    //
    //     expect(wrapper.html()).toMatchSnapshot()
    // });

    test('renderizou os componentes filhos', () => {
        // destructuring
        const { userSearchForm, userProfile } = build();

        expect(userSearchForm().exists()).toBe(true);
        expect(userProfile().exists()).toBe(true);
    });

    test('valida binds do componente, passando uma propriedade para o componente contendo um objeto', () => {
        state.user = userFixture;
        const { userProfile } = build();

        expect(userProfile().vm.user).toBe(state.user)
    });

    test('verificar emissão do evento "submitted"', () => {
        const expectedUser = 'rato';
        const { userSearchForm } = build();

        userSearchForm().vm.$emit('submitted', expectedUser);

        //esperamos que a action da store chamada SEARCH_USER tenha sido invocada,
        // e que tenha sido passado como payload um objeto contendo o nosso usuário
        expect(actions.SEARCH_USER).toHaveBeenCalled();
        expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser })

        // Quando um store.dispatch é executado, o Vuex internamente chama a nossa
        // action por nós, e ele acaba injetando no primeiro parâmetro um objeto contendo
        // dados que podemos utilizar na action, e como segundo parâmetro, é o nosso payload.
        //  Então precisamos manualmente pegar o segundo parâmetro da chamada da
        //  store que é o payload (o nosso username).
    })
});