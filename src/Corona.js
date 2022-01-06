import React from "react";

function Corona({ title, total }) {
  return (
    <div className="caseBox">
      <div className="caseBoxCard">
        <p className="titleCases">{title}</p>
        <h2 className="totalCases">{total}</h2>
      </div>
    </div>
  );
}

export default Corona;
