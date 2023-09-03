import "react-toastify/dist/ReactToastify.css";
import "./styles/animate.css";
import "./styles/bootsnav.css";
import "./styles/bootstrap.min.css";
import "./styles/bootstrap-select.min.css";
import "./styles/responsive.css";
import "./styles/style.css";
import "./styles/icons.css";
import "./styles/nice-select.css";
import "./styles/styles.css";
import './index.css';

import { Routes, Route, Outlet } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "./context/AuthContext";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

import { initialFetch } from "./apicalls";
import Layout from "./components/layout/layout";
import Home from "./pages/home";
import Auth from "./pages/auth";
import JobPage from "./pages/jobPage";
import ResumeUpload from "./pages/CandidatePages/resumeUpload";
import EditProfile from "./pages/editProfile";
import Jobs from "./pages/jobs";
import Company from "./pages/company";
import Category from "./pages/category";
import Aboutus from "./pages/aboutus";
import Contact from "./pages/contact";
import JobPost from "./pages/EmployerPages/jobPost";
import Jobquestion from "./pages/EmployerPages/jobquestion";
import Jobcandidates from "./pages/EmployerPages/jobcandidates";
import CreateCompany from "./pages/EmployerPages/createCompany";
import Onboardingquestion from "./pages/EmployerPages/onboardingQuestions";
import VideoUpload from "./pages/EmployerPages/videoUpload";
import Onboardingcandidates from "./pages/EmployerPages/onboardingCandidates";
import FilesUpload from "./pages/CandidatePages/filesUpload";
import DashboardLayout from "./components/layout/dashboardLayout";
import JobApplied from "./pages/CandidatePages/jobApplied";
import Interview from "./pages/CandidatePages/interview";
import JobOnboarding from "./pages/CandidatePages/jobOnboarding";
import JobRejected from "./pages/CandidatePages/jobRejected";
import EmployerCompany from "./pages/EmployerPages/company";
import PostedJob from "./pages/EmployerPages/postedJob";
import OnboardingPage from "./pages/EmployerPages/onboardingPage";
import EditJob from "./pages/EmployerPages/editjob";
import EmployerInterview from "./pages/EmployerPages/employerinterview";
import Plans from "./pages/plans";
import KnowledgeBase from "./pages/knowledgeBase";
import Faq from "./pages/faq";
import Cookies from "./pages/cookies";
import PrivacyPolicy from "./pages/privacypolicy";
import Disclaimer from "./pages/disclaimer";
import TermsOfService from "./pages/termsorfservice";
import Dei from "./pages/dei";
import Verify from "./pages/verify";
import EmployeeDei from "./pages/CandidatePages/employeeDei";
import EmployerDei from "./pages/EmployerPages/employerDei";
import CandidateSearch from "./pages/EmployerPages/candidateSearch";
import EmployeeJobDei from "./pages/EmployerPages/employeeJobDei";
import EmployeeDeiQuiz from "./pages/CandidatePages/employeeDeiQuiz";
import { LinkedInCallback } from "react-linkedin-login-oauth2";
import Apidocs from "./pages/apiDocs";
import Slots from "./pages/EmployerPages/slots";
import SlotCandidates from "./pages/EmployerPages/slotCandidates";
import JobSlots from "./pages/CandidatePages/jobSlots";
import CandidateSchedule from "./pages/CandidatePages/candidateSchedule";
import LoadingPage from "./pages/loadingPage";
import Page404 from "./pages/Page404";
import ForgetPassword from "./pages/forgetPassword";
import AddEmployer from "./pages/EmployerPages/addEmployer";
import ViewEmployers from "./pages/EmployerPages/viewEmployers";
import CurrentPlan from "./pages/EmployerPages/currentPlan";
import ProfileLayout from "./components/layout/profileLayout";
import ApiKey from "./pages/EmployerPages/apiKey";
import Education from "./pages/CandidatePages/education";
import Experience from "./pages/CandidatePages/experience";
import Skill from "./pages/CandidatePages/skill";
import Resume from "./pages/CandidatePages/resume";
import OverviewEmployer from "./pages/EmployerPages/overviewEmployer";
import CandidateView from "./pages/EmployerPages/CandidateView";
import KYCVerification from "./pages/KYCVerification";
import CandidateProdecure from "./pages/Candidate_Prodecure";
import PlansCandidate from "./pages/plansCandidate";
import LDPCA from "./pages/LDPCA.js";

