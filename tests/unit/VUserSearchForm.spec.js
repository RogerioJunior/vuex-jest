import { shallowMount } from '@vue/test-utils'
import VUserSearchForm from '@/components/VUserSearchForm'

describe('VUserSearchForm', () => {
    const build = () => {
        const wrapper = shallowMount(VUserSearchForm);

        return {
            wrapper,
            input: () => wrapper.find('input'),
            button: () => wrapper.find('button'),
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

    test('calls "submitted" event when submitting form', () => {
        const expectedUser = 'kuroski';
        const { wrapper, button, input } = build();

        //inserimos manualmente no input o nosso usiario pesquisado.
        //fazemos o trigger dos eventos de input, indicando que "escrevemos" nele.
        // e as ações de click/submit do botão
        input().element.value = expectedUser;

        input().trigger('input');
        button().trigger('click');
        button().trigger('submit');

        expect(wrapper.emitted().submitted[0]).toEqual([expectedUser])
    })
});