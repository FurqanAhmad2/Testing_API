import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ActionButton from "../../components/common/ActionButton/actionButton";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import Slot from "../../components/common/Slot/slot";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import { AuthContext } from "../../context/AuthContext";
import EmployerTableRow from "../../components/common/EmployerTableRow/employerTableRow";
import { getEmployers } from "../../apicalls";

const ViewEmployers = () => {
  const { token } = useContext(AuthContext);

  const {
    isError: employersError,
    isLoading: employersLoading,
    data: employers,
    refetch,
  } = useQuery({
    queryKey: [`Employers`, token],
    queryFn: getEmployers,
  });

  if (employersLoading) return <ScreenLoading />;
  if (employersError) return <ScreenError />;

  return (
    <>
      <div className="profileBanner">
        <div className="bannerContent">
          <h1>View Members</h1>
        </div>
      </div>

      <div className="profileMainContainer shadow">
        <div className="tableContainer">
          <table className="table align-middle">
            <thead>
              <tr
                className="employerTableRowContainer"
                style={{ borderBottom: "1px solid #00000017" }}
              >
                <th> </th>
                <th style={{ paddingLeft: 15 }}>Name</th>
                <th style={{ paddingRight: 65 }}>Type</th>
              </tr>
            </thead>
            <tbody className="tableBody">
              {employers?.map((e) => {
                return <EmployerTableRow data={e} refetch={refetch} />;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewEmployers;
