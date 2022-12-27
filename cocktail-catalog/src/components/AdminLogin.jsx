import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

function AdminLogin() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-5 text-primary-content ">
        Admin Page
      </h1>
      <div className="card w-96 bg-neutral text-primary-content">
        <div className="card-body">
          <Formik
            className="flex flex-col"
            initialValues={{ login: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.login) {
                errors.login = 'Required';
              }
              if (!values.password) {
                errors.password = 'Required';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex flex-col justify-center">
                <Field
                  className="input input-primary w-full max-w-xs bg-base-100 my-2"
                  type="login"
                  name="login"
                />
                <ErrorMessage
                  className="flex justify-center badge badge-primary my-2"
                  data-tip="error"
                  name="login"
                  component="div"
                />

                <Field
                  className="input input-primary w-full max-w-xs bg-base-100 my-2"
                  type="password"
                  name="password"
                  placeholder="password"
                />
                <ErrorMessage
                  className=" badge badge-primary my-2"
                  name="password"
                  component="div"
                />
                <button
                  className="btn btn-lg"
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
