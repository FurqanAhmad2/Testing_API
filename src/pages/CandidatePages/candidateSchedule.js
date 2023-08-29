import { faBuilding, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSlot,
  getCandidateSchedule,
  getDeiRaces,
  getDeiStatsByJobId,
  getSlotCandidates,
  getSlots,
  postCreateSlot,
} from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import Slot from "../../components/common/Slot/slot";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import { AuthContext } from "../../context/AuthContext";

const CandidateSchedule = () => {
  const { jobId } = useParams();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
  });
  const {
    isError: slotsError,
    isLoading: slotsLoading,
    data: slots,
  } = useQuery({
    queryKey: [`CandidateSchedule${jobId}`, token],
    queryFn: getCandidateSchedule,
  });
  if (slotsLoading) return <ScreenLoading />;
  if (slotsError) return <ScreenError />;

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Schedule</h1>
        </div>
      </div>

      <div className="slotsCandidatePageContainer">
        <div className="slotsPageContent">
          <div className="slotsContainer">
            {!slots.length && (
              <div className="zeroResultContainer" style={{ marginTop: 20 }}>
                <h3>No Slots Found</h3>
              </div>
            )}

            {slots.map((e) => {
              console.log(e);
              const job = e.slot.job;
              return (
                <div className="candidateSlotCard shadow">
                  <Slot
                    data={e.slot}
                    noshadow
                    isDelete={false}
                    handleDelete={() => {}}
                  />
                  <div className="candidateDetails">
                    <h4>{job?.title || "Job Name"}</h4>

                    <div className="rowContainer">
                      <FontAwesomeIcon icon={faBuilding} />
                      <p>{job?.company?.name || "Company Name"}</p>
                    </div>

                    <div className="rowContainer">
                      <FontAwesomeIcon icon={faLocation} />
                      <p>
                        {job?.city && e.job?.state && e.job?.country
                          ? `${job?.city}, ${job?.state}, ${job?.country}`
                          : !job?.city && job?.state && job?.country
                          ? `${job?.state}, ${job?.country}`
                          : !job?.city && !job?.state && job?.country
                          ? `${job?.country}`
                          : "Location"}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CandidateSchedule;
