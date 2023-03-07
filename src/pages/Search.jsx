import React from 'react';
import axios from 'axios';
import safetyImg from './../assets/img/download.svg';
import bannerImg from './../assets/img/IMG-20210119-WA0157.jpg';
import productImg from './../assets/img/product.jpg';
import workerImg from './../assets/img/worker.jpg';
import becomeWorkerImg from './../assets/img/become_worker.png';
import signupImg from './../assets/img/signup.png';

import { Navbar, Nav } from 'react-bootstrap';
import { Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setWorkers, setSearch } from '../actions/workers';
import { setLoading } from '../actions/loading';

function Search(props) {
  const dispatch = useDispatch();
  const workers = useSelector((state) => state.workers.workerList.workers);
  const searchCurrent = useSelector((state) => state.workers.searchCurrent);

  React.useEffect(() => {
    if (searchCurrent.length === 0) {
      props.history.push('/');
    }
    dispatch(setLoading(true));
    dispatch(setSearch(searchCurrent)).then((res) =>
      dispatch(setLoading(false))
    );
  }, []);

  return (
    <div>
      <div className='sec-1'>
        <div className='container-fluid px-0'>
          <div
            className='back_img'
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <div className='p-abs text-center bg-white p-4 py-5'>
              <h3 className='mb-3'>
                Help when you need it, at your fingertips
              </h3>
              <p className='mb-3'>
                Get help from thousands of trusted Worker for everything from
                errands to contactless deliveries.
              </p>
              <div className='form-inline d-flex justify-content-center'>
                <input
                  className='form-control rounded-0'
                  placeholder='Search Workers'
                  type='text'
                ></input>
                <button className='btn bg-pri px-4 rounded-0 text-white'>
                  {' '}
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='section-worker-card py-5'>
          <div className='container'>
            {/* <h4 className="mb-3">Search Result Workers</h4> */}
            <h5>
              Search results in :{' '}
              <span className='fw-bold'> {searchCurrent.area}</span>{' '}
            </h5>
            <h5 className='mb-5'>
              Category Selected:{' '}
              <span className='fw-bold'>{searchCurrent.subCategory}</span>
            </h5>
            <div className='row'>
              {workers &&
                workers.map((e) => (
                  <div className='col-md-4 mb-5'>
                    <Link to={`worker/${e._id}`}>
                      <div className='worker-card shadow p-3 py-4 rounded'>
                        <div className='one d-flex justify-content-start align-items-center mb-3'>
                          <div
                            className='backImg mb-2'
                            style={{
                              backgroundImage: `url(${
                                e.picture === 'temp' ? workerImg : e.picture
                              })`,
                            }}
                          ></div>
                          <div>
                            <p className='pl-3 mb-0'>
                              {' '}
                              <span className='font-weight-bold'>
                                Name:
                              </span>{' '}
                              {e.u_id && e.u_id.name}
                            </p>
                            <p className='pl-3 text-secondary'>
                              {' '}
                              <span className='font-weight-bold'>
                                Category:
                              </span>{' '}
                              {e.category_id ? e.category_id.name : 'Not Given'}
                            </p>
                            <p className='pl-3 text-secondary'>
                              {' '}
                              <span className='font-weight-bold'>
                                Sub Category:
                              </span>{' '}
                              {e.subCategory_id
                                ? e.subCategory_id.name
                                : 'Not Given'}
                            </p>
                          </div>
                        </div>
                        <div className='two mt-2 mb-4'>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Hourly</p>
                            <p className='mb-0 text-secondary'>
                              {e.daily_rate} Rs
                            </p>
                          </div>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Daily</p>
                            <p className='mb-0 text-secondary'>
                              {e.hourly_rate} Rs
                            </p>
                          </div>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Weekly</p>
                            <p className='mb-0 text-secondary'>
                              {e.weekly_rate} Rs
                            </p>
                          </div>
                        </div>
                        <div className='two mt-2 mb-4'>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Experience</p>
                            <p className='mb-0 text-secondary'>
                              {e.experience}
                            </p>
                          </div>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Education</p>
                            <p className='mb-0 text-secondary'>{e.education}</p>
                          </div>
                          <div className='d-flex justify-content-between mb-0'>
                            <p className=' mb-0'>Age</p>
                            <p className='mb-0 text-secondary'>{e.age}</p>
                          </div>
                        </div>
                        <div className='three mt-2 mb-3'>
                          <p className='font-weight-bold mb-0'>Bio</p>
                          <p className='mt-1'>
                            {' '}
                            <span
                              className='font-weight-bold'
                              style={{
                                fontWeight: 400,
                                wordWrap: 'break-word',
                              }}
                            >
                              I am the right person for the job:
                            </span>{' '}
                            {e.bio}{' '}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
