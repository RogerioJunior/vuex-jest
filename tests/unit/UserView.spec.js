jest.mock('@/store/actions');
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import UserView from '@/views/UserView'
import VUserSearchForm from '@/components/VUserSearchForm'
import VUserProfile from '@/components/VUserProfile'
import initialState from '@/store/state'
import actions from '@/store/actions'
import userFixture from './fixtures/user'

//criando instância local, fazendo exatamente o que é feito no main.js durante a instalação do Vuex
const localVue = createLocalVue();
localVue.use(Vuex);

describe('UserView', () => {

    let state;

    const build = () => {
        const wrapper = shallowMount(UserView, {
            // passamos para o nosso componente a nossa instância local do vue, assim como uma nova store
            //     (novamente, isso é exatamente o que está sendo feito no main.js )
            localVue,
            store: new Vuex.Store({
                state,
                actions,
            })
        });

        return {
            wrapper,
            userSearchForm: () => wrapper.find(VUserSearchForm),
            userProfile: () => wrapper.find(VUserProfile)
        }
    };

    beforeEach(() => {
        jest.resetAllMocks();
        state = { ...initialState }
    });

    // test('renders the component', () => {
    //     const { wrapper } = build();
    //
    //     expect(wrapper.html()).toMatchSnapshot()
    // });

    test('renders main child components', () => {
        const { userSearchForm, userProfile } = build();

        expect(userSearchForm().exists()).toBe(true);
        expect(userProfile().exists()).toBe(true);
    });

    test('passes a binded user prop to user profile component', () => {
        state.user = userFixture;
        const { userProfile } = build();

        expect(userProfile().vm.user).toBe(state.user)
    })

    test('searches for a user when received "submitted"', () => {
        const expectedUser = 'kuroski';
        const { userSearchForm } = build();

        // act
        userSearchForm().vm.$emit('submitted', expectedUser);

        expect(actions.SEARCH_USER).toHaveBeenCalled();
        expect(actions.SEARCH_USER.mock.calls[0][1]).toEqual({ username: expectedUser })
    })
});