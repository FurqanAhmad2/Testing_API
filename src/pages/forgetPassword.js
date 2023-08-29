import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Heading1 from "../components/common/Heading1/heading1";
import ActionButton from "../components/common/ActionButton/actionButton";
import { passwordResetEmailSend, passwordResetPasswordSend } from "../apicalls";

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("token");

  const [form, setForm] = useState({ email: "", password: "", password2: "" });
  const [loading, setLoading] = useState(false);
  console.log(token);
  const HandleEmailSubmit = async () => {
    setLoading(true);
    if (!form.email) {
      toast("Please enter a vaild email");
      setLoading(false);
      return;
    }

    await passwordResetEmailSend(form.email, toast, navigate, setLoading);
  };

  const HandlePasswordSubmit = async () => {
    setLoading(true);
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (form.password2 !== form.password) {
      toast("Passwords do not match");
      setLoading(false);
      return;
    }
    if (
      !/\d/.test(form.password) ||
      form.password.length < 8 ||
      !specialChars.test(form.password)
    ) {
      toast(
        "Password should be 8 character long and have atleast 1 number and 1 special character"
      );
      setLoading(false);
      return;
    }

    await passwordResetPasswordSend(
      form.password,
      token,
      toast,
      navigate,
      setLoading
    );
  };

  return (
    <div className="authContainer">
      <div className="authContent">
        <div className="authMainContent">
          <div className="ptag1">
            <Heading1 text={`Forget Password?`} />

            <p style={{ color: "#00000080", paddingTop: 10 }}>
              {token
                ? "Please enter your new password"
                : "Please enter your email below"}
            </p>
          </div>

          <form
            className="loginBox"
            style={{ marginTop: 40 }}
            onSubmit={(e) => {
              e.preventDefault();
              if (token) HandlePasswordSubmit();
              else HandleEmailSubmit();
            }}
          >
            <div
              className="inputFieldContainer"
              style={{ gridTemplateColumns: "1fr" }}
            >
              {token ? (
                <>
                  <div>
                    <h4>Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      value={form.password}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>

                  <div>
                    <h4>Confirm Password</h4>
                    <input
                      placeholder="******"
                      type="password"
                      required
                      className="loginInput"
                      value={form.password2}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          password2: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h4>Email</h4>
                    <input
                      placeholder="email@abc.com"
                      type="email"
                      required
                      className="loginInput"
                      value={form.email}
                      onChange={(e) => {
                        setForm({
                          ...form,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </>
              )}
            </div>

            <div className="submitBtnContainer">
              <button type="submit">
                <ActionButton
                  text={loading ? "Loading..." : "Continue"}
                  handleClick={() => {}}
                />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
