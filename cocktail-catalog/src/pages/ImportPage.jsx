import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function ImportPage() {
  const navigate = useNavigate();
  const adminstate = localStorage.getItem('user');
  const fileInputRef = useRef(null);
  const singleFileInputRef = useRef(null);
  const [data, setData] = useState([]);
  const [importData, setImportData] = useState(null);
  const [singleData, setSingleData] = useState(null);
  const [fileError, setFileError] = useState(null);

  useEffect(() => {
    if (!adminstate) {
      navigate('/admin');
    }
  }, [adminstate, navigate]);

  const getCocktails = async () => {
    const res = await axios.get(process.env.REACT_APP_API_COCKTAILS);
    setData(res.data);
  };

  useEffect(() => {
    getCocktails();
  }, []);

  const handleExport = () => {
    const dataJSON = JSON.stringify(data);
    const blob = new Blob([dataJSON], { type: 'application/json' });
    saveAs(blob, 'data.json');
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file.type !== 'application/json') {
      setFileError('File format not supported. Please upload a .json file.');
      fileInputRef.current.value = null;
    } else {
      setFileError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        const { cocktails } = data;
        if (!cocktails) {
          setFileError('File missing cocktails data.');
          fileInputRef.current.value = null;
          return;
        }
        const cocktailsdata = data.cocktails.map((cocktail) => {
          let imagePath = cocktail.image;
          let newImagePath = imagePath.replace(/[^/]*$/, 'placeholder.jpg');
          return {
            ...cocktail,
            image: newImagePath,
          };
        });
        setImportData({ cocktails: cocktailsdata });
      };
      reader.readAsText(file);
    }
  };

  const handleFileSingle = (e) => {
    const file = e.target.files[0];
    if (file.type !== 'application/json') {
      setFileError('File format not supported. Please upload a .json file.');
      singleFileInputRef.current.value = null;
    } else {
      setFileError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        if (data.cocktails.length > 1) {
          setFileError('Please upload a single cocktail.');
          singleFileInputRef.current.value = null;
          return;
        }
        const cocktailsdata = data.cocktails.map((cocktail) => {
          let imagePath = cocktail.image;
          let path = imagePath.split('/');
          path[path.length - 2] = 'placeholder';
          path[path.length - 1] = 'placeholder.jpg';
          let newImagePath = path.join('/');
          return {
            _id: cocktail._id,
            name: cocktail.name,
            ingredients: cocktail.ingredients,
            instructions: cocktail.instructions,
            image: newImagePath,
            category: cocktail.category,
            glass: cocktail.glass,
          };
        });
        setSingleData(cocktailsdata);
      };

      reader.readAsText(file);
    }
    singleFileInputRef.current.value = null;
  };

  const handleImport = async () => {
    if (!importData) {
      setFileError('Please select a file to import.');
      fileInputRef.current.value = null;
      return;
    }
    await axios.delete(process.env.REACT_APP_API_COCKTAILS + 'import');
    const res = await axios.post(
      process.env.REACT_APP_API_COCKTAILS + '/import',
      importData.cocktails
    );
    if (res.status === 200) {
      if (res.data.msg) {
        toast.warning(res.data.msg);
      } else {
        toast.success('Data imported successfully');
      }
      getCocktails();
    }
    fileInputRef.current.value = null;
    setImportData(null);
  };

  const handleImportSingle = async () => {
    if (!singleData) {
      setFileError('Please select a file to import.');
      fileInputRef.current.value = null;
      return;
    }
    const res = await axios.post(
      process.env.REACT_APP_API_COCKTAILS + 'import-single',
      singleData
    );
    console.log(res);
    if (res.status === 200) {
      if (res.data.msg) {
        toast.warning(res.data.msg);
      } else {
        toast.success('Data imported successfully');
      }
      getCocktails();
    } else {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col flex-wrap items-center justify-center h-screen">
      <div className="flex flex-col jusify-center items-center">
        <div className="flex">
          <div>
            <label className="label">Import data</label>
            <input
              ref={singleFileInputRef}
              className="file-input file-input input-primary w-full max-w-xs"
              type="file"
              name="file"
              id="file"
              onChange={(e) => {
                handleFile(e);
              }}
            />
          </div>
          <button
            type="button"
            className="btn ml-2 mt-10"
            onClick={handleImport}
          >
            Import
          </button>
        </div>
        <div className="flex">
          <div>
            <label className="label">Add single cocktail</label>
            <input
              ref={fileInputRef}
              className="file-input file-input input-primary w-full max-w-xs"
              type="file"
              name="file2"
              id="file2"
              onChange={(e) => {
                handleFileSingle(e);
              }}
            />
          </div>
          <button
            type="button"
            className="btn ml-2 mt-10"
            onClick={handleImportSingle}
          >
            Import
          </button>
        </div>
        {fileError && <div className="text-red-500">{fileError}</div>}
      </div>
      <button className="btn mt-10" onClick={handleExport}>
        Export Data
      </button>
      <Link to="/add">
        <button className="btn bg-primary mt-10">Take me back!</button>
      </Link>
    </div>
  );
}

export default ImportPage;
