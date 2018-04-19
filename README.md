# vizceral-vue

Vizceral Vue Implementation ispired by [`vizceral-react`](https://github.com/Netflix/vizceral-react)

## Setup

Install package:

```
npm install vizceral-vue --save
```

Import component and start using it:

```
import VizceralVue from 'vizceral-vue';
Vue.use(VizceralVue);
```

Example of usage:

```js
import Vizceral from 'vizceral-vue';

<vizceral-vue
  :traffic="trafficData"
  :view="this.currentView"
  :showLabels="this.displayOptions.showLabels"
  :physicsOptions="this.physicsOptions"
  :filters="this.filters"
  :matchesFound="this.matchesFound"
  :match="this.searchTerm"
  :modes="this.modes"
  :definitions="this.definitions"
  :styles="this.styles"
/>
```

## Props

#### allowDraggingOfNodes

```js
// Default: false
allowDraggingOfNodes: Boolean
```

Nodes can be repositioned through dragging if and only if this is true.

#### definitions

```js
// Default: ""
definitions: Object
```

Object map of definitions. Refer to [github.com/Netflix/Vizceral/wiki/Configuration#definitions-for-data-to-display](https://github.com/Netflix/Vizceral/wiki/Configuration#definitions-for-data-to-display)

#### filters

```js
// Default: []
filters: Array
```

Array of filter definitions and current values to filter out nodes and connections. Refer to
[github.com/Netflix/Vizceral/wiki/Configuration#filters](https://github.com/Netflix/Vizceral/wiki/Configuration#filters)

#### match

```js
// Default: ''
match: String
```

A search string to highlight nodes that match

#### matchesFound

```js
// Default: () => ""
matchesFound: Function
```

Callback when nodes match the match string. The matches object " total, visible " is the only property.

#### modes

```js
modes: Object
```

Map of modes to mode type, e.g. " detailedNode: 'volume' "

#### showLabels

```js
// Default: true
showLabels: Boolean
```

Whether or not to show labels on the nodes.

#### styles

```js
// Default: ""
styles: Object
```

Styles to override default properties.

#### targetFramerate

```js
// Default: null
targetFramerate: Number
```

Target framerate for rendering engine

#### traffic

```js
// Default: ""
traffic: Object
```

The traffic data. See [github.com/Netflix/Vizceral/wiki/How-to-Use#graph-data-format](https://github.com/Netflix/Vizceral/wiki/How-to-Use#graph-data-format) for specification.

#### view

```js
// Default: []
view: 
```
