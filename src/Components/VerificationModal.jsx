import React from 'react';
import { Modal } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux';

function VerificationModal() {
  const [verificationShow, setVerificaitonShow] =
    React.useState(false);
  const [user, setUser] = React.useState({});
  const [
    userVerificationKeyFrom,
    setUserLoginFormVerificationKeyFrom,
  ] = React.useState({ verificationKey: '' });
  const [token, setToken] = React.useState(
    localStorage.getItem('token')
  );

  const dispatch = useDispatch();

  return (
    <div>
      <Modal
        size='md'
        show={verificationShow}
        onHide={() => setVerificaitonShow(false)}
        aria-labelledby='example-modal-sizes-title-lg'
      >
        <Modal.Header closeButton>
          <Modal.Title id='example-modal-sizes-title-lg'>
            User Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST'>
            <p className='text-center py-3'>
              Your account is created susscesfully now you need to
              enter verification key that is sent on your email.
            </p>
            <hr></hr>
            <label className='mb-1'>Verification Key: </label>
            <input
              type='text'
              className='form-control mb-3 rounded-3'
              placeholder='Enter Verificaiton Key'
              value={userVerificationKeyFrom.name}
              onChange={(e) => {
                setUserLoginFormVerificationKeyFrom({
                  ...userVerificationKeyFrom,
                  verificationKey: e.target.value,
                });
              }}
            ></input>
            <input
              type='submit'
              disabled={
                userVerificationKeyFrom.verificationKey.length < 4 ||
                userVerificationKeyFrom.verificationKey.length > 4
              }
              className='form-control mb-3 rounded-3 btn btn-block bg-pri text-white'
            ></input>

            <hr></hr>
            <p className='text-center' style={{ cursor: 'pointer' }}>
              Resend Mail
            </p>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default VerificationModal;
