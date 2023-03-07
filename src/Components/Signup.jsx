import React from 'react';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { customSignup } from '../actions/users';
import { setLoginModal, setSignupModal } from '../actions/modals';
import { setLoading } from '../actions/loading';
import validator from 'validator';

function Header() {
  const [userRegisterForm, setUserReisterForm] = React.useState({
    name: '',
    email: '',
    password: '',
    confirm_password: '',
    contact_number: '',
  });
  const signupShow = useSelector((state) => state.modals.signupModal);

  const dispatch = useDispatch();

  const handleCustomSignup = (e) => {
    e.preventDefault();
    if (
      userRegisterForm.password !== userRegisterForm.confirm_password
    ) {
      toast.error('Passwords MUST match');
      return;
    }
    dispatch(setLoading(true));
    dispatch(customSignup(userRegisterForm)).then((res) => {
      if (res.error) {
        toast.error(res.error.data.message);
        console.log(res.error);
      } else {
        // console.log(res);
        toast.success('Sign up Success');
        dispatch(setSignupModal(false));
        dispatch(setLoginModal(true));
        setUserReisterForm({});
      }
      dispatch(setLoading(false));
    });
  };

  return (
    <>
      <Modal
        size='md'
        show={signupShow}
        onHide={() => dispatch(setSignupModal(false))}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            Signup
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST' onSubmit={handleCustomSignup}>
            <label className='mb-0'>Name: </label>
            <input
              type='text'
              required
              className='form-control mb-3 rounded-3'
              placeholder='Enter Name'
              value={userRegisterForm.name}
              onChange={(e) => {
                setUserReisterForm({
                  ...userRegisterForm,
                  name: e.target.value,
                });
              }}
            ></input>
            <label className='mb-0'>Email: </label>
            <input
              type='email'
              required
              className='form-control mb-3 rounded-3'
              placeholder='Enter Email'
              value={userRegisterForm.email}
              onChange={(e) => {
                setUserReisterForm({
                  ...userRegisterForm,
                  email: e.target.value,
                });
              }}
            ></input>
            <label className='mb-0'>Password: </label>
            <input
              type='password'
              required
              className='form-control mb-3 rounded-3'
              placeholder='Enter password'
              value={userRegisterForm.password}
              onChange={(e) => {
                setUserReisterForm({
                  ...userRegisterForm,
                  password: e.target.value,
                });
              }}
            ></input>
            <label className='mb-0'>Confirm Password: </label>
            <input
              type='password'
              required
              className='form-control mb-3 rounded-3'
              placeholder='Enter Confirm Password'
              value={userRegisterForm.confirm_password}
              onChange={(e) => {
                setUserReisterForm({
                  ...userRegisterForm,
                  confirm_password: e.target.value,
                });
              }}
            ></input>
            <label className='mb-0'>Contact Number: </label>
            <input
              type='text'
              required
              className='form-control mb-3 rounded-3'
              placeholder='Enter Contact Number'
              value={userRegisterForm.contact_number}
              onChange={(e) => {
                setUserReisterForm({
                  ...userRegisterForm,
                  contact_number: e.target.value,
                });
              }}
            ></input>
            <input
              type='submit'
              className='form-control mb-3 rounded-3 btn btn-block bg-pri text-white'
              value='Signup'
            ></input>
            <hr></hr>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
