import React from 'react';
import { connect } from 'react-redux';
import selectContactPage from './selectors';
import styles from './styles.css';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.contactPage}>
        <h1>This is the contact page</h1>
      </div>
    );
  }
}

const mapStateToProps = selectContactPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
