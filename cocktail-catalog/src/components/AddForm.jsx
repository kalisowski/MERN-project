import React, { useState } from 'react';

function AddForm() {
  const [fileInputState, setFileInputState] = useState('');
  const [selectedFile, setSelectedFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [cocktailName, setCocktailName] = useState('');
  const [cocktailDescription, setCocktailDescription] = useState('');
  const [cocktailIngredients, setCocktailIngredients] = useState('');
  const [image, setImage] = useState('');
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
    <div>
      <h1>Upload</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="image"
          accept="image/*"
          className="file-input file-input-bordered w-full max-w-xs"
          onChange={handleFileInputChange}
          value={fileInputState}
        />
        <button className="btn" type="submit">
          Submit
        </button>
      </form>
      {previewSource && (
        <img src={previewSource} alt="chosen" style={{ height: '300px' }} />
      )}
    </div>
  );
}

export default AddForm;
