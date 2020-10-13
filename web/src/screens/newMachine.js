import React from 'react';
import { useForm, useField, splitFormProps } from "react-form";
import { createNewMachine } from "../service/machine.js";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';


const validateName = (value) => {
  if (!value) {
    return "A name is required";
  }
  return false;
}

const InputField = React.forwardRef((props, ref) => {
  // Let's use splitFormProps to get form-specific props
  const [field, fieldOptions, rest] = splitFormProps(props);

  // Use the useField hook with a field and field options
  // to access field state
  const {
    meta: { error, isTouched, isValidating },
    getInputProps
  } = useField(field, fieldOptions);

  // Build the field
  return (
    <>
      <input {...getInputProps({ ref, ...rest })} />{" "}
      {isValidating ? (
        <em>Validating...</em>
      ) : isTouched && error ? (
        <em>{error}</em>
      ) : null}
    </>
  );
});

const MyForm = () => {
  // Use the useForm hook to create a form instance
  const {
    Form,
    meta: { isSubmitting, canSubmit }
  } = useForm({
    onSubmit: async (values, instance) => {
      // onSubmit (and everything else in React Form)
      // has async support out-of-the-box
      // await sendToFakeServer(values);
      await createNewMachine(values);

    },
    debugForm: false
  });

  return (
    <Container className="p-3">
      <Jumbotron>
        <h1 className="header">Welcome To React-Bootstrap</h1>
        <Form>
          <div>
            <label>
              Name: <InputField field="name" validate={validateName} />
            </label>
          </div>

          <div>
            <label>
              Last Maintenance Date: <InputField type="date" field="date" />
            </label>
          </div>

          <div>
            <button type="submit" disabled={!canSubmit}>
              Submit
          </button>
          </div>

          <div>
            <em>{isSubmitting ? "Submitting..." : null}</em>
          </div>
        </Form>
      </Jumbotron>
    </Container>
  );
}

export default MyForm;