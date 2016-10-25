import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button, Glyphicon } from 'react-bootstrap';
import styles from './styles.css';

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit, appStatus, contact } = this.props;
    const contactAppStatus = !!appStatus.get('contacts') &&
      appStatus.get('contacts').get(contact.get('id'));
    const pendingUpdate = !!contactAppStatus && (contactAppStatus.get('updatingStatus') === true);
    const updateError = !!contactAppStatus &&
      (typeof contactAppStatus.get('updatingStatus') === 'string') &&
      contactAppStatus.get('updatingStatus');

    return (
      <div className="col-sm-10">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className={`col-sm-3 ${styles.formFieldLabel}`}>
              <label htmlFor="name">Name:</label>
            </div>
            <div className={`col-sm-9 ${styles.formField}`}>
              <Field name="name" component="input" type="text" />
            </div>
          </div>
          <div className="row">
            <div className={`col-sm-3 ${styles.formFieldLabel}`}>
              <label htmlFor="email">Email:</label>
            </div>
            <div className={`col-sm-9 ${styles.formField}`}>
              <Field name="email" component="input" type="email" />
            </div>
          </div>
          <div className="row">
            <div className={`col-sm-3 ${styles.formFieldLabel}`}>
              <label htmlFor="phone">Phone:</label>
            </div>
            <div className={`col-sm-9 ${styles.formField}`}>
              <Field name="phone" component="input" type="tel" />
            </div>
          </div>
          <div className="row">
            <div className={`col-sm-3 ${styles.formFieldLabel}`}>
              <label htmlFor="lastContacted">Last Contacted:</label>
            </div>
            <div className={`col-sm-9 ${styles.formField}`}>
              <Field name="lastContacted" component="input" type="date" />
            </div>
          </div>
          <div className="row">
            <div className={`col-sm-3 ${styles.formFieldLabel}`}>
              <label htmlFor="contactFrequency">Contact frequency:</label>
            </div>
            <div className={`col-sm-9 ${styles.formField}`}>
              <Field name="contactFrequency" component="input" type="number" />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-9 col-sm-offset-3">
              <span className={styles.formErrorMessage}>
                {updateError && 'Error: Couldn\'t update contact. Try again in a few seconds.'}
              </span>
            </div>
          </div>
          <div className={`row ${styles.formControls}`}>
            <div className="col-sm-9 col-sm-offset-3">
              <Button
                type="submit"
                bsStyle="primary"
                disabled={pendingUpdate}
                className={styles.editSubmitButton}
              >
                <Glyphicon glyph="ok" /> Submit
              </Button>
              <Button
                onClick={this.props.onCancelClick}
                bsStyle="danger"
                disabled={pendingUpdate}
                className={`pull-right ${styles.editCancelButton}`}
              >
                <Glyphicon glyph="remove" /> Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

ContactForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancelClick: React.PropTypes.func.isRequired,
  appStatus: React.PropTypes.object,
  contact: React.PropTypes.object,
};

export default reduxForm({
  fields: ['name', 'email'], // todo: Is this property actually necessary for any reason?
})(ContactForm);
