import React from "react";
import safetyImg from "./../assets/img/download.svg";

function CovidPopup() {
  return (
    <>
      <div className="container">
        <div>
          <p className="h3 text-center py-4">
            <img
              src={safetyImg}
              className="img img-fluid mr-1"
              style={{ width: 50 }}
            ></img>
            See the latest on our response to COVID-19
          </p>
        </div>
      </div>
    </>
  );
}

export default CovidPopup;
