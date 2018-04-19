import VizceralVue from './VizceralVue';

VizceralVue.install = function install(Vue) {
  Vue.component(VizceralVue.name, VizceralVue);
};

export default VizceralVue;