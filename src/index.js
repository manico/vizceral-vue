import VizceralVue from './components/VizceralVue';

export { VizceralVue };

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VizceralVue);
}
