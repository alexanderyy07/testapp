import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    field_name: '',
    selected_fields: []
  },
  mutations: {
    addField (state, data) {
      state.selected_fields.push(data.text)
      if (state.field_name === '') {
        state.field_name = data.field
      } else {
        state.field_name += ',' + data.field
      }
    }
  }
})
