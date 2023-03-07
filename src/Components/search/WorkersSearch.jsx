import React from "react";
import bannerImg from "./../../assets/img/BG-img.jpg";

import { setSearch, setSearchCurrent } from "../../actions/workers";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../actions/loading";

function WorkersSearch(props) {
  const dispatch = useDispatch();

  const [serchForm, setSearchForm] = React.useState({
    subCategory: "", 
    area: "",
  });
  const [serchCaregory, setSearchCaregory] = React.useState([]);
  const [serchArea, setSearchArea] = React.useState([]);
  const [serchFlags, setSearchFlags] = React.useState({
    cat: false,
    area: false,
  });

  const searchInfo = useSelector((state) => state.workers.searchInfo);
  const searchCurrent = useSelector((state) => state.workers.searchCurrent);

  React.useEffect(() => {
    setSearchCaregory([]);
    searchInfo.category &&
      searchInfo.category.map((e) => { 
        e.SubCategory.map((sub) => {
          if (
            sub.name.toLowerCase().includes(serchForm.subCategory.toLowerCase())
          ) {
            const data = { name: sub.name, _id: sub._id };
            setSearchCaregory((oldArray) => [...oldArray, data]);
            if (
              sub.name.toLowerCase() === serchForm.subCategory.toLowerCase()
            ) {
              setSearchCaregory([]);
              setSearchFlags({ ...serchFlags, cat: true });
            }
          }
        });
      });
  }, [serchForm.subCategory]);

  React.useEffect(() => {
    setSearchArea([]);
    searchInfo.city &&
      searchInfo.city.map((e) => {
        e.areas.map((sub) => {
          if (sub.name.toLowerCase().includes(serchForm.area.toLowerCase())) {
            const data = { name: sub.name, _id: sub._id };
            setSearchArea((oldArray) => [...oldArray, data]);
            if (sub.name.toLowerCase() === serchForm.area.toLowerCase()) {
              setSearchArea([]);
              setSearchFlags({ ...serchFlags, area: true });
            }
          }
        });
      });
  }, [serchForm.area]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const data = {
      subCategory_id: serchForm.subCategory_id,
      area_id: serchForm.area_id,
      subCategory: serchForm.subCategory,
      area: serchForm.area,
    };
    dispatch(setSearchCurrent(data)).then((res) => {
      dispatch(setLoading(true));
      dispatch(setSearch(data)).then((res) => dispatch(setLoading(false)));
    });
  };

  return (
    <>
      <div className="sec-1">
        <div className="container-fluid px-0">
          <div
            className="back_img"
            style={{ backgroundImage: `url(${bannerImg})` }}
          >
            <div className="p-abs text-center bg-white p-4 py-5">
              <h4 className="mb-3">
                Help when you need it, at your fingertips 
              </h4>
              <p className="mb-3">
                Get help from thousands of trusted Worker for everything from
                errands to contactless deliveries.
              </p>
              <form onSubmit={handleSearchSubmit}>
                <div className="form-inline d-flex justify-content-center">
                  <span class="search-input-cat w-40">
                    <input
                      className="form-control rounded-0 w-100"
                      value={serchForm.subCategory}
                      onChange={(e) =>
                        setSearchForm({
                          ...serchForm,
                          subCategory: e.target.value,
                        })
                      }
                      placeholder="I Need Help"
                      type="text"
                    ></input>
                    <ul className="position-abs">
                      {serchForm.subCategory != 0 &&
                        serchCaregory &&
                        serchCaregory.slice(0, 4).map((e) => (
                          <li
                            onClick={() =>
                              setSearchForm({
                                ...serchForm,
                                subCategory: e.name,
                                subCategory_id: e._id,
                              })
                            }
                          >
                            {e.name}
                          </li>
                        ))}
                    </ul>
                  </span>
                  <span class="search-input-cat w-40">
                    <input
                      className="form-control rounded-0 w-100"
                      value={serchForm.area}
                      onChange={(e) =>
                        setSearchForm({ ...serchForm, area: e.target.value })
                      }
                      placeholder="Please provide Area"
                      type="text"
                    ></input>
                    <ul className="position-abs">
                      {serchForm.area != 0 &&
                        serchArea &&
                        serchArea.slice(0, 4).map((e) => (
                          <li
                            onClick={() =>
                              setSearchForm({
                                ...serchForm,
                                area: e.name,
                                area_id: e._id,
                              }) 
                            }
                          >
                            {e.name}
                          </li>
                        ))}
                    </ul>
                  </span>
                  <input
                    disabled={
                      serchFlags.cat == false || serchFlags.area === false
                    }
                    className="btn px-4 rounded-0 text-white bg-primary w-20"
                    type="submit"
                    value="Search"
                  ></input>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WorkersSearch;
