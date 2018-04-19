import { reduce, merge } from 'lodash';
import Vizceral from 'vizceral';

export default {
  name: 'VizceralVue',
  props: {
    /*
    Callback for when a connection is highlighted. The highlighted connection is the only parameter.
    */
    connectionHighlighted: {
      type: Function,
    },
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
    Callback for when an object is highlighted. The highlighted object is the only parameter.
    `object.type` will be either 'node' or 'connection'
    */
    objectHighlighted: {
      type: Function,
    },
    /*
    Pass in an object to highlight
    */
    objectToHighlight: {
      type: Object,
    },
    /*
    Callback for when the top level node context panel size changes. The updated dimensions is the only parameter.
    */
    nodeContextSizeChanged: {
      type: Function,
    },
    /*
    Callback when nodes match the match string. The matches object { total, visible } is the only property.
    */
    matchesFound: {
      type: Function,
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
    Callback for when the view changed. The view array is the only property.
    */
    viewChanged: {
      type: Function,
    },
    /*
    Callback for when the current view is updated.
    */
    viewUpdated: {
      type: Function,
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
        connectionHighlighted: () => { },
        definitions: {},
        filters: [],
        match: '',
        nodeHighlighted: () => { },
        nodeUpdated: () => { },
        nodeContextSizeChanged: () => { },
        matchesFound: () => { },
        objectHighlighted: () => { },
        objectHovered: () => { },
        objectToHighlight: null,
        showLabels: true,
        allowDraggingOfNodes: false,
        styles: {},
        traffic: {},
        viewChanged: () => { },
        viewUpdated: () => { },
        view: [],
        targetFramerate: null,
      },
    };
  },
  methods: {
    updateStyles(styles) {
      const styleNames = this.vizceral.getStyles();
      const customStyles = reduce(styleNames, (result, styleName) => {
        result[styleName] = styles[styleName] || result[styleName];
        return result;
      }, {});

      this.vizceral.updateStyles(customStyles);
    }
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

    this.vizceral.on('viewChanged', this.options.viewChanged);
    this.vizceral.on('objectHighlighted', this.options.objectHighlighted);
    this.vizceral.on('objectHovered', this.options.objectHovered);
    this.vizceral.on('nodeUpdated', this.options.nodeUpdated);
    this.vizceral.on('nodeContextSizeChanged', this.options.nodeContextSizeChanged);
    this.vizceral.on('matchesFound', this.options.matchesFound);
    this.vizceral.on('viewUpdated', this.options.viewUpdated);

    this.$nextTick(() => {
      this.vizceral.setView(this.options.view, this.objectToHighlight);
      this.vizceral.updateData(this.traffic);
      this.vizceral.animate();
      this.vizceral.updateBoundingRectCache();
    });
  },
  beforeDestroy() {
    delete this.vizceral;
  },
};
