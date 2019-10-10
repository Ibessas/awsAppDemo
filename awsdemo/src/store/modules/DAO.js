const state = {
    eventos: [],
    eventId: 0,
    palestraId: 0
}

const actions = {
    putEvento({commit}, evento){
        commit('SET_EVENTO', evento)
        commit('INCREMENT_EVENT_ID')
    },
    putPalestra({commit}, palestra){
        commit('SET_PALESTRA', palestra)
        commit('INCREMENT_PALESTRA_ID')
    }
}

const getters = {
    GET_EVENTO(state) {
        return state.eventos
    }
}

const mutations = {
    SET_EVENTO: (state, evento) => {
        evento.id = state.id
        state.eventos.push(evento)
    },
    SET_PALESTRA: (state, palestra) => {
        state.eventos.forEach(e => {
            if(e.id == palestra.eventoId){
                palestra.id = state.palestraId
                e.palestras.push(palestra)
            }
        });
    },

    INCREMENT_EVENT_ID: (state) => {
        state.eventId++
    },

    INCREMENT_PALESTRA_ID: (state) => {
        state.palestraId++
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}
