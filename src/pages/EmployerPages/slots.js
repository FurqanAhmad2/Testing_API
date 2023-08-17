import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteSlot,
  getDeiRaces,
  getDeiStatsByJobId,
  getSlots,
  getTimezones,
  postCreateSlot,
} from "../../apicalls";
import ActionButton from "../../components/common/ActionButton/actionButton";
import ScreenError from "../../components/common/ScreenError/screenError";
import ScreenLoading from "../../components/common/ScreenLoading/screenLoading";
import Slot from "../../components/common/Slot/slot";
import Spinner from "../../components/common/spinner";
import SubHeading1 from "../../components/common/SubHeading1/subHeading1";
import { AuthContext } from "../../context/AuthContext";

const Slots = () => {
  const { jobId } = useParams();
  const { token } = useContext(AuthContext);
  const [form, setForm] = useState({
    date: "",
    time: "",
    link: "",
    timezone: "",
  });
  const [loading, setLoading] = useState(false);
  const {
    isError: slotsError,
    isLoading: slotsLoading,
    data: slots,
    refetch,
  } = useQuery({
    queryKey: [`Slots${jobId}`, token, jobId],
    queryFn: getSlots,
  });

  const {
    isError: timezoneError,
    isLoading: timezoneLoading,
    data: timezone,
  } = useQuery({
    queryKey: [`Timezones`, token, jobId],
    queryFn: getTimezones,
  });
  console.log(timezone);
  const HandleSubmit = async () => {
    if (!form.date) {
      toast("Enter Date");
      return;
    }
    if (!form.time) {
      toast("Enter Time");
      return;
    }
    if (!form.link) {
      toast("Enter Meeting Link");
      return;
    }
    if (!form.timezone) {
      toast("Enter Timezone");
      return;
    }

    setLoading(true);
    await postCreateSlot(
      token,
      {
        job: jobId,
        datetime: `${form.date} ${form.time}:00`,
        link: form.link,
        timezone: form.timezone,
      },
      toast,
      setLoading
    );
    refetch();
  };

  const HandleDelete = async (id) => {
    await deleteSlot(token, id, toast);
    refetch();
  };

  if (slotsLoading || timezoneLoading) return <ScreenLoading />;
  if (slotsError || timezoneError) return <ScreenError />;

  return (
    <>
      <div className="banner">
        <div className="bannerContent">
          <h1>Slots</h1>
        </div>
      </div>

      <div className="slotsPageContainer">
        <div className="slotsPageContent">
          <div className="form">
            <div>
              <h4>Date</h4>
              <input
                placeholder="******"
                type="date"
                required
                className="loginInput"
                value={form.date}
                onChange={(e) => {
                  setForm({
                    ...form,
                    date: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <h4>Time</h4>
              <input
                placeholder="******"
                type="time"
                required
                className="loginInput"
                value={form.time}
                onChange={(e) => {
                  setForm({
                    ...form,
                    time: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <h4>Link</h4>
              <input
                placeholder="url"
                type="text"
                required
                className="loginInput"
                value={form.link}
                onChange={(e) => {
                  setForm({
                    ...form,
                    link: e.target.value,
                  });
                }}
              />
            </div>

            <div>
              <h4>Timezone</h4>

              <select
                className="loginInput"
                required
                value={form.timezone}
                onChange={(e) => {
                  setForm({
                    ...form,
                    timezone: e.target.value,
                  });
                }}
              >
                <option disabled selected value="">
                  -- select a timezone --
                </option>
                {timezone.map((e) => {
                  return <option value={e}>{e}</option>;
                })}
              </select>
            </div>

            <ActionButton
              text={loading ? "Loading..." : "Create Slot"}
              handleClick={() => {
                HandleSubmit();
              }}
            />
          </div>

          {!slots.length && (
            <div className="zeroResultContainer" style={{ marginTop: 20 }}>
              <h3>No Slots Posted</h3>
            </div>
          )}

          <div className="slotsContainer">
            {slots.map((e) => {
              return (
                <Slot
                  data={e}
                  isDelete={true}
                  handleDelete={() => {
                    HandleDelete(e.id);
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

export default Slots;
