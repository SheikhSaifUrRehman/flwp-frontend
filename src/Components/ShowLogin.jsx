import React from "react";

import becomeWorkerImg from "./../assets/img/become_worker.png";
import signupImg from "./../assets/img/signup.png";
import { Link } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { setSignupModal } from "../actions/modals";

import Signup from "./Signup";

function ShowLogin() {   
  const dispatch = useDispatch(); 
  const isLoggedin = useSelector(state => state.user.isLoggedIn  )
  const isWorker = useSelector(state => state.user.user.isWorker  )

  return (
    <>
      <div className='sec-4 pt-5'>
        <div className='container'>
          <div className='row'>
            {isLoggedin ? (
              !isWorker && (
                <div className='col-md-12 mb-5'>
                  <div className='h-100 d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                      <img
                        src={becomeWorkerImg}
                        className='img img-fluid  m-auto'
                        style={{ display: 'block' }}
                      ></img>
                      <p className='mt-3'>
                        Grow your own business while saving the day
                        for busy neighbors.
                      </p>
                      <div className='py-2 px-5 mt-4 rounded-0 text-white btn bg-pri'>
                        <Link
                          to='/create-worker'
                          className='btn header-btn  text-white rounded-0 px-3'
                        >
                          Become a Worker
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            ) : (
              <>
                <div
                  className='col-md-6 mb-5'
                  style={{ borderRight: `1px solid 	#F0F0F0` }}
                >
                  <div className='h-100 d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                      <img
                        src={signupImg}
                        className='img img-fluid m-auto'
                        style={{ display: 'block' }}
                      ></img>
                      <p className='mt-3'>
                        Hear that? The sweet sigh of relief. Start
                        getting more done.
                      </p>
                      <span
                        className='py-2 px-5 mt-4 rounded-0 text-white btn bg-pri'
                        onClick={() => dispatch(setSignupModal(true))}
                      >
                        Signup
                      </span>
                    </div>
                  </div>
                </div>

                <div className='col-md-6 mb-5'>
                  <div className='h-100 d-flex justify-content-center align-items-center'>
                    <div className='text-center'>
                      <img
                        src={becomeWorkerImg}
                        className='img img-fluid  m-auto'
                        style={{ display: 'block' }}
                      ></img>
                      <p className='mt-3'>
                        Grow your own business while saving the day
                        for busy neighbors.
                      </p>
                      <div
                        className='py-2 px-5 mt-4 rounded-0 text-white btn bg-pri'
                        onClick={() => dispatch(setSignupModal(true))}
                      >
                        Become a Worker{' '}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <Signup />
    </>
  );
}

export default ShowLogin;
