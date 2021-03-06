import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Index from "../views/index.vue";

import Base from '../components/base/Base.vue'
import Search from '../components/file/Search.vue'
import Show from '../components/file/Show.vue'
import PhotoSearch from '../components/photo/photo_search.vue'
import PhotoShow from '../components/photo/photo_show.vue'
import ShowMF4 from '../components/mf4/ShowMF4.vue'
import SearchMF4 from '../components/mf4/SearchMF4.vue'
import DataAnalysis from '../components/mf4/DataAnalysis.vue'
import Root from '../components/root/root.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    redirect: '/base',
    children: [
      { path: '/base', component: Base },
      { path: '/search', component: Search },
      { path: '/show', component: Show },
      { path: '/photo_search', component: PhotoSearch },
      { path: '/photo_show', component: PhotoShow},
      { path: '/mf4_show', component: ShowMF4},
      { path: '/mf4_search', component: SearchMF4},
      { path: '/data_analysis', component: DataAnalysis},
      { path: '/root', component: Root}
    ]
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes
});

export default router;
