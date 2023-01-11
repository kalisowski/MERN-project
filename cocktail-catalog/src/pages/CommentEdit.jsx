import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';

function CommentEdit() {
  const { id, cid } = useParams();

  const getComments = () => {
    const url = `${process.env.REACT_APP_API_COMMENTS}/${id}`;
    axios.get(url).then((res) => {});
    //TODO
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      glass: '',
    },
    onSubmit: async (values) => {},
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card w-96 bg-primary shadow-xl">
        <div className="card-body flex">
          <h1 className="text-3xl">Edit comment</h1>
          <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
            <div className="form-name">
              <label className="label">Cocktail Name</label>
              <input
                className="input w-full max-w-xs"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
                required
              />
            </div>

            <div className="mt-5">
              <button
                className="btn w-full max-w-xs"
                type="reset"
                onClick={formik.resetForm}
              >
                Reset
              </button>
            </div>
            <div className="mt-5">
              <button className="btn w-full max-w-xs" type="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      <Link to={`/cocktail/${id}`}>Back to cocktail</Link>
    </div>
  );
}

export default CommentEdit;
