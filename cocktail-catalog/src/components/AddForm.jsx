import React, { useRef } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

function AddForm() {
  const inputRef = useRef();
  const formik = useFormik({
    initialValues: {
      name: '',
      glass: '',
      category: '',
      image: '',
      ingredients: [''],
      instructions: [''],
    },
    onSubmit: async (values) => {
      const url = process.env.REACT_APP_API_COCKTAILS;
      const formData = new FormData();
      for (let value in values) {
        if (value === 'ingredients') {
          values[value].forEach((ingredient) => {
            formData.append(value, ingredient);
          });
        } else if (value === 'instructions') {
          values[value].forEach((instruction) => {
            formData.append(value, instruction);
          });
        } else formData.append(value, values[value]);
      }
      try {
        const response = await axios.post(url, formData);
        if (response.status === 201)
          toast.success('Cocktail added successfully');
        else {
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 409)
          toast.error('Cocktail with that name already exists');
        else toast.error('Error adding cocktail');
      }
    },
  });

  const addIngredient = () => {
    formik.setFieldValue('ingredients', [...formik.values.ingredients, '']);
  };

  const addInstruction = () => {
    formik.setFieldValue('instructions', [...formik.values.instructions, '']);
  };

  const deleteIngredient = (index) => {
    const values = [...formik.values.ingredients];
    values.splice(index, 1);
    formik.setFieldValue('ingredients', values);
  };

  const deleteInstruction = (index) => {
    const values = [...formik.values.instructions];
    values.splice(index, 1);
    formik.setFieldValue('instructions', values);
  };

  const handleIngredientChange = (index, e) => {
    const values = [...formik.values.ingredients];
    values[index] = e.target.value;
    formik.setFieldValue('ingredients', values);
  };

  const handleInstructionChange = (index, e) => {
    const values = [...formik.values.instructions];
    values[index] = e.target.value;
    formik.setFieldValue('instructions', values);
  };

  return (
    <div className="card w-96 bg-primary shadow-xl">
      <div className="card-body flex">
        <h1 className="text-3xl">Upload new cocktail</h1>
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
              ref={inputRef}
            />
          </div>
          <div>
            <label className="label">Cocktail Glass</label>
            <input
              className="input w-full max-w-xs"
              type="text"
              name="glass"
              onChange={formik.handleChange}
              value={formik.values.glass}
              required
            />
          </div>
          <div>
            <label className="label">Cocktail Category</label>
            <input
              className="input input w-full max-w-xs"
              type="text"
              name="category"
              onChange={formik.handleChange}
              value={formik.values.category}
              required
            />
          </div>
          <div>
            <label className="label">
              Cocktail Ingredients
              <span className="btn flex-none" onClick={addIngredient}>
                add
              </span>
            </label>

            {formik.values.ingredients.map((ingredient, index) => (
              <label className="input-group mt-1" key={index}>
                <span>{index + 1}</span>
                <input
                  className="input input w-full"
                  type="text"
                  name="ingredients"
                  onChange={(e) => handleIngredientChange(index, e)}
                  value={ingredient}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteIngredient(index)}
                  >
                    x
                  </button>
                )}
              </label>
            ))}
          </div>
          <div>
            <label className="label">
              Cocktail Instructions
              <span className="btn" onClick={addInstruction}>
                add
              </span>
            </label>
            {formik.values.instructions.map((instruction, index) => (
              <label className="input-group mt-1" key={index}>
                <span>{index + 1}</span>
                <input
                  className="input input w-full"
                  type="text"
                  name="instructions"
                  onChange={(e) => handleInstructionChange(index, e)}
                  value={instruction}
                  required
                />
                {index > 0 && (
                  <button
                    type="button"
                    className="btn"
                    onClick={() => deleteInstruction(index)}
                  >
                    x
                  </button>
                )}
              </label>
            ))}
          </div>
          <div>
            <label className="label">Cocktail Image</label>
            <input
              className="file-input file-input w-full max-w-xs"
              type="file"
              name="image"
              onChange={(e) => {
                formik.setFieldValue('image', e.currentTarget.files[0]);
              }}
              accept="image/*"
              required
            />
          </div>
          <div className="mt-5">
            <button
              className="btn w-full max-w-xs"
              type="reset"
              onClick={() => {
                formik.resetForm();
                inputRef.current.focus();
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
  );
}

export default AddForm;
