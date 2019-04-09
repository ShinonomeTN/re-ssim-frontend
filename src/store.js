import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    appTitle: "",
    appBarMeta: {},

    courseTermList: [],

    calendar: {}
  },

  mutations: {
    updateSchoolTerms(state, terms) {
      state.courseTermList = terms;
    },

    changeAppTitle(state, newTitle) {
      state.appTitle = newTitle;
    },

    pushNewCalendar(state, newCalendar) {
      state.calendar = newCalendar;
    },

    pushAppBarMeta(state, newMeta) {
      state.appBarMeta = newMeta;
    }
  }
});

export default store;
