/**
*
* SideBar
*
*/

import React from 'react';
import styles from './styles.css';

class SideBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <nav className={styles.sideBar}>
          <button>Add contact</button>
        </nav>
      </div>
    );
  }
}

export default SideBar;
