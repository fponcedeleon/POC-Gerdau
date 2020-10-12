import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import { useForm, useField, splitFormProps } from "react-form";
import { createNewMachine } from "../service/machine.js";


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
    );
  }

export default MyForm;