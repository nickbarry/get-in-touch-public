/*
 *
 * AddContactButton
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

export class AddContactButton extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = { showModal: false };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close(){
    console.log("close modal")
    this.setState({ showModal: false });
  }
  open(){
    console.log("open modal")
   this.setState({ showModal: true }); 
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
          
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddContactButton);
