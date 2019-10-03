import userFixture from '../../tests/unit/fixtures/user'

export default {
    searchUser: jest.fn().mockResolvedValue(userFixture)
}

//mock de resposta da API do Github.