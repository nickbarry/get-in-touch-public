import React from 'react';
import styles from './styles.css';
import { Link } from  'react-router'

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul className={styles.navbar}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/contacts">Connections</Link></li>
        </ul>
      </div>
    );
  }
}
