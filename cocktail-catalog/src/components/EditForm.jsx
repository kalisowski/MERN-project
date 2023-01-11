import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';

function EditForm(id) {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);
  const url = process.env.REACT_APP_API_COCKTAILS + 'cocktail/' + id.id;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setCocktail(data);
        setLoading(false);
      });
  }, [url]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: cocktail ? cocktail.name : '',
      glass: cocktail ? cocktail.glass : '',
      category: cocktail ? cocktail.category : '',
      image: cocktail ? cocktail.image : '',
      ingredients: cocktail ? cocktail.ingredients : [''],
      instructions: cocktail ? cocktail.instructions : [''],
    },
    onSubmit: async (values) => {
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
        const response = await axios.put(url, formData);
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

  const addIngredient = () => {
    formik.setFieldValue('ingredients', [...formik.values.ingredients, '']);
  };

  const addInstruction = () => {
    formik.setFieldValue('instructions', [...formik.values.instructions, '']);
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
        <h1 className="text-3xl">Edit cocktail</h1>
        {!loading && (
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
        )}
      </div>
    </div>
  );
}

export default EditForm;
