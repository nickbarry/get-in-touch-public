import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

export class SignIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className={styles.signIn}>
      </div>
    );
  }
}

function mapStateToProps(state) {
    return { state: state };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
