import React, { useEffect } from 'react';
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function AddPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const adminstate = localStorage.getItem('user');

  useEffect(() => {
    if (!adminstate) {
      navigate('/admin');
    }
  }, [adminstate, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center mt-10">
        {id ? <EditForm id={id} /> : <AddForm />}

        <div className="mt-5">
          <Link to="/">
            <button className="btn bg-primary">Take me back!</button>
          </Link>
          {!id ? (
            <Link to="/import">
              <button className="btn bg-secondary ml-5">
                Import from file
              </button>
            </Link>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default AddPage;
