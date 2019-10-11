import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import ElementUI from 'element-ui'
import VUserSearchForm from '@/components/VUserSearchForm'

const localVue = createLocalVue();
localVue.use(ElementUI);

describe('VUserSearchForm', () => {
    const build = () => {
        const options = { localVue };
        const wrapper = shallowMount(VUserSearchForm, options);
        const wrapperMounted = mount(VUserSearchForm, options);

        return {
            wrapper,
            wrapperMounted,
            input: () => wrapper.find('.search-form__input'),
            inputMounted: () => wrapperMounted.find('input'),
            button: () => wrapperMounted.find('.search-form__button'),
        }
    };

    // test('renders the component', () => {
    //     // arrange
    //     const { wrapper } = build();
    //
    //     expect(wrapper.html()).toMatchSnapshot();
    // });

    test('renderização dos dados recebidos via props', () => {
        const { input, button } = build();

        expect(input().exists()).toBe(true);
        expect(button().exists()).toBe(true);
    });

    test('verificar emissão do evento "submitted"', () => {
        const expectedUser = 'rato';
        const { wrapperMounted, button, inputMounted } = build();

        //inserimos manualmente no input o nosso usiario pesquisado.
        //fazemos o trigger dos eventos de input, indicando que "escrevemos" nele.
        // e as ações de click/submit do botão
        inputMounted().element.value = expectedUser;

        inputMounted().trigger('input');
        button().trigger('click');
        button().trigger('submit');

        expect(wrapperMounted.emitted().submitted[0]).toEqual([expectedUser])
    })
});