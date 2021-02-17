import Vue from 'vue'
import Vuex from 'vuex'
import { ArticleService } from "../services/articleService";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articles: [],
    drawer: false,
    items: [
      {
        text: 'Home',
        href: '/Home',
      },
    ],
    user:null
  },
  getters: {
    categories: (state) => {
      const categories = [];
      for (const article of state.articles) {
        if (
          !article.category ||
          categories.find(category => category.text === article.category)
        ) continue

        const text = article.category

        categories.push({
          text,
          href: '#!',
        })
      }

      return categories.sort().slice(0, 4)
    },    
    links: (state) => {
      return state.items
    },
    getUser: (state) => {
      return state.user
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
    setUser: (state, user) => (state.user = user),
    setArticles: (state, articles) => (state.articles = articles),
  },
  actions: {
    async getArticles({ commit, state }) {    
      let response = await ArticleService.GetArticles();
      if (response.success && response.data.length > 0) {
        state.articles = response.data;
      }
      return response;
    },
  },
})
