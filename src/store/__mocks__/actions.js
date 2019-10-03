import userFixture from '../../../tests/unit/fixtures/user'

export default {
    SEARCH_USER: jest.fn().mockResolvedValue(userFixture)
}

// Aqui basicamente é retornado um objeto com a nossa função de SEARCH_USER com um
// valor “padrão”, que seria uma promise resolvida com o nosso usuário da fixture.