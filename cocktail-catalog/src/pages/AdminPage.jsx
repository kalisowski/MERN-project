import React from 'react';
import AdminLogin from '../components/AdminLogin';
import { Link } from 'react-router-dom';

function AdminPage() {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <AdminLogin />
        <Link to="/">
          <div className="flex flex-start btn bg-warning m-10">
            Take me back!
          </div>
        </Link>
      </div>
    </>
  );
}

export default AdminPage;
