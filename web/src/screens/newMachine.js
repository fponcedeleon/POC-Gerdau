import React from 'react';
import { useForm, useField, splitFormProps } from "react-form";
import { createNewMachine } from "../service/machine.js";
import Jumbotron from 'react-bootstrap/Jumbotron';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


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
      createNewMachine(values)
        .then(() => {
          alert('Created successfully');
        })
        .catch(err => {
          alert(err);
        })

    },
    debugForm: false
  });

  return (
    <Container fluid>
      <Row className="justify-content-md-center">
        <Col xs={{span: 4}} >
          <h4>Please fill in the following information</h4>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col xs={{ span: 4 }}>
          <Form>
            <div>
              <label>
                Name: <InputField field="nombre" validate={validateName} />
              </label>
            </div>

            <div>
              <label>
                Last Maintenance Date: <InputField type="date" field="ultimoMantenimiento" />
              </label>
            </div>

            <div>
              <label>
                Installed? <InputField type="checkbox" field="instalada" />
              </label>
            </div>

            <div style={{textAlign: 'center'}}>
              <Button type="submit" disabled={!canSubmit}>
                Submit
              </Button>
            </div>

            <div>
              <em>{isSubmitting ? "Submitting..." : null}</em>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default MyForm;