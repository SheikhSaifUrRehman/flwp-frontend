import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../actions/loading";
import { toast } from "react-toastify";

// import UserVideo from './../assets/videos/User_request.mp4'
import axios from "axios";
import { path } from "./../path";
import { Button } from "@material-ui/core";

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

function AddBid({ closeDialog }) {
  const [requestForm, setRequestForm] = React.useState({
    info: "",
    picture: "",
    category: "",
    subCategory: "",
    budget: "",
    skills: "",
    proposedTimeLength: "",
  });
  const dispatch = useDispatch();

  const searchInfo = useSelector((state) => state.workers.searchInfo);
  const token = useSelector((state) => state.user.token);

  const handleSubmit = (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("info", requestForm.info);
    fd.append("img", requestForm.picture);
    fd.append("category_id", requestForm.category);
    fd.append("subCategory_id", requestForm.subCategory);
    fd.append("budget", requestForm.budget);
    fd.append("skills", requestForm.skills);
    fd.append("proposedTimeLength", requestForm.proposedTimeLength);

    let url = `${path}api/UserRequest`;
    const config = { headers: { "x-auth-token": token } };
    dispatch(setLoading(true));
    axios
      .post(url, fd, config)
      .then((res) => {
        console.log(res.data);
        // history.push("/");
        toast.success("User request Created success");
        setRequestForm({
          info: "",
          picture: "",
          category: "",
          subCategory: "",
          budget: "",
          skills: "",
          proposedTimeLength: "",
        });
        dispatch(setLoading(false));
        closeDialog();

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((err) => {
        dispatch(setLoading(false));
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="addbid-page">
      <div className="sec-div pt-5">
        <div className="container">
          <div
            className="row"
            style={{
              justifyContent: "center",
            }}
          >
            <div className="col-md-12">
              <h4>What Service Are You Looking For?</h4>
              <form className=" py-4 text-white" onSubmit={handleSubmit}>
                {/* <textarea value={requestForm.info} onChange={e => setRequestForm({...requestForm, info: e.target.value}) } placeholder="i am looking for" id="" className="form-control mb-3" rows="5"></textarea>
                            <label for="file-upload" class="custom-file-upload">
                                <i class="fa fa-cloud-upload"></i> Custom Upload
                            </label> */}
                <label for="file-upload" style={{ color: "#000" }}>
                  Request Image
                </label>
                <input
                  type="file"
                  id="file-upload"
                  required
                  style={{
                    backgroundColor: "#84A9FF",
                  }}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      picture: e.target.files[0],
                    })
                  }
                  className="form-control mb-3"
                />

                <p className="font-weight-bold mb-3">
                  Describe the service you're looking to purchase - please be as
                  detailed as possible:
                </p>
                <div className="row mb-3">
                  <div className="col-6">
                    <select
                      required
                      value={requestForm.category}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          category: e.target.value,
                        })
                      }
                      className="form-control"
                      id=""
                    >
                      <option value="">Category name</option>
                      {searchInfo.category &&
                        searchInfo.category.map((e) => (
                          <option value={e._id}> {e.name} </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-6">
                    <select
                      value={requestForm.subCategory}
                      onChange={(e) =>
                        setRequestForm({
                          ...requestForm,
                          subCategory: e.target.value,
                        })
                      }
                      className="form-control"
                      id=""
                      required
                    >
                      <option value="">SubCategory name</option>
                      {searchInfo.category &&
                        searchInfo.category.map(
                          (e) =>
                            e._id === requestForm.category &&
                            e.SubCategory &&
                            e.SubCategory.map((a) => (
                              <option key={a._id} value={a._id}>
                                {" "}
                                {a.name}{" "}
                              </option>
                            ))
                        )}
                    </select>
                  </div>
                </div>

                <p className="font-weight-bold">
                  What is yout Budget for this service
                </p>
                <input
                  type="text"
                  required
                  placeholder="e.g: 5000"
                  value={requestForm.budget}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      budget: e.target.value,
                    })
                  }
                  className="form-control mb-3 w-50"
                />
                <p className="font-weight-bold">
                  Proposed Time Length?
                </p>
                <select
                  required
                  value={requestForm.proposedTimeLength}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
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

                <p className="font-weight-bold">
                  Description
                </p>
                <textarea
                  value={requestForm.info}
                  rows={5}
                  required
                  placeholder="Please Enter Info"
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      info: e.target.value,
                    })
                  }
                  className="form-control mb-3"
                />
                <p className="font-weight-bold">
                  What skills do you need?(Comma-separated)
                </p>
                <input
                  type="text"
                  required
                  placeholder="e.g: HTML,CSS,NodeJS,MongoDB"
                  value={requestForm.skills}
                  onChange={(e) =>
                    setRequestForm({
                      ...requestForm,
                      skills: e.target.value,
                    })
                  }
                  className="form-control mb-3 w-70"
                />

                {/* <input
                  type='submit'
                  value='Create Request'
                  className='btn btn-block rounded-0 bg-pri text-white'
                ></input> */}
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  fullWidth
                >
                  Create Request
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBid;
