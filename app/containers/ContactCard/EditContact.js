import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';
import styles from './styles.css';

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
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
              <Button type="submit" bsStyle="primary">Submit</Button>&nbsp;
              <Button onClick={this.props.onCancelClick} bsStyle="danger">Cancel</Button>
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
};

export default reduxForm({
  fields: ['name', 'email'],
})(ContactForm);
