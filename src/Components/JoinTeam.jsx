import React from 'react';
import { Modal } from 'react-bootstrap';
import { GoogleLogin } from 'react-google-login';
import { toast } from 'react-toastify';

import { useSelector, useDispatch } from 'react-redux';
import { socialRegister, customLogin } from '../actions/users';
import { setTeamModal } from '../actions/modals';
import { setLoading } from '../actions/loading';
import axios from 'axios';
import { path } from './../path';

function Login() {
  const [teamForm, setteamForm] = React.useState({
    name: '',
    email: '',
    contact_number: '',
    skills: '',
    bio: '',
  });
  const teamShow = useSelector((state) => state.modals.teamModal);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (validateEmail(teamForm.email) === false) {
      toast.error('Email Must be a valid email !');
      return;
    }
    console.log(
      `teamForm.contact_number.length`,
      teamForm.contact_number.length
    );
    if (teamForm.contact_number.length !== 11) {
      toast.error('Contact Number must be in format (03123123121)');
    }
    if (teamForm.bio.length <= 50) {
      toast.error('Introduction must NOT be less than 50 Characters');
    }
    const url = `${path}api/utility/team`;
    axios
      .post(url, teamForm)
      .then((res) => {
        console.log(res.data);
        toast.success(`${res.data.result}`);
        setteamForm({
          name: '',
          email: '',
          contact_number: '',
          skills: '',
          bio: '',
        });
        dispatch(setTeamModal(false));
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Modal
        size='md'
        show={teamShow}
        onHide={() => dispatch(setTeamModal(false))}
        aria-labelledby='example-modal-sizes-title-sm'
      >
        <Modal.Header closeButton>
          <div></div>
          <Modal.Title id='example-modal-sizes-title-sm text-center'>
            Join Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form method='POST' onSubmit={handleJoinTeam}>
            <label className='mb-0'>Name: </label>
            <input
              type='text'
              className='form-control mb-3 rounded-3'
              placeholder='Enter Name'
              value={teamForm.name}
              onChange={(e) => {
                setteamForm({ ...teamForm, name: e.target.value });
              }}
              required
            ></input>

            <label className='mb-0'>Email: </label>
            <input
              required
              type='text'
              className='form-control mb-3 rounded-3'
              placeholder='Enter Email'
              value={teamForm.email}
              onChange={(e) => {
                setteamForm({ ...teamForm, email: e.target.value });
              }}
            ></input>

            <label className='mb-0'>Contact Number: </label>
            <input
              required
              type='number'
              className='form-control mb-3 rounded-3'
              placeholder='Enter Contact (03123123232)'
              value={teamForm.contact_number}
              onChange={(e) => {
                setteamForm({
                  ...teamForm,
                  contact_number: e.target.value,
                });
              }}
            ></input>

            <label className='mb-0'>Your Skills: </label>
            <select
              value={teamForm.skills}
              onChange={(e) => {
                setteamForm({ ...teamForm, skills: e.target.value });
              }}
              className='form-control mb-3'
            >
              <option>Javactipt Developer</option>
              <option>NODE Developer</option>
              <option>DB Developer</option>
              <option>React Developer</option>
            </select>

            <label className='mb-0'>Your Introduction: </label>
            <textarea
              className='form-control mb-3 rounded-3'
              placeholder='Enter somthing about you'
              required
              rows={3}
              value={teamForm.bio}
              onChange={(e) => {
                setteamForm({ ...teamForm, bio: e.target.value });
              }}
            ></textarea>

            <input
              type='Submit'
              className='form-control mb-3 rounded-3 btn btn-block bg-pri text-white'
              placeholder='Enter password'
            ></input>
            <hr></hr>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Login;
