import {createStore} from 'vuex'

export default createStore({
    state: {
        userData: null,
    },
    mutations: {
        setUserData(state, data) {
            state.userData = data;
        },
    },
    getters: {
        getUserData: state => state.userData,

    },
    actions: {},
    modules: {}
});
