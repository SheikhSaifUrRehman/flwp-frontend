import React from "react";
import { useSelector } from "react-redux";

function SubCategoryList() {
    const categories = useSelector(state => state.categories.categoryList);

    return ( 
        <>
            <div className="container">
                <h4 className="mt-5 mb-4">Services we offer:</h4>
                <div className="sub-cat-list mb-5">
                    {
                        categories && categories.map(cat =>
                            cat.SubCategory && cat.SubCategory.map(e =>
                                <div className="btn btn-lg bg-outline-pri mr-4 mb-4 rounded-0">{e.name}</div>
                            )
                        )
                    }
                </div>
            </div>
        </> 
    );
}

export default SubCategoryList;
