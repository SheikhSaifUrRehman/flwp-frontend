import React from 'react';
import workerImg from './../assets/img/worker.jpg';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { setWorkersHomePage } from '../actions/workers';
import { setLoading } from '../actions/loading';
import ReactStars from 'react-rating-stars-component';

function Worker() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setWorkersHomePage()).then((res) => dispatch(setLoading(false)));
  }, []);

  const workers = useSelector((state) => state.workers.workerList.workers);

  return (
    <>
      <div className='section-worker-card pt-5'>
        <div className='container'>
          <h3 className='mb-3'>Trending Workers</h3>
          <div className='row'>
            {workers &&
              workers.slice(0, 6).map((e) => (
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
                            <span className='font-weight-bold'>Name:</span>{' '}
                            {e.u_id && e.u_id.name}
                          </p>
                          <p
                            className='pl-3 '
                            style={{
                              color: 'red !important',
                              fontWeight: 'bold',
                            }}
                          >
                            {/* 3366FF{' '} */}
                            <span>Category:</span>{' '}
                            <span style={{ color: '#3366FF' }}>
                              {e.category_id ? e.category_id.name : 'Not Given'}
                            </span>
                          </p>
                          <p
                            className='pl-3 '
                            style={{ color: '#000 !important' }}
                          >
                            {' '}
                            <span className=''>Sub Category:</span>{' '}
                            <span style={{ color: '#3366FF' }}>
                              {e.subCategory_id
                                ? e.subCategory_id.name
                                : 'Not Given'}
                            </span>
                          </p>
                        </div>
                      </div>
                      <span className='d-flex'>
                        <span className='px-2 text-white lead border-0 bg-pri mr-2'>
                          {e.rating.length
                            ? Math.round(
                                e.rating
                                  .map((ser) => parseInt(ser.rating))
                                  .reduce((a, b) => a + b, 0) / e.rating.length
                              )
                            : 0}
                        </span>
                        <span>
                          <ReactStars
                            count={5}
                            size={20}
                            value={
                              e.rating
                                ? parseInt(
                                    Math.round(
                                      e.rating
                                        .map((ser) => parseInt(ser.rating))
                                        .reduce((a, b) => a + b, 0) /
                                        e.rating.length
                                    )
                                  )
                                : 0
                            }
                            edit={false}
                            activeColor='#399689'
                          />
                        </span>
                      </span>
                      <div className='two mt-2 mb-4'>
                        <div className='d-flex justify-content-between mb-0'>
                          <p className=' mb-0'>Hourly Rate</p>
                          <p className='mb-0 text-secondary'>
                            {e.hourly_rate} Rs
                          </p>
                        </div>
                        <div className='d-flex justify-content-between mb-0'>
                          <p className=' mb-0'>Daily Rate</p>
                          <p className='mb-0 text-secondary'>
                            {e.daily_rate} Rs
                          </p>
                        </div>
                        <div className='d-flex justify-content-between mb-0'>
                          <p className=' mb-0'>Weekly Rate</p>
                          <p className='mb-0 text-secondary'>
                            {e.weekly_rate} Rs
                          </p>
                        </div>
                      </div>
                      <div className='two mt-2 mb-4'>
                        <div className='d-flex justify-content-between mb-0'>
                          <p className=' mb-0'>Experience</p>
                          <p className='mb-0 text-secondary'>{e.experience}</p>
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
                        <p className='font-weight-bold mb-0'>Introduction</p>
                        <p
                          className='mt-1'
                          style={{
                            fontWeight: 400,
                            wordWrap: 'break-word',
                          }}
                        >
                          {/* <b> I am the right person for your work </b> :
                          <br /> */}
                          {e.bio.slice(0, 180)}...
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Worker;
