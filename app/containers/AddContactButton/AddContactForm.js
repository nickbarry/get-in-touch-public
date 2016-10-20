import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Button } from 'react-bootstrap';
// import { renderField } from './index'
const AddContactForm = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>First Name</label>
          <Field value="" name="firstName" component="input" type="text" />
      </div>
      <div>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  )
}

export default reduxForm({
  form: 'addContact'  // a unique identifier for this form
})(AddContactForm)
