import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  bookSlot,
  deleteSlot,
  getDeiRaces,
  getDeiStatsByJobId,
  getSlots,
  postCreateSlot,
} from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import Slot from "../../components/common/Slot/slot";
import SlotEmployee from "../../components/common/SlotEmployee/slotEmployee";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import { AuthContext } from "../../context/AuthContext";

const JobSlots = () => {
  const { jobId } = useParams();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
  });
  const {
    isError,
    isLoading,
    data: slots,
    refetch,
  } = useQuery({
    queryKey: [`Slots${jobId}`, token, jobId],
    queryFn: getSlots,
  });

  const HandleSubmit = async (id, setLoading) => {
    await bookSlot(
      token,
      {
        slot: id,
      },
      toast,
      setLoading
    );
    refetch();
  };
  if (isLoading) return <ScreenLoading />;
  if (isError) return <ScreenError />;

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Slots</h1>
        </div>
      </div>

      <div className="slotsPageContainer">
        <div className="slotsPageContent">
          <div className="slotsContainer">
            {!slots.length && (
              <div className="zeroResultContainer" style={{ marginTop: 20 }}>
                <h3>No Slots Found</h3>
              </div>
            )}

            {slots.map((e) => {
              return (
                <SlotEmployee
                  data={e}
                  handleSubmit={(setLoading) => {
                    HandleSubmit(e.id, setLoading);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default JobSlots;
