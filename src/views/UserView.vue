<template>
    <div>
      <VUserSearchForm @submitted="searchUser" />
      <VUserProfile :user="user" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import VUserSearchForm from '@/components/VUserSearchForm'
import VUserProfile from '@/components/VUserProfile'

    export default {
        name: "UserView",
        components: {
            VUserSearchForm,
            VUserProfile,
        },
        computed: {
            ...mapState({
                user: 'user',
            })
        },

        methods: {
            searchUser(username) {
                //aqui podemos ouvir os eventos de submitted enviados pelo VUserSearchForm,
                // que ao ser chamado, podemos fazer o dispatch da nossa action.
                this.$store.dispatch('SEARCH_USER', { username })
            }
        },
    }
</script>

<style scoped>

</style>