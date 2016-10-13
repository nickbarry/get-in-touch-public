import React from 'react';
import styles from './styles.css';

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <ul className={styles.navbar}>
          <li><a href="/">Home</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/contacts">Contacts</a></li>
        </ul>
      </div>
    );
  }
}
