import React from 'react';
import { connect } from 'react-redux';
import selectContactPage from './selectors';
import styles from './styles.css';
import ContactCard from '../ContactCard';

export class ContactPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const allContacts = this.props.contacts;
    return (
      <div className={styles.contactPage}>
        <h1>This is the contact page</h1>
        {
          allContacts.map((contact, i) => (
           <a key={ i } href={ contact.get('name') }><ContactCard contact={ contact } /></a>
          ))
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const contacts = state.get('contacts');
  return {
    contacts: state.get('contacts')
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactPage);
