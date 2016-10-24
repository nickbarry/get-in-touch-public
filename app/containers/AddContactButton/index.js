import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles.css';
import { Button, Modal } from 'react-bootstrap';
import AddContactForm from './AddContactForm';
import { requestAddContact } from './actions';

const modalStyle = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
  },
  content: {
    position: 'absolute',
    top: '40px',
    left: '40px',
    right: '40px',
    bottom: '40px',
    border: '1px solid #ccc',
    background: '#4286f4',
    overflow: 'auto',
    WebkitOverflowScrolling: 'touch',
    borderRadius: '0px',
    outline: 'none',
    padding: '20px',
  }
}
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
        <Modal
          show={this.state.showModal}
          onHide={this.close}
          style={modalStyle}
        >
          <div className={styles.modalHeader}>
            <h1>Add a contact</h1>
            <h4>Fill out the form below with the new contact information</h4>
          </div>
          <div className={styles.modalContent}>
            <AddContactForm
              onSubmit={(values) => {
                this.props.requestAddContact(values);
                this.close();
              }}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { state };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestAddContact }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContactButton);
