import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { setUserRequests } from '../actions/userRequests';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '../actions/loading';
import { Button } from '@material-ui/core';
import AddBidModal from '../dialogs/AddBidDialog';
import Search from '../Components/search/UserRequestsSearch';

const UserRequests = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const userRequests = useSelector(
    (state) => state.userRequests.userRequestsList
  );
  const user = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.loading);

  const toggleModalOpen = () => {
    setIsModalOpen((st) => !st);
  };

  React.useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setUserRequests()).then((res) => dispatch(setLoading(false)));
  }, [dispatch]);

  console.log(userRequests);

  return (
    <div>
      <AddBidModal isOpen={isModalOpen} closeDialog={toggleModalOpen} />
      <div>
            <Search />
        <div className='section-worker-card py-5'>
          <div className='container'>
            <div className='row mb-5 '>
              {console.log(`user`, user)}
              {user && // 👈 null and undefined check
                Object.keys(user).length > 0 && (
                  <div className='col-xs-12' style={{ marginLeft: 'auto' }}>
                    <Button
                      variant='contained'
                      color='secondary'
                      style={{
                        outline: 'none',
                      }}
                      onClick={toggleModalOpen}
                    >
                      Post Project
                    </Button>
                  </div>
                )}
            </div>
            <div className='row'>
              {
                userRequests.length === 0 &&
                (
                  <p>No user requests found!</p>
                )
              }
              {user &&
                userRequests &&
                userRequests.map((e) => (
                  <div className='col-md-4 mb-5'>
                    <Link to={`user-request/${e._id}`}>
                      <div className='user-req-mini-card p-4 border rounded'>
                        <div
                          className='backImg'
                          style={{
                            backgroundImage: `url(${e.postImage})`,
                          }}
                        ></div>
                        <hr />
                        <div>
                          <p className='mb-2'>
                            {' '}
                            <span className='font-weight-600'>
                              Description:{' '}
                            </span>{' '}
                            {e.info.substring(0, 90)}{' '}
                            {e.info.length >= 90 && `...`}
                          </p>
                          <p className='mb-2'>
                            <span className='w-50'>
                              <span className='font-weight-600'>
                                Specialization:{' '}
                              </span>
                              {e.subCategory_id.name}
                            </span>
                          </p>
                          <p className='mb-2'>
                            <span className='w-50'>
                              <span className='font-weight-600'>
                                Category:{' '}
                              </span>
                              {e.category_id.name}
                            </span>
                          </p>
                          <p className='mb-2'>
                            <span className='font-weight-600'>Budget: </span>
                            {e.budget} Rs
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
};

export default UserRequests;
