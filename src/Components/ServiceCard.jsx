import React from "react";

function ServiceCard() {
  return (
    <>
      <div
        className="mini-card rounded shadow "
        onClick={() => {
          dispatch(setCategory(e));
          dispatch(setCategoryModal(true));
        }}
      >
        <img src={e.imageUrl} className="img img-fluid" alt="img" />
        <div className="text text-center">
          <p className="mb-0 mt-2 py-2">{e.name}</p>
        </div>
      </div>
    </>
  );
}

export default ServiceCard;
