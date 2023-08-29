import { faEnvelope, faLocation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSlot,
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

const SlotCandidates = () => {
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
    queryKey: [`Slots${jobId}`, token, jobId],
    queryFn: getSlots,
  });
  const {
    isError: slotCandidatesError,
    isLoading: slotCandidatesLoading,
    data: slotCandidates,
  } = useQuery({
    queryKey: [`SlotCandidates${jobId}`, token, jobId],
    queryFn: getSlotCandidates,
  });

  if (slotsLoading || slotCandidatesLoading) return <ScreenLoading />;
  if (slotsError || slotCandidatesError) return <ScreenError />;

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Candidates</h1>
        </div>
      </div>

      <div className="slotsCandidatePageContainer">
        <div className="slotsPageContent">
          <div className="slotsContainer">
            {slotCandidates.map((e) => {
              console.log(e);
              return (
                <div className="candidateSlotCard shadow">
                  <Slot
                    data={e.slot}
                    noshadow
                    isDelete={false}
                    handleDelete={() => {}}
                  />
                  <div className="candidateDetails">
                    <h4>{`${e.candidate.first_name} ${e.candidate.last_name}`}</h4>

                    <div className="rowContainer">
                      <FontAwesomeIcon icon={faEnvelope} />
                      <p>{e.candidate.email}</p>
                    </div>

                    <div className="rowContainer">
                      <FontAwesomeIcon icon={faLocation} />
                      <p>
                        {e.candidate.city &&
                        e.candidate.state &&
                        e.candidate.country
                          ? `${e.candidate.city}, ${e.candidate.state}, ${e.candidate.country}`
                          : !e.candidate.city &&
                            e.candidate.state &&
                            e.candidate.country
                          ? `${e.candidate.state}, ${e.candidate.country}`
                          : !e.candidate.city &&
                            !e.candidate.state &&
                            e.candidate.country
                          ? `${e.candidate.country}`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {!slotCandidates.length ? (
              <div className="zeroResultContainer">
                <h3>No Candidates Found</h3>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default SlotCandidates;