const App = () => {
  const {
    token,
    type,
    profile,
    dispatch,
    initialFetching,
    subscriptionDetails,
  } = useContext(AuthContext);
  console.log(profile);
  useEffect(() => {
    initialFetch(dispatch);
  }, []);

  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: { staleTime: "Infinity" },
      },
    })
  );

  return (
    <div>
      <QueryClientProvider client={queryClient.current}>
        {/* Protected Routes */}
        {initialFetching ? (
          <Routes>
            <Route>
              <Route path="*" element={<LoadingPage />} />
            </Route>
          </Routes>
        ) : (
          <Layout>
            <Routes>
              <>
                {token ? (
                  type === "EMPLOYEE" ? (
                    <Route>
                      {/* Token & EMPLOYEE */}
                      <Route path="/" element={<Home />} />
                      <Route path="/editprofile" element={<EditProfile />} />
                      <Route path="/uploadresume" element={<ResumeUpload />} />
                      <Route
                        path="/filesupload/:jobId"
                        element={<FilesUpload />}
                      />

                      
                    <Route
                        path="/Get-Verified"
                        element={<CandidateProdecure />}
                      />  

                      <Route path="/dei/:jobId" element={<EmployeeDei />} />
                      <Route
                        path="/deiquiz/:jobId"
                        element={<EmployeeDeiQuiz />}
                      />
                      <Route path="/jobslots/:jobId" element={<JobSlots />} />
                      <Route path="/schedule" element={<CandidateSchedule />} />
                      <Route
                        path="/kyc-verification"
                        element={<KYCVerification />}
                      />

                      <Route
                        path="/Candidate-Plan"
                        element={<PlansCandidate />}
                      />

                      {/* Dashboard Subroutes */}
                      <Route path="/dashboard" element={<Outlet />}>
                        <Route element={<DashboardLayout />}>
                          <Route index element={<JobApplied />} />
                          <Route path="interview" element={<Interview />} />
                          <Route
                            path="onboarding"
                            element={<JobOnboarding />}
                          />
                          <Route
                            path="jobsrejected"
                            element={<JobRejected />}
                          />
                        </Route>
                      </Route>

                      {/* Profile Subroutes */}
                      <Route path="/profile" element={<Outlet />}>
                        <Route element={<ProfileLayout />}>
                          <Route index element="" />
                          <Route path="education" element={<Education />} />
                          <Route path="experience" element={<Experience />} />
                          <Route path="skill" element={<Skill />} />
                          <Route path="resume" element={<Resume />} />
                        </Route>
                      </Route>
                    </Route>
                  ) : (
                    <Route>
                      {/* Token & EMPLOYER */}
                      <Route path="/editprofile" element={<EditProfile />} />
                      <Route path="/job/:jobId" element={<JobPage />} />
                      <Route path="/jobs" element={<Jobs />} />
                      <Route path="/editjob/:jobId" element={<EditJob />} />
                      <Route
                        path="/createcompany"
                        element={<CreateCompany />}
                      />
                      <Route
                        path="/editcompany/:companyId"
                        element={<CreateCompany />}
                      />
                      <Route path="/jobpost" element={<JobPost />} />
                      <Route
                        path="/jobquestions/:jobId"
                        element={<Jobquestion />}
                      />
                      <Route
                        path="/onboardingquestions/:jobId"
                        element={<Onboardingquestion />}
                      />
                      <Route
                        path="/jobcandidates/:jobId"
                        element={<Jobcandidates />}
                      />
                      <Route
                        path="/onboardingcandidates/:jobId"
                        element={<Onboardingcandidates />}
                      />
                      <Route
                        path="/videoupload/:jobId"
                        element={<VideoUpload />}
                      />
                      <Route path="/dei/:jobId" element={<EmployerDei />} />
                      <Route
                        path="/dei/:jobId/:employeeId"
                        element={<EmployeeJobDei />}
                      />
                      <Route path="/slots/:jobId" element={<Slots />} />
                      <Route
                        path="/slotcandidates/:jobId"
                        element={<SlotCandidates />}
                      />
                      <Route
                        path="/kyc-verification"
                        element={<KYCVerification />}
                      />


                      {/* Dashboard Subroutes */}
                      <Route path="/dashboard" element={<Outlet />}>
                        <Route element={<DashboardLayout />}>
                          <Route index element={<EmployerCompany />} />
                          <Route path="postedjob" element={<PostedJob />} />
                          <Route
                            path="employerinterview"
                            element={<EmployerInterview />}
                          />
                          <Route
                            path="jobonboarding"
                            element={<OnboardingPage />}
                          />
                          <Route
                            path="candidatesearch"
                            element={<CandidateSearch />}
                          />

                          
                        </Route>
                      </Route>

                      {/* Profile Subroutes */}
                      <Route path="/profile" element={<Outlet />}>
                        <Route element={<ProfileLayout />}>
                          <Route index element={<OverviewEmployer />} />
                          <Route
                            path="viewemployers"
                            element={<ViewEmployers />}
                          />
                          <Route path="addemployer" element={<AddEmployer />} />
                          <Route path="apikey" element={<ApiKey />} />
                          <Route path="currentplan" element={<CurrentPlan />} />
                        </Route>
                      </Route>
                    </Route>
                  )
                ) : (
                  <Route>
                    {/* No Token */}
                    <Route path="/signin" element={<Auth type={"Signin"} />} />
                    <Route
                      path="/register"
                      element={<Auth type={"Register"} />}
                    />
                  </Route>
                )}
<Route path="/candidateview/:id" element={<CandidateView/>}/>
                {/* Unprotected Routes */}
                <Route>
                  <Route
                    exact
                    path="/linkedin"
                    element={<LinkedInCallback />}
                  />
                  <Route path="/" element={<Home />} />
                  <Route path="/verify" element={<Verify />} />
                  <Route path="/job/:jobId" element={<JobPage />} />
                  <Route path="/jobs" element={<Jobs />} />
                  <Route path="/company" element={<Company />} />
                  <Route path="/category" element={<Category />} />
                  <Route path="/aboutus" element={<Aboutus />} />
                  <Route path="/knowledgebase" element={<KnowledgeBase />} />
                  <Route path="/faq" element={<Faq />} />
                  <Route path="/plans" element={<Plans />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/ldpca" element={<LDPCA />} />
                  <Route path="/cookies" element={<Cookies />} />
                  <Route path="/privacypolicy" element={<PrivacyPolicy />} />
                  <Route path="/disclaimer" element={<Disclaimer />} />
                  <Route path="/termsofservice" element={<TermsOfService />} />
                  <Route path="/dei" element={<Dei />} />
                  <Route path="/apidocs" element={<Apidocs />} />
                  <Route path="/resetpassword" element={<ForgetPassword />} />
                  <Route path="*" element={<Page404 />} />
                </Route>
              </>
            </Routes>
          </Layout>
        )}

        <ToastContainer
          position="top-center"
          autoClose={2000}
          limit={1}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </QueryClientProvider>
    </div>
  );
};

export default App;
