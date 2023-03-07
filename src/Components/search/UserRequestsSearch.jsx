import React from "react";
import bannerImg from "./../../assets/img/BG-img.jpg";

import { setSearch, setSearchCurrent } from "../../actions/userRequests";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "../../actions/loading";
import SubCategoryList from "../SubCategoryList";

function UserRequestsSearch(props) {
  const dispatch = useDispatch();

  const [searchForm, setSearchForm] = React.useState({
    category: "",
    subCategory: "",
  });
  const [searchCategory, setSearchCategory] = React.useState([]);
  const [searchSubCategory, setSearchSubCategory] = React.useState([]);
  const [searchFlags, setSearchFlags] = React.useState({
    cat: false,
    subCat: false,
  });

  const searchInfo = useSelector((state) => state.userRequests.searchInfo);
  const searchCurrent = useSelector(
    (state) => state.userRequests.searchCurrent
  );


  React.useEffect(() => {
    console.log(searchForm);
    setSearchSubCategory([]);
    if (searchForm?.category_id) {
      searchInfo.category.map((cat) => {
        if (searchForm.category_id === cat._id) {
          let isSubCategorySet = cat?.SubCategory.find(
            (sub) =>
              sub.name.toLowerCase() === searchForm.subCategory.toLowerCase()
          );
          cat?.SubCategory.map((sub) => {
            if (
              sub.name
                .toLowerCase()
                .includes(searchForm.subCategory.toLowerCase())
            ) {
              if (isSubCategorySet) {
                setSearchSubCategory([]);
                setSearchFlags({ ...searchFlags, subCat: true });
              } else {
                setSearchFlags({ ...searchFlags, subCat: false });
                const data = { name: sub.name, _id: sub._id };
                setSearchSubCategory((oldArray) => [...oldArray, data]);
              }
            }
          });
        }
      });
    } else {
      searchInfo.category &&
        searchInfo.category.map((e) => {
          e?.subCategory?.map((sub) => {
            if (
              sub.name
                .toLowerCase()
                .includes(searchForm.subCategory.toLowerCase())
            ) {
              const data = { name: sub.name, _id: sub._id };
              setSearchSubCategory((oldArray) => [...oldArray, data]);
              if (
                sub.name.toLowerCase() === searchForm.subCategory.toLowerCase()
              ) {
                setSearchSubCategory([]);
                setSearchFlags({ ...searchFlags, subCat: true });
              }
            }
          });
        });
    }
  }, [searchForm.subCategory]);

  React.useEffect(() => {
    console.log(searchForm);
    setSearchCategory([]);
    let isCategorySet = searchInfo.category?.find(
      (cat) => cat.name.toLowerCase() === searchForm.category.toLowerCase()
    );
    searchInfo.category &&
      searchInfo.category.map((e) => {
        if (e.name.toLowerCase().includes(searchForm.category.toLowerCase())) {
          if (isCategorySet) {
            setSearchCategory([]);
            setSearchFlags({ ...searchFlags, cat: true });
          } else {
            const data = { name: e.name, _id: e._id };
            setSearchCategory((oldArray) => [...oldArray, data]);
            setSearchFlags({ ...searchFlags, cat: false });
          }
        }
      });
  }, [searchForm.category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const data = {
      subCategory_id: searchForm.subCategory_id,
      category_id: searchForm.category_id,
      subCategory: searchForm.subCategory,
      category: searchForm.category,
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
                Bid on the below proposals and get clients easily
              </h4>
              <p className="mb-3">
                You can bid on multiple proposals depending on your skills and
                experience and get connected with clients easily.
              </p>
              <form onSubmit={handleSearchSubmit}>
                <div className="form-inline d-flex justify-content-center">
                  <span class="search-input-cat w-40">
                    <input
                      className="form-control rounded-0 w-100"
                      value={searchForm.category}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          category: e.target.value,
                        })
                      }
                      placeholder="Search for category"
                      type="text"
                    ></input>
                    <ul className="position-abs">
                      {searchForm.category != 0 &&
                        searchCategory &&
                        searchCategory.slice(0, 4).map((e) => (
                          <li
                            onClick={() =>
                              setSearchForm({
                                ...searchForm,
                                category: e.name,
                                category_id: e._id,
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
                      value={searchForm.subCategory}
                      onChange={(e) =>
                        setSearchForm({
                          ...searchForm,
                          subCategory: e.target.value,
                        })
                      }
                      placeholder="Search for subcategory"
                      type="text"
                    ></input>
                    <ul className="position-abs">
                      {searchForm.subCategory != 0 &&
                        searchSubCategory &&
                        searchSubCategory.slice(0, 4).map((e) => (
                          <li
                            onClick={() =>
                              setSearchForm({
                                ...searchForm,
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
                  <input
                    disabled={
                      searchFlags.cat == false || searchFlags.subCat === false
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

export default UserRequestsSearch;
