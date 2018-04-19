import { reduce, merge } from 'lodash';
import Vizceral from 'vizceral';
import { getPerformanceNow } from '../../utility';

export default {
  name: 'VizceralVue',
  props: {
    /*
    Object map of definitions.
    */
    definitions: {
      type: Object,
    },
    /*
    Array of filter definitions and current values to filter out nodes and connections.
    */
    filters: {
      type: Array,
    },
    /*
    A search string to highlight nodes that match
    */
    match: {
      type: String,
    },
    /*
    Map of modes to mode type, e.g. { detailedNode: 'volume' }
    */
    modes: {
      type: Object,
    },
    /*
    Pass in an object to highlight
    */
    objectToHighlight: {
      type: Object,
    },
    /*
    Whether or not to show labels on the nodes.
    */
    showLabels: {
      type: Boolean,
    },
    /*
    Nodes can be repositioned through dragging if and only if this is true.
    */
    allowDraggingOfNodes: {
      type: Boolean,
    },
    /*
    Styles to override default properties.
    */
    styles: {
      type: Object,
    },
    /*
    The traffic data.
    */
    traffic: {
      type: Object,
    },
    /*
    Target framerate for rendering engine.
    */
    targetFramerate: {
      type: Number,
    },
  },
  data() {
    return {
      vizceral: null,
      options: null,
      defaults: {
        definitions: {},
        filters: [],
        match: '',
        objectToHighlight: null,
        showLabels: true,
        allowDraggingOfNodes: false,
        styles: {},
        traffic: {},
        view: [],
        targetFramerate: null,
      },
    };
  },
  methods: {
    connectionHighlighted(payload) {
      this.$emit('connectionHighlighted', payload);
    },
    nodeHighlighted(payload) {
      this.$emit('nodeHighlighted', payload);
    },
    nodeUpdated(payload) {
      this.$emit('nodeUpdated', payload);
    },
    nodeContextSizeChanged(payload) {
      this.$emit('nodeContextSizeChanged', payload);
    },
    matchesFound(payload) {
      this.$emit('matchesFound', payload);
    },
    objectHighlighted(payload) {
      this.$emit('objectHighlighted', payload);
    },
    objectHovered(payload) {
      this.$emit('objectHovered', payload);
    },
    updateStyles(styles) {
      const styleNames = this.vizceral.getStyles();
      const customStyles = reduce(styleNames, (result, styleName) => {
        result[styleName] = styles[styleName] || result[styleName];
        return result;
      }, {});

      this.vizceral.updateStyles(customStyles);
    },
    viewChanged(payload) {
      this.$emit('viewChanged', payload);
    },
    viewUpdated() {
      this.$emit('viewUpdated');
    },
  },
  render(createElement) {
    return createElement(
      'div',
      {
        staticClass: 'vizceral',
        staticStyle: {
          display: 'block',
          boxSizing: 'border-box',
          width: '100%',
          height: '100%',
        },
      },
      [
        createElement('canvas', {
          ref: 'canvas',
          staticClass: 'vizceral-canvas',
          staticStyle: {
            width: '100%',
            height: '100%',
          },
        }),
        createElement('div', {
          staticClass: 'vizceral-notice',
        }),
      ],
    );
  },
  beforeMount() {
    this.options = merge({}, this.defaults, this.$props);
  },
  mounted() {
    this.vizceral = new Vizceral(this.$refs.canvas, this.targetFramerate);
    this.updateStyles(this.options.styles);

    this.vizceral.on('connectionHighlighted', this.connectionHighlighted);
    this.vizceral.on('nodeHighlighted', this.nodeHighlighted);
    this.vizceral.on('nodeUpdated', this.nodeUpdated);
    this.vizceral.on('nodeContextSizeChanged', this.nodeContextSizeChanged);
    this.vizceral.on('matchesFound', this.matchesFound);
    this.vizceral.on('objectHighlighted', this.objectHighlighted);
    this.vizceral.on('objectHovered', this.objectHovered);
    this.vizceral.on('viewChanged', this.viewChanged);
    this.vizceral.on('viewUpdated', this.viewUpdated);

    this.$nextTick(() => {
      this.vizceral.setView(this.options.view, this.objectToHighlight);
      this.vizceral.updateData(this.traffic);

      const performanceNow = getPerformanceNow();
      this.vizceral.animate(performanceNow === null ? 0 : performanceNow);

      this.vizceral.updateBoundingRectCache();
    });
  },
  beforeDestroy() {
    delete this.vizceral;
  },
};
