import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    primaryPassenger: {
      fullName: null,
      age: null,
      email: null,
      country: {},
      street: null,
      zip: null,
      phone: null
    },
    secondaryPassengers: [],
    countries: [],
    // To know if the primary passenger data was entered successfully
    primaryPassengerStatus: false

  },
  getters: {

    getPrimaryPassenger: state => {
      return state.primaryPassenger;
    },
    getPrimaryPassengerStatus: state => {
      return state.primaryPassengerStatus;
    },
    getSecondaryPassengers: state => {
      return state.secondaryPassengers;
    },
    getCountries: state => {
      return state.countries;
    }

  },
  mutations: {

    setPrimaryPassenger: (state, data) => {
      state.primaryPassenger = data
    },
    setPrimaryPassengerStatus: state => {
      state.primaryPassengerStatus = true;
    },
    setSecondaryPassengers: (state, data) => {
      state.secondaryPassengers.push(data);
    },
    deleteSecondaryPassenger: (state, index) => {
      if (index > -1)
        state.secondaryPassengers.splice(index, 1);
    },
    setCountries: (state, data) => {
      state.countries = data;
    }

  },
  actions: {
    deGetAllCountries: ({commit}) => {
      let url = 'https://restcountries.eu/rest/v2/all',
        mode = 'cors',
        method = 'GET',
        headers = new Headers(),
        options = null;

        headers.append('Accept', 'application/json');

        options = {
          mode,
          method,
          headers
        };
        
      fetch(url, options)
        .then(response => response.json())
        .then(countries => {
          commit('setCountries', countries)
        });
    }
  }
})
