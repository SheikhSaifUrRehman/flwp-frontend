import React from 'react';
import workerImg from './../assets/img/worker.jpg';
import axios from 'axios';
import userImg from './../assets/img/user_img.png';

import { setWorker } from '../actions/workers';
import { setLoading } from '../actions/loading';
import { setLoginModal } from '../actions/modals';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import ReactStars from 'react-rating-stars-component';
import { path } from './../path';

function Worker(props) {
  const dispatch = useDispatch();

  const worker = useSelector((state) => state.workers.worker);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);

  console.log(`worker`, worker);
  console.log(`user`, user);

  const [reviewForm, setReviewForm] = React.useState({});

  React.useEffect(() => {
    const id = props.match.params.id;
    dispatch(setWorker(id)).then(() => dispatch(setLoading(false)));
    dispatch(setLoading(true));
  }, [dispatch, props.match.params.id]);

  const handleReviewForm = (e) => {
    e.preventDefault();
    const data = {
      rating: reviewForm.rating,
      review: reviewForm.review,
      user_id: user._id,
      worker_id: worker?._id,
    };
    console.log(data);
    const url = `${path}api/rating/`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        dispatch(setLoading(true));
        setReviewForm({ rating: '', review: '' });
        dispatch(setWorker(res.data._id)).then(() =>
          dispatch(setLoading(false))
        );
        toast.success('product Review added');
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='service-page'>
      <div className='container'>
        <div className='row pt-5' style={{ border: '1px solid #ccc' }}>
          <div className='col-md-4'>
            <div
              className='back_img rounded-circle border bg-dark'
              style={{
                backgroundImage: `url(${
                  worker?.picture === 'temp' ? workerImg : worker?.picture
                })`,
                height: 350,
              }}
            ></div>
          </div>
          <div className='col-md-4'>
            <div className='mb-5'>
              <p>
                {' '}
                <span className='font-weight-bold'>Title:</span>{' '}
                {worker?.u_id && worker?.u_id.name}
              </p>
              <p>
                <span className='font-weight-bold'>Age:</span> {worker?.age}
              </p>
              <p>
                <span className='font-weight-bold'>Experience:</span>{' '}
                {worker?.experience}
              </p>
              <p>
                <span className='font-weight-bold'>Education:</span>{' '}
                {worker?.education}
              </p>
              <p>
                <strong>Description:</strong>
                <p style={{ wordWrap: 'break-word' }}>{worker?.bio}</p>
              </p>
              <div style={{ border: '1px solid #cccccc', padding: 10 }}>
                <p className='font-weight-bold mt-2'>Worker Location</p>
                <p> City: {worker?.city ? worker?.city.name : 'Not Given'}</p>
                <p> Area: {worker?.area ? worker?.area.name : 'Not Given'}</p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            {worker?.rating && worker?.rating.length > 0 ? (
              <span className='d-flex'>
                <span>
                  <ReactStars
                    count={5}
                    size={32}
                    value={parseInt(
                      Math.round(
                        worker?.rating
                          .map((ser) => parseInt(ser.rating))
                          .reduce((a, b) => a + b, 0) / worker?.rating.length
                      )
                    )}
                    edit={false}
                    activeColor='#0076C0'
                  />
                </span>
              </span>
            ) : (
              <p className='text-secondary'> Not ratings given yet</p>
            )}

            <div className=' mb-1 p-1'>
              <p className=' mt-2'>
                {' '}
                <span className='font-weight-bold'>Hourly Rate:</span>{' '}
                {worker?.hourly_rate} Rs
              </p>
              <p className=' mt-1'>
                {' '}
                <span className='font-weight-bold'>Daily Rate:</span>{' '}
                {worker?.daily_rate} Rs
              </p>
              <p className=' mt-1'>
                {' '}
                <span className='font-weight-bold'>Weekly Rate:</span>{' '}
                {worker?.weekly_rate} Rs
              </p>
            </div>

            {isLoggedIn ? (
              <div className=' mb-1 p-1'>
                <p className='font-weight-bold mt-2'>Worker Contact Info</p>
                <p> Contact Number: {worker?.contact_number}</p>
                {/* <p>
                  Secondary Contact Number: {worker?.secondary_contact_number}
                </p> */}
                <p> Whatsapp Number: {worker?.whatsapp_number}</p>
              </div>
            ) : (
              <div className=' mb-1 p-1'>
                <h6 className='text-danger'>
                  please login to view Contact{' '}
                  <span
                    className='login-btn'
                    onClick={() => dispatch(setLoginModal(true))}
                  >
                    Login
                  </span>
                </h6>
              </div>
            )}

            <div className=' mb-1 p-1'>
              <h5 className='font-weight-bold mt-2'>Worker Category</h5>
              <p>
                Category:
                {worker?.category_id ? worker?.category_id.name : 'Not Given'}
              </p>
              <p>
                {' '}
                Sub Category:{' '}
                {worker?.subCategory_id
                  ? worker?.subCategory_id.name
                  : 'Not Given'}
              </p>
            </div>
          </div>
        </div>

        <h4 className='mt-5 mb-3'>Worker Reviews: </h4>

        {worker?.rating && worker?.rating.length !== 0 ? (
          worker?.rating &&
          worker?.rating.map((r) => (
            <div>
              <div className='row mb-2 no-gutters'>
                <div className='col-2 text-center'>
                  <img
                    src={userImg}
                    className='rounded-0 img img-fluid'
                    style={{ height: 70, width: 70 }}
                    alt=''
                  />
                </div>
                <div className='col-9 text-left'>
                  <div className='d-flex justify-content-between'>
                    <div className='d-flex mbm-2'>
                      <p style={{ fontWeight: 600 }} className='mr-2'>
                        {r.user_id.name}
                      </p>
                      <ReactStars
                        count={5}
                        size={15}
                        value={parseInt(r.rating)}
                        edit={false}
                        activeColor='#0076C0'
                      />
                    </div>
                    <p>
                      {new Date(
                        parseInt(r._id.substring(0, 8), 16) * 1000
                      ).toDateString()}
                    </p>
                  </div>

                  <p>{r.review}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className='text-sm'>No review is posted yet.</p>
          </div>
        )}

        {user._id !== worker?.u_id?._id && (
          <>
            <h4 className='mt-5'>Write a review: </h4>

            {isLoggedIn ? (
              <form onSubmit={handleReviewForm} className='mb-5'>
                <ReactStars
                  count={5}
                  onChange={(currentRating) =>
                    setReviewForm({
                      ...reviewForm,
                      rating: currentRating,
                    })
                  }
                  size={32}
                  activeColor='#0076C0'
                />
                {/* <input className="form-control" value={reviewForm.rating} onChange={ e => setReviewForm({ ...reviewForm, rating: e.target.value }) } type="number" placeholder="Enter number out of 5" ></input> */}
                <textarea
                  required
                  placeholder='Please write your valuable review...'
                  rows='5'
                  value={reviewForm.review}
                  onChange={(e) =>
                    setReviewForm({
                      ...reviewForm,
                      review: e.target.value,
                    })
                  }
                  className='form-control my-3'
                ></textarea>
                <input
                  className='form-control bg-pri text-white'
                  type='submit'
                ></input>
              </form>
            ) : (
              <h6 className='text-danger'>
                {' '}
                please login to write review{' '}
                <span
                  className='login-btn'
                  onClick={() => dispatch(setLoginModal(true))}
                >
                  Login
                </span>{' '}
              </h6>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Worker;
