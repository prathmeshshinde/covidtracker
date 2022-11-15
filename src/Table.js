import React from "react";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ country, cases: { active } }) => (
        <table className="tableform">
          <tr key={country} className="table-row">
            <td className="table-data">{country}</td>
            <td className="table-data">
              <strong>{active}</strong>
            </td>
          </tr>
        </table>
      ))}
    </div>
  );
}

export default Table;
