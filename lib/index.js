// Entry point for your plugin
// This should expose your plugin's modules

import SettingsDashboard from './components/SettingsDashboard';

let _DecoratedDashboard = SettingsDashboard;

/* START EXPORTS */

export const metadata = {
  name: '@bpanel/settings',
  pathName: 'settings',
  displayName: 'Settings',
  author: 'bpanel-devs',
  description:
    'A settings panel for bPanel. Uses widget areas to allow other plugins to hook in and add their own settings pane.',
  version: require('../package.json').version,
  nav: true,
  icon: 'cogs',
};

// special plugin decorator to allow other plugins to decorate this plugin
// the component is cached so that it is available for the main decorator below
// (`decoratePanel`) and cached component passed to pluginDecorator
export const decorator = (pluginDecorator, { React, PropTypes }) => {
  _DecoratedDashboard = pluginDecorator(_DecoratedDashboard, {
    React,
    PropTypes,
  });
};

// a decorator for the Panel container component in our app
// here we're extending the Panel's children by adding
// our plugin's component (`MyComponent` below)
// You'll want to make sure to import an actual component
// This is what you need if you're making a new view/route
export const decoratePanel = (Panel, { React, PropTypes }) => {
  return class extends React.PureComponent {
    static displayName() {
      return 'bPanel Dashboard';
    }

    static get propTypes() {
      return {
        customChildren: PropTypes.array,
      };
    }

    render() {
      const { customChildren = [] } = this.props;
      const routeData = {
        metadata,
        Component: _DecoratedDashboard,
      };
      return (
        <Panel
          {...this.props}
          customChildren={customChildren.concat(routeData)}
        />
      );
    }
  };
};
/* END EXPORTS */
