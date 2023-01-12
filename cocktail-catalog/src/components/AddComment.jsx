import React from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddComment({ id, setComments }) {
  const url = `${process.env.REACT_APP_API_COMMENTS}${id}`;
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: '',
      author: '',
    },
    onSubmit: async (values) => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(url, values);
        if (response.status === 200) {
          if (response.data.msg) {
            toast.error('Something went wrong');
            return;
          }
          toast.success('Cocktail created successfully');
          setComments(response.data);
        }
      } catch (error) {
        if (error.response.status === 429) {
          toast.error('You are posting too quickly. Please try again later.');
        } else {
          toast.error('Error adding cocktail');
        }
      }
      formik.resetForm();
    },
  });

  return (
    <div className="card bg-base-300 p-5">
      <form className="flex flex-row" onSubmit={formik.handleSubmit}>
        <div className="flex flex-col items-center">
          <label className="label">Author:</label>
          <input
            className="input w-full max-w-xs align-middle"
            type="text"
            name="author"
            onChange={formik.handleChange}
            value={formik.values.author}
            required
          />
        </div>
        <div className="flex flex-col items-center ml-3">
          <label className="label">Text:</label>
          <input
            className="input w-full max-w-xs"
            type="text"
            name="text"
            onChange={formik.handleChange}
            value={formik.values.text}
            required
          />
        </div>
        <div className="flex items-center ml-3 mt-10">
          <button className="btn w-full max-w-xs" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddComment;
