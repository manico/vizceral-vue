<template>
  <div id="app">
    <VizceralVue :traffic="trafficSample" />
  </div>
</template>

<script>
  import VizceralVue from './components/VizceralVue';

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
      };
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