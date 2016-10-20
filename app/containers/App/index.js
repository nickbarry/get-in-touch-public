/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Navbar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import { Col } from 'react-bootstrap';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };
  render() {
    return (
      <div>
        <Navbar />
        <Col sm={2} md={3}>
          <SideBar />
        </Col>
        <Col sm={10} md={9}>
          {React.Children.toArray(this.props.children)}
        </Col>
      </div>
    );
  }
}
