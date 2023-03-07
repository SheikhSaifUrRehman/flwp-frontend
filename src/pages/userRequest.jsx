import React, { useContext } from "react";
import axios from "axios";

import { setUserRequest } from "../actions/userRequests";
import { setLoginModal } from "../actions/modals";
import { setLoading } from "../actions/loading";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { path } from "./../path";

import { Button, Tooltip } from "@material-ui/core";
import { Person, Phone } from "@material-ui/icons";
import WhatsAppIcon from "@material-ui/icons/WhatsApp";
import DoneIcon from "@material-ui/icons/Done";
import CancelIcon from "@material-ui/icons/Cancel";
import { VideoCallContext } from "../contexts/videoCallContext";
import { withRouter } from "react-router";

const proposedTimeLengthKeyValue = {
  1: "3 days",
  2: "1 week",
  3: "2-4 weeks",
  4: "1-3 months",
};

const proposedTimeLengthMap = [
  {
    key: "1",
    value: "3 days",
  },
  {
    key: "2",
    value: "1 week",
  },
  {
    key: "3",
    value: "2-4 weeks",
  },
  {
    key: "4",
    value: "1-3 months",
  },
];

function UserReuest(props) {
  const dispatch = useDispatch();

  const userRequest = useSelector((state) => state.userRequests.userRequest);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user = useSelector((state) => state.user.user);
  const [bidForm, setBidForm] = React.useState({});

  const [bids, setBids] = React.useState([]);

  const getBids = () => {
    const id = props.match.params.id;
    const url = `${path}api/bid/request/${id}`;
    axios
      .get(url)
      .then((res) => {
        setBids(res.data.bids);
      })
      .catch((err) => {
        //   if(err.response.data.message === "Cant add bid on your own request" && err.response.data.status == "409" ){
        //     addToast("cant place bid on your personal request.", { appearance: 'info' });
        //   }
      });
  };

  React.useEffect(() => {
    const id = props.match.params.id;
    dispatch(setLoading(true));
    dispatch(setUserRequest(id)).then(() => dispatch(setLoading(false)));
  }, [props.match.params.id, dispatch]);

  React.useEffect(() => {
    getBids();
    // console.clear();
  }, []);

  const handleBidForm = (e) => {
    e.preventDefault();
    const data = {
      proposed_budget: bidForm.proposed_budget,
      proposed_time: bidForm.proposedTimeLength,
      info: bidForm.info,
      request_id: userRequest._id,
      user_id: user._id,
    };
    console.log(data);
    const url = `${path}api/bid`;
    const config = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };
    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
        dispatch(setLoading(true));
        dispatch(setUserRequest(res.data._id)).then(() =>
          dispatch(setLoading(false))
        );
        dispatch(setLoading(true));
        setBidForm({});
        toast.success("Bid Added successfully");
        props.history.push("/user-requests");
      })
      .catch((err) => {
        //   if(err.response.data.message === "Cant add bid on your own request" && err.response.data.status == "409" ){
        //     addToast("cant place bid on your personal request.", { appearance: 'info' });
        //   }
      });
  };

  const handleAcceptCancel = async (
    bid_id,
    user_id,
    status,
    userRequest_id
  ) => {
    let url = `${path}api/bid/accept-cancel`;
    const config = { headers: { "x-auth-token": user.token } };
    dispatch(setLoading(true));
    await axios.post(
      url,
      {
        bid_id,
        user_id,
        status,
        userRequest_id,
      },
      config
    );
    getBids();
    dispatch(setLoading(false));
  };

  const handleViewProfile = (id) => {
    console.log(`id`, id);
    props.history.push(`/worker/${id}`);
    // window.location.href = `/worker/${id}`;
  };

  const handleStopBidForm = (e) => {
    e.preventDefault();
    const data = {
      request_id: userRequest._id,
    };
    console.log(data);
    const url = `${path}api/UserRequest/stop`;
    const config = {
      headers: { "x-auth-token": localStorage.getItem("token") },
    };
    axios
      .post(url, data, config)
      .then((res) => {
        console.log(res.data);
        dispatch(setLoading(true));
        dispatch(setUserRequest(res.data._id)).then(() =>
          dispatch(setLoading(false))
        );
        dispatch(setLoading(true));
        toast.success("Bidding for this User Request has been stopped.");
      })
      .catch((err) => {
        //   if(err.response.data.message === "Cant add bid on your own request" && err.response.data.status == "409" ){
        //     addToast("cant place bid on your personal request.", { appearance: 'info' });
        //   }
      });
  };

  const isVerified = () => {
    console.log(`user`, user);
    console.log(
      `user.isWorker && user.worker[0].is_verified === true`,
      user.isWorker && user.worker[0].is_verified === true
    );
    if (user.isWorker && user.worker[0].is_verified === true) return true;
    return false;
  };
  const aleadyBid = () => {
    const alreadyBids = bids.find((el) => el?.user_id?._id === user?._id);

    // ^ Bang Operator !!
    return !!alreadyBids;
  };

  return (
    <div className="service-page">
      {/* <VideoCallProvider> */}
      {/* </VideoCallProvider> */}

      <div className="container">
        <div className="row py-5">
          <div className="col-md-5">
            <img
              src={userRequest.postImage}
              className="img w-100 h-auto"
              alt=""
            />
          </div>
          <div className="col-md-7">
            <div className="mt-5">
              {userRequest.bids &&
                !userRequest.isStopped &&
                userRequest.user_id &&
                userRequest.user_id?._id === user._id && (
                  <form onSubmit={handleStopBidForm}>
                    <input
                      type="submit"
                      className="btn bg-pri text-white btn-block mb-3"
                      value="STOP BIDDING"
                    ></input>
                  </form>
                )}
              <div>
                <h5 className=" mt-1" style={{ wordWrap: "break-word" }}>
                  <span className="font-weight-bold">Description:</span>
                  {userRequest.info}
                </h5>
              </div>
              <div className=" mb-1 ">
                <h5 className=" mt-1">
                  <span className="font-weight-bold">Budget:</span>
                  {userRequest.budget} Rs
                </h5>
                <h5 className=" mt-1">
                  <span className="font-weight-bold">User: </span>
                  {userRequest.user_id &&
                    userRequest.user_id.name.toUpperCase()}
                </h5>
                <h5 className=" mt-1">
                  <span className="font-weight-bold">Sub category:</span>
                  {userRequest.subCategory_id &&
                    userRequest.subCategory_id.name}
                </h5>
                <h5 className=" mt-1">
                  <span className="font-weight-bold">Category:</span>
                  {userRequest.category_id && userRequest.category_id.name}
                </h5>
                <h5 className=" mt-1">
                  <span className="font-weight-bold">
                    Proposed Time Length:
                  </span>
                  {userRequest.proposedTimeLength &&
                    proposedTimeLengthKeyValue[userRequest.proposedTimeLength]}
                </h5>
                <h5 className=" mt-1">
                  <span className="font-weight-bold">Category:</span>
                  {userRequest.skills && userRequest.skills}
                </h5>
              </div>
            </div>
          </div>
        </div>

        <div className="user-bids">
          <h4>User Bids</h4>
          {bids &&
            bids.map((e) => (
              <>
                {/* {console.log(`e.user_id._id`, e.user_id?._id)}
                {console.log(`user_id._id`, user?._id)}
                {console.log(
                  `1st Condition`,
                  JSON.stringify(e.user_id._id) ===
                    JSON.stringify(user._id)
                )} */}
                {(JSON.stringify(e?.user_id?._id) ===
                  JSON.stringify(user?._id) ||
                  userRequest?.user_id?._id === user?._id) && (
                  <div className="mini-card-bid shadow-sm border p-4">
                    <div className="row mb-3">
                      <div className="col-md-6">
                        <span className="font-weight-600 mb-4">User Name:</span>
                        {e.user_id.name}
                      </div>
                      <div className="col-md-6">
                        <span className="font-weight-600 mb-4">
                          Contact Number:
                        </span>
                        {e.user_id.contact_number}
                      </div>
                      <div className="col-md-6">
                        <span className="font-weight-600">
                          Proposed Budget :
                        </span>
                        {e.proposed_budget}
                      </div>
                      <div className="col-md-6">
                        <span className="font-weight-600">Proposed Time :</span>
                        {userRequest.proposedTimeLength &&
                          proposedTimeLengthKeyValue[
                            userRequest.proposedTimeLength
                          ]}
                      </div>
                    </div>
                    <div>
                      <span className="font-weight-600">Description :</span>
                      {e.info}
                    </div>
                    {userRequest?.user_id?._id === user?._id && (
                      <div>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<Person fontSize="large" />}
                          style={{
                            marginTop: 10,
                            marginRight: 15,
                            outline: "none",
                          }}
                          onClick={() =>
                            handleViewProfile(e.user_id.workerId[0])
                          }
                        >
                          View Profile
                        </Button>
                        <Tooltip title="This service is not available currently.">
                          <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Phone fontSize="large" />}
                            style={{
                              marginTop: 10,
                              marginRight: 15,
                              outline: "none",
                            }}
                          >
                            Call
                          </Button>
                        </Tooltip>
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<WhatsAppIcon fontSize="large" />}
                          onClick={(event) =>
                            window.open(
                              `https://api.whatsapp.com/send?phone=${e.user_id.contact_number}`,
                              "_blank"
                            )
                          }
                          style={{
                            marginTop: 10,
                            marginRight: 15,
                            outline: "none",
                          }}
                        >
                          WhatsApp
                        </Button>{" "}
                        {e.status == "Accepted" && (
                          <Button
                            style={{
                              marginTop: 10,
                              outline: "none",
                            }}
                          >
                            Bid Accepted
                          </Button>
                        )}
                        {e.status == "Rejected" && (
                          <Button
                            style={{
                              marginTop: 10,
                              outline: "none",
                            }}
                          >
                            Bid Rejected
                          </Button>
                        )}
                        {e.status == "Pending" && (
                          <div>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<DoneIcon fontSize="large" />}
                              onClick={() => {
                                handleAcceptCancel(
                                  e._id,
                                  e.user_id,
                                  "Accepted",
                                  userRequest._id
                                );
                              }}
                              style={{
                                marginTop: 10,
                                marginRight: 15,
                                outline: "none",
                              }}
                            >
                              Accept
                            </Button>
                            <Button
                              variant="contained"
                              color="primary"
                              startIcon={<CancelIcon fontSize="large" />}
                              onClick={() => {
                                handleAcceptCancel(
                                  e._id,
                                  e.user_id,
                                  "Rejected",
                                  userRequest._id
                                );
                              }}
                              style={{
                                marginTop: 10,
                                outline: "none",
                              }}
                            >
                              Reject
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
        </div>

        {!user.isWorker ? (
          <p className="mt-5 text-danger">Only Worker can add bids</p>
        ) : aleadyBid() === true ? (
          <p className="mt-5  text-danger">
            You Already Made Bid on this request
          </p>
        ) : user.isWorker && userRequest.bids && !userRequest.isStopped ? (
          userRequest.user_id && userRequest.user_id._id !== user._id ? (
            isVerified() === true ? (
              <div className="bod-form">
                <h4 className="mt-5">Add bid form</h4>
                <form onSubmit={handleBidForm}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="proposed_budget"
                        value={bidForm.proposed_budget}
                        onChange={(e) =>
                          setBidForm({
                            ...bidForm,
                            proposed_budget: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                    <div className="col-md-6">
                      <select
                        required
                        value={bidForm.proposedTimeLength}
                        onChange={(e) =>
                          setBidForm({
                            ...bidForm,
                            proposedTimeLength: e.target.value,
                          })
                        }
                        className="form-control mb-2"
                        id=""
                      >
                        <option value="">Proposed Time Length</option>
                        {proposedTimeLengthMap.map((e) => (
                          <option value={e.key}> {e.value} </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <textarea
                    name=""
                    id=""
                    rows="5"
                    className="form-control mb-3"
                    placeholder="Description"
                    value={bidForm.info}
                    onChange={(e) =>
                      setBidForm({ ...bidForm, info: e.target.value })
                    }
                    required
                  ></textarea>
                  <input
                    type="submit"
                    value="Post bid"
                    className="form-control bg-pri text-white text-center mb-5"
                  />
                </form>
              </div>
            ) : (
              <p className="mt-5 text-danger">
                You are NOT Verified as Worker to make bids yet !
              </p>
            )
          ) : (
            <p className="mt-5 text-danger">Can't bid on your own request</p>
          )
        ) : (
          <p className="mt-5  text-danger">
            Bidding for this request is ended.
          </p>
        )}

        {!isLoggedIn && (
          <p
            className="mt-5 text-danger cursor-pointer"
            onClick={() => dispatch(setLoginModal(true))}
          >
            Please <span className="font-weignt-600"> login</span> to add Bid.
          </p>
        )}
      </div>
    </div>
  );
}

export default withRouter(UserReuest);
