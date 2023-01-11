import React, { useEffect } from 'react';
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function AddPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        {id ? <EditForm id={id} /> : <AddForm />}

        <div className="mt-10">
          <Link to="/">
            <button className="btn bg-primary">Take me back!</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default AddPage;
