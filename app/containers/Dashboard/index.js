import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ContactCard from '../ContactCard';
import { requestContactData } from './actions';
import styles from './styles.css';

class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    // When the component is loading, we request the contacts from the server
    this.props.requestContactData();
  }

  render() {
    // Determine which contacts are due or overdue today
    const NOW = new Date();
    const contactsDueToday = this.props.contacts.filter((contact) => contact.get('contactNext').isBefore(NOW)); // esline-disable react/prop-types

    return (
      <div>
        <div className={styles.dashboardHeader}>
          Filter menu goes here?
        </div>
        {
          contactsDueToday.map((contact, i) => (
            <ContactCard key={i} contact={contact} />
          ))
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  requestContactData: React.PropTypes.func,
  contacts: React.PropTypes.object,
};

function mapStateToProps(state) {
  const contacts = state.get('contacts');
  return { contacts };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ requestContactData }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
