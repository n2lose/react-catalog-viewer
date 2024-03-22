import React from "react";

function Viewer({ catalogImage }) {
  return (
    <div>
      <img
        className="catalog-view"
        src={catalogImage}
        alt="Catalog View"
        data-testid="catalog-view"
      />
    </div>
  );
}

export default Viewer;
