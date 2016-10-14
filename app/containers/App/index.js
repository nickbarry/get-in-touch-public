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
import styles from './styles.css';
import Navbar from '../../components/NavBar';
import SideBar from '../../components/SideBar';
import Dashboard from '../Dashboard';

export default class App extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };
  render() {
    const mainContentStyle = {
      'margin-left': '10%'
    }
    return (
      <div className={styles.container}>
        <Navbar />
        <SideBar />
        <div style={mainContentStyle}>
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}
