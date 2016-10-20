/*
 *
 * AddContactButton
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { Button, Modal } from 'react-bootstrap';
import AddContactForm from './AddContactForm';

export class AddContactButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  addFormSumbit(e) {
    return e;
  }
  render() {
    return (
      <div className={styles.addContactButton}>
        <Button
          bsStyle="primary"
          bsSize="large"
          onClick={this.open}
        >
        Add Contact
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <AddContactForm onSubmit={this.addFormSumbit} />
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactButton);
