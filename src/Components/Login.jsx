import React from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { customLogin } from '../actions/users';
import { setLoginModal } from '../actions/modals';
import { setLoading } from '../actions/loading';
import { useHistory } from 'react-router';

function Login() {
  const history = useHistory();

  const [userLoginForm, setUserLoginForm] = React.useState({
    email: '',
    password: '',
  });
  const loginShow = useSelector((state) => state.modals.loginModal);

  const dispatch = useDispatch();

  const handleCustomLogin = (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    dispatch(customLogin(userLoginForm)).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
        console.log(res.error);
        dispatch(setLoading(false));
      } else {
        toast.success('Login Success');

        dispatch(setLoginModal(false));
        setUserLoginForm({});
        dispatch(setLoading(false));
      }
    });
    history.push('/');
  };

  return (
    <>
      <Modal
        size='md'
        show={loginShow}
        onHide={() => dispatch(setLoginModal(false))}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <div></div>
          <Modal.Title id='example-modal-sizes-title-sm text-center'>
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST' onSubmit={handleCustomLogin}>
            <label className='mb-0'>Email: </label>
            <input
              type='text'
              className='form-control mb-3 rounded-3'
              placeholder='Enter Email'
              value={userLoginForm.email}
              onChange={(e) => {
                setUserLoginForm({
                  ...userLoginForm,
                  email: e.target.value,
                });
              }}
            ></input>
            <label className='mb-0'>Password: </label>
            <input
              type='password'
              className='form-control mb-3 rounded-3'
              placeholder='Enter password'
              value={userLoginForm.password}
              onChange={(e) => {
                setUserLoginForm({
                  ...userLoginForm,
                  password: e.target.value,
                });
              }}
            ></input>
            <input
              type='Submit'
              className='form-control mb-3 rounded-3 btn btn-block bg-pri text-white'
              value='Login'
            ></input>
            
            <hr></hr>
            
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
