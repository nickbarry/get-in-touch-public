import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
// import { renderField } from './index'
const AddContactForm = (props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <Field value="" name="firstName" component="input" type="text" />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
};

AddContactForm.propTypes = {
  handleSubmit: React.propTypes.func.isRequired,
};

export default reduxForm({
  form: 'addContact', // a unique identifier for this form
})(AddContactForm);
