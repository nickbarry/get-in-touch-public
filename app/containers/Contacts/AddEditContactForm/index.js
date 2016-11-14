import React from 'react';
import { Field, reduxForm } from '../../../../node_modules/redux-form/immutable';
import { Button, Glyphicon } from 'react-bootstrap';
import styles from './styles.css';
import formStyles from '../../../assets/formStyles.css';
import { contactValidation, contactWarning, normalizePhone } from '../../../utils/validation';
import moment from 'moment';

const fields = {
  name: 'name',
  email: 'email',
  phone: 'phone',
  lastContacted: 'lastContacted',
  contactFrequency: 'contactFrequency',
  notes: 'notes',
};
const fieldNames = Object.keys(fields);

const validate = (values) => (
  fieldNames.reduce((errors, label) => {
    if (values[label] && contactValidation[label]) {
      errors[label] = contactValidation[label](values[label]); // eslint-disable-line no-param-reassign
    }
    return errors;
  }, {})
);

const warn = (values) => (
  fieldNames.reduce((warnings, label) => {
    if (values[label] && contactWarning[label]) {
      warnings[label] = contactWarning[label](values[label]); // eslint-disable-line no-param-reassign
    }
    return warnings;
  }, {})
);

const renderField = ({ input, name, label, labelColumns, rightInputButton, type, meta: { touched, error, warning } }) => { // eslint-disable-line react/prop-types
  const inputOrTextarea = type === 'textarea' ?
    <textarea
      name={name}
      className={`form-control${(touched && error) ? ` ${formStyles.formFieldError}` : ''}`}
      {...input}
      placeholder={label}
      cols="30"
      rows="10"
    /> :
    <input
      name={name}
      className={`form-control${(touched && error) ? ` ${formStyles.formFieldError}` : ''}`}
      {...input}
      placeholder={(name === 'phone') ? '(___) ___-____' : label}
      type={type}
    />;

  const errorOrWarningMessage = touched &&
    ((error && <div className={formStyles.formErrorMessage}>{error}</div>) ||
    (warning && <div className={formStyles.formWarningMessage}>{warning}</div>));

  const inputWithButton = rightInputButton ?
    <div className="input-group">
      {inputOrTextarea}
      <span className="input-group-btn">
        <button className="btn btn-default" type="button" onClick={() => rightInputButton.onClick()}>
          {rightInputButton.label}
        </button>
      </span>
    </div> :
    null; // If there's no options object, assume no button with the input

  return (
    <div className="form-group">
      <label htmlFor={name} className={`col-sm-${labelColumns || 3} control-label`}>{label}</label>
      <div className={`col-sm-${(12 - labelColumns) || 9}`}>
        {inputWithButton || inputOrTextarea}
        {errorOrWarningMessage}
      </div>
    </div>
  );
};

class AddEditContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  markLastContactedAsToday() {
    this.props.change('lastContacted', moment().format('YYYY-MM-DD'));
  }

  render() {
    const { handleSubmit, onCancelClick, appStatus, contact } = this.props;

    // This determines the state of any requests made based on submitting this form.
    // These variables are used to update the UI of the form.
    // This is an unwieldy way of updating the form; it would be better to use the Submitting
    // property of redux-form.
    const contactAppStatus = !!appStatus.get('contacts') && contact &&
      appStatus.get('contacts').get(contact.get('id'));
    const pendingUpdate = !!contactAppStatus && (contactAppStatus.get('updatingStatus') === true);

    // If there is an update error, we'll want to display it in the form.
    const updateError = !!contactAppStatus &&
      (typeof contactAppStatus.get('updatingStatus') === 'string') &&
      contactAppStatus.get('updatingStatus');

    const markLastContactedTodayButton = {
      label: 'Today',
      onClick: () => this.markLastContactedAsToday(),
    };

    return (
      <form onSubmit={handleSubmit} className="form-horizontal">
        <Field name={fields.name} label="Name" type="text" component={renderField} />
        <Field name={fields.email} label="Email" type="email" component={renderField} />
        <Field normalize={normalizePhone} name={fields.phone} label="Phone" type="text" component={renderField} />
        <Field name={fields.lastContacted} label="Last Contacted" type="date" component={renderField} rightInputButton={markLastContactedTodayButton} />
        <Field name={fields.contactFrequency} label="Contact Frequency" type="text" component={renderField} />
        <Field name={fields.notes} label="Notes" component={renderField} type="textarea" />
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
              onClick={onCancelClick}
              bsStyle="danger"
              disabled={pendingUpdate}
              className={`pull-right ${styles.editCancelButton}`}
            >
              <Glyphicon glyph="remove" /> Cancel
            </Button>
          </div>
        </div>
      </form>
    );
  }
}

AddEditContactForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  onCancelClick: React.PropTypes.func.isRequired,
  appStatus: React.PropTypes.object.isRequired,
  contact: React.PropTypes.object,
  change: React.PropTypes.func.isRequired,
};

export default reduxForm({
  validate,
  warn,
})(AddEditContactForm);
