import React from 'react';
import { toast } from 'react-toastify';

import { useDispatch } from 'react-redux';
import { logoutUser } from './actions/users';

const Logout = ({ history }) => {
  const dispatch = useDispatch();

  dispatch(logoutUser());
  toast.success('Logout success');
  history.push('/');

  return <div></div>;
};

export default Logout;
