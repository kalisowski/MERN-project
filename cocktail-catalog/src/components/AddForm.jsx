import React, { useState } from 'react';
import { useFormik } from 'formik';

function AddForm() {
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');

  const formik = useFormik({
    initialValues: {
      name: '',
      glass: '',
      category: '',
      image: '',
      ingredients: [],
      instructions: [],
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
      setSelectedFile(file);
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!previewSource) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    console.log(previewSource);
  };

  return (
    <div className="card w-96 bg-primary shadow-xl">
      <div className="card-body flex">
        <h1 className="text-3xl">Upload new cocktail</h1>
        <form onSubmit={formik.handleSubmit} encType="mutlipart/form-data">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-xl">Cocktail Name</span>
            </label>
            <label className="input-group">
              <span>Name</span>
              <input
                className="input w-full max-w-xs"
                type="text"
                name="name"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </label>
          </div>
          <div className="form-control">
            <label className="label">
              <span>Cocktail Glass</span>
            </label>
            <label className="input-group">
              <span>Glass</span>
              <input
                className="input w-full max-w-xs"
                type="text"
                name="glass"
                onChange={formik.handleChange}
                value={formik.values.glass}
              />
            </label>
          </div>
          <div>
            <label className="label">Cocktail Category</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
          </div>
          <div>
            <label className="label">Cocktail Ingredients</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="ingredients"
              onChange={formik.handleChange}
              value={formik.values.ingredients}
            />
          </div>
          <div>
            <label>Cocktail Instructions</label>
            <input
              className="input input-bordered w-full max-w-xs"
              type="text"
              name="instructions"
              onChange={formik.handleChange}
              value={formik.values.instructions}
            />
          </div>
          <div>
            <label className="label">Cocktail Image</label>
            <input
              className="file-input file-input-bordered w-full max-w-xs"
              type="file"
              name="image"
              onChange={(e) => {
                formik.setFieldValue('image', e.currentTarget.files[0]);
              }}
              accept="image/*"
            />
          </div>
          <div className="mt-5">
            <button className="btn w-full max-w-xs" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
      )} */}
    </div>
  );
}

export default AddForm;
