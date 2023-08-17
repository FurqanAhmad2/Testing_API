import "./styles.css";
import React, { useEffect, useRef } from "react";
import SubHeading1 from "../SubHeading1/subHeading1";

const TableContent = ({ title, data }) => {
  return (
    <div className="chart shadow">
      <div className="statsHeader">
        <SubHeading1 text={title} />
      </div>

      <div className="table-responsive">
        <table className="table align-middle gs-0 gy-3">
          <thead>
            <tr>
              <th className="p-0 w-50px">Name</th>
              <th className="p-0 min-w-40px">Value</th>
            </tr>
          </thead>

          <tbody>
            {data?.label?.map((e, index) => {
              return (
                <tr>
                  <td
                    className="text-dark fw-bold text-hover-primary mb-1 fs-6"
                    style={{ textTransform: "capitalize" }}
                  >
                    {e}
                  </td>
                  <td className="text-end text-dark fw-bold fs-6 pe-0">
                    {data.value[index]}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableContent;
