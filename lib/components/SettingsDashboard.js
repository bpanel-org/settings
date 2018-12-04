import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Header, Text, Link, TabMenu } from '@bpanel/bpanel-ui';

export default class SettingsDashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static get propTypes() {
    return {
      settingsTabs: PropTypes.arrayOf(
        PropTypes.shape({
          header: PropTypes.string,
          body: PropTypes.function,
        })
      ),
    };
  }

  static get defaultProps() {
    return {
      settingsTabs: [],
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ hasError: true });
    // eslint-disable-next-line no-console
    throw new Error(
      `Plugins decorating ${
        this.displayName
      } has been disabled because of a plugin crash.`,
      error,
      errorInfo
    );
  }

  render() {
    const { settingsTabs = [] } = this.props;
    if (this.state.hasError)
      return <Text type="p">There was a widget error</Text>;
    const hasWidgets = settingsTabs.length;
    return (
      <div className="dashboard-container container">
        <Header type="h2">Settings Dashboard</Header>
        <Text type="p">
          Update your bPanel&apos;s plugin settings here. If you are a plugin
          developer and would like to allow users to update setting for your
          plugin in this view, see the docs on{' '}
          <Link to="https://bpanel.org/docs/api-decorate-plugins.html#decorateplugin">
            decorating plugins
          </Link>
          .
        </Text>
        {!hasWidgets ? (
          <Text type="p">
            No settings to display. When you have installed plugins that have
            customizable settings, they will be shown here.
          </Text>
        ) : (
          <div>
            <Header type="h4">bPanel Settings</Header>
            <TabMenu tabs={settingsTabs} />
          </div>
        )}
      </div>
    );
  }
}
