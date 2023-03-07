import React from "react";

import productImg from "./../assets/img/product.jpg";
import { Modal } from "react-bootstrap";
import { setLoading } from "../actions/loading";
import { useSelector, useDispatch } from "react-redux";
import { setCategories, setCategory } from "../actions/categories";
import { setCategoryModal } from "../actions/modals";

function Services() {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categoryList);
  const category = useSelector((state) => state.categories.category);
  const categoryModal = useSelector((state) => state.modals.categoryModal);
 
  React.useEffect(() => { 
    dispatch(setLoading(true)); 
    dispatch(setCategories()).then(() => dispatch(setLoading(false)));
    window.scrollTo(0, 0)
  }, [dispatch]);

  return (
    <div className="services-page container">
      <div className="sec-services pt-5">
        <div className="container">
          <h4 className=" mb-4">Trending services</h4>
          <div className="sec-2">
            <div className="row">
              {categories.map((e) => (
                <div className="col-md-3 mb-4">
                  <div
                    className="mini-card rounded shadow "
                    onClick={() => {
                      dispatch(setCategory(e));
                      dispatch(setCategoryModal(true));
                    }}
                  >
                    {/* <img src={e.imageUrl} className="img img-fluid" alt="img" /> */}
                    <div className="back_img" style={{ backgroundImage: `url(${e.imageUrl})` }}></div>
                    <div className="text text-center">
                      <p className="mb-0 mt-2 py-2">{e.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        size="lg"
        show={categoryModal}
        onHide={() => dispatch(setCategoryModal(false))}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            <div>{category.name}</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div className="text-center mb-4">
                <img
                  className="img img-fluid"
                  src={category.imageUrl ? category.imageUrl : productImg}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-6">
              <p className="font-weight-bold">Sub Categories list:</p>
              <ul>
                {category.SubCategory &&
                  category.SubCategory.map((e) => <li>{e.name}</li>)}
              </ul>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Services;
 