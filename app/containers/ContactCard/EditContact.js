import React from 'react';
import { Field, reduxForm } from 'redux-form/immutable';
import { Button } from 'react-bootstrap';

class ContactForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" component="input" type="email" />
        </div>
        <Button type="submit">Submit</Button>
        <Button onClick={this.props.onCancelClick}>Cancel</Button>
      </form>
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
