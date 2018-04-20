<template>
  <div id="app">
    <button @click="setHomeView">Home</button>
    <VizceralVue :traffic="trafficSample"
                 :view="currentView"
                 :allow-dragging-of-nodes="true"
                 @viewChanged="setView" />
  </div>
</template>

<script>
  import VizceralVue from './components/VizceralVue/VizceralVue';

  const trafficSample = require('./mocks/sample.json');
  const trafficSampleSimple = require('./mocks/sample-simple.json');

  export default {
    name: 'App',
    components: {
      VizceralVue,
    },
    data() {
      return {
        trafficSample,
        trafficSampleSimple,
        currentView: [],
      };
    },
    methods: {
      setHomeView() {
        this.currentView = [];
      },
      setView(value) {
        this.currentView = value;
      },
    },
  };
</script>

<style>
  html,
  body,
  #app {
    padding: 0;
    margin: 0;
    height: 100%;
    overflow: hidden;
  }
</style>