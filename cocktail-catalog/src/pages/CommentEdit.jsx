import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

function CommentEdit() {
  const [comment, setComment] = useState({});
  const [formModified, setFormModified] = useState(false);
  const { id, cid } = useParams();
  const url = `${process.env.REACT_APP_API_COMMENTS}/${id}`;

  const getComment = () => {
    axios.get(url).then((res) => {
      const comment = res.data.find((c) => c._id === cid);
      setComment(comment);
    });
  };
  useEffect(() => {
    getComment();
    //eslint-disable-next-line
  }, []);

  const handleFormChange = (e) => {
    setFormModified(true);
    formik.handleChange(e);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      text: comment.text ? comment.text : '',
      author: comment.author ? comment.author : '',
    },
    onSubmit: async (values) => {
      if (formModified === false) {
        toast.info('No changes made');
        return;
      }
      setFormModified(false);
      setComment(values);
      try {
        const response = await axios.put(url + '/' + cid, values);
        if (response.status === 200) {
          if (response.data.msg) {
            toast.error('Cocktail with given name already exists');
            return;
          }
          toast.success('Cocktail modified successfully');
        }
      } catch (error) {
        toast.error('Error adding cocktail', error);
        console.log(error);
      }
    },
  });
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="card w-96 bg-primary shadow-xl">
        <div className="card-body flex">
          <h1 className="text-3xl">Edit comment</h1>
          <form onSubmit={formik.handleSubmit} encType="application/json">
            <div>
              <div>
                <label className="label">Author:</label>
                <input
                  className="input w-full max-w-xs"
                  type="text"
                  name="author"
                  onChange={handleFormChange}
                  value={formik.values.author}
                  required
                  maxLength="16"
                />
              </div>
              <label className="label">Text:</label>
              <input
                className="input w-full max-w-xs"
                type="text"
                name="text"
                onChange={handleFormChange}
                value={formik.values.text}
                required
                maxLength="255"
              />
            </div>
            <div className="mt-5">
              <button
                className="btn w-full max-w-xs"
                type="reset"
                onClick={() => {
                  formik.resetForm();
                }}
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
      <div className="btn btn-primary mt-5">
        <Link to={`/cocktail/${id}`}>Back to cocktail</Link>
      </div>
    </div>
  );
}

export default CommentEdit;
