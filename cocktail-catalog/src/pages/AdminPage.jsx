import React from 'react';
import AdminLogin from '../components/AdminLogin';
import AddForm from '../components/AddForm';

function AdminPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AddForm />
    </div>
  );
  //   return <AdminLogin />;
}

export default AdminPage;
