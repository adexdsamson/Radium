import React, {
  Component
} from "react";
import {
  connect
} from "react-redux";
import PropTypes from "prop-types";
import {
  APP_LOGIN
} from './route';



export default function (ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (this.props.authenticated === null) {
        this.props.history.push(APP_LOGIN);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.props.history.push(APP_LOGIN);
      }
    }

    render() {
      if (this.props.authenticated) {
        return <ComposedComponent {
          ...this.props
        }
        />;
      }
      return null;
    }
  }

  function mapStateToProps(state) {
    return {
      authenticated: state.auth
    };
  }

  return connect(mapStateToProps)(Authentication);
}
