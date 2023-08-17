import { faComment, faWrench } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import FaqBtn from "../components/common/faqBtn";

const Faq = () => {
  const FaqData = [
    {
      question: "What Is Collar Hire Applicant Tracking System (ATS)?",
      answerList: [],
      answer:
        "An applicant tracking system, or ATS, is a software application that allows you to digitally handle every stage of the recruitment process. It can allow you to manage applications, parse CVs, and evaluate candidates at the click of the button. That is if you have the right one in place.",
      ending: "",
    },
    {
      question: "What Is an Applicant Tracking System In HR?",
      answerList: [],
      answer:
        "ATS system is important for HR, an effective and streamlined applicant tracking system is essential for the growth of your business. Not only are you able to find the right talent, but you are able to lead them through a seamless process that helps strengthen your employer brand and your attractiveness as a place to work.",
      ending:
        "In addition to that, having a strong ATS in place allows you to spend less time working on candidate management and more time on strategic initiatives. These can be things directly related to your employer value proposition, which will then strengthen your overall talent pool and ability to attract and retain the best employees.",
    },
    {
      question: "Why Pay for HirinGhana’s Applicant Tracking System?",
      answerList: [
        "Save candidate information along with detailed notes and tags",
        "Access colleague-provided feedback at any time (without chasing employees)",
        "Utilize templates to update candidates at each stage of the process",
        "Keep employee data safe and GDPR compliant",
        "Access up-to-the-moment analyses",
      ],
      answer:
        "For all of the reasons we listed before, and more. When you have an applicant tracking system in place, you can do more of the following:",
      ending:
        "All of these things can help reduce your time-to-hire, your cost-per-hire, and overall hiring cost because you can spend less time trying to handle manual processes and chasing documents, and more time relying on the system to help provide a foundation for growth. ",
    },
    {
      question: "How Does Collar HireApplicant Tracking System Work?",
      answerList: [],
      answer:
        "When it comes to cloud-based HR software, your ATS is centrally located for every employee and is as simple as logging in and clicking a few buttons. When you have the proper software in place, like Hiringhana’s, you have access to a dashboard that, at a glance, offers all of the information you need. This way, you can seamlessly keep an eye on candidates, which stage they are in, and what needs to happen next. It’s all available at a quick glance, and you can even turn candidates into employees at the click of a button.",
      ending: "",
    },
    {
      question: "Can Collar HireATS Improve Your Organization’s Talent?",
      answerList: [],
      answer:
        "Yes, our ATS will ensure that your jobs get in front of the right people, in the appropriate ways, and that they can have a great experience from the moment they hit ‘apply.’ This means you get stronger candidates in your pipeline, a higher level of talent at your organization, and a talent management system from the start. An applicant tracking system can be the first step. Learn more today about how Collar Hirecan help your core HR processes",
      ending: "",
    },
    {
      question: "Why Are ATS Applicant Tracking Systems Important?",
      answerList: [],
      answer:
        "ATS systems help ease the workload of recruiters and hiring managers, especially now that the internet makes it faster and easier than ever for job seekers to apply for jobs. In fact, job board sites like Indeed and LinkedIn allow job seekers to apply using a saved resume and only one click. While applicant tracking systems are not perfect, they are a good way for recruiters to efficiently home in on top candidates.",
      ending: "",
    },
    {
      question: "What can the Collar HireATS do for my Org?",
      answerList: [],
      answer:
        "ATS systems go beyond simple applicant tracking to offer communication, interview scheduling, and onboarding functionality. ATS also saves resumes for later. If an applicant isn’t the right fit, recruiters and hiring managers can search the system later to uncover resumes that match new positions. If you’ve ever been contacted months later by a company you applied to, an ATS was probably behind it.",
      ending: "",
    },
    {
      question: "How do you pass the Collar Hire applicant tracking system?",
      answerList: [
        "Customize your resume to the specific job posting you are applying for.",
        "List the important keywords and phrases in the job description and incorporate them into your resume.",
        "Include the long form of keywords with their acronym counterpart.",
        "Use the right formatting and font style.",
        "Avoid using tables, charts, images, graphics, headers, and footers. They will cause parsing errors in the ATS.",
      ],
      answer:
        "Here are things you need to do to pass applicant tracking systems:",
      ending: "",
    },
    {
      question: "Do all recruiters use ATS systems?",
      answerList: [],
      answer:
        "75% of recruiters use recruiting or applicant tracking software. 99% of Fortune 500 companies and around 60% of big companies use it.",
      ending: "",
    },
    {
      question: "What is the difference between a CRM and ATS?",
      answerList: [],
      answer:
        "The ATS automates the hiring process and serves as a database for job applicants. On the other hand, the CRM is an ecosystem where HR professionals can nurture both passive and active candidates and those who are already in the system as previous applicants.",
      ending: "",
    },

    {
      question: "Do small companies use ATS??",
      answerList: [],
      answer: "Around 35% of small organizations use ATS.",
      ending: "",
    },

    {
      question: "What resume format is best for Collar Hire ATS?",
      answerList: [],
      answer: "The easiest format for an ATS to read is reverse-chronological.",
      ending: "",
    },

    {
      question: "Is the Collar Hire applicant tracking system free?",
      answerList: [],
      answer:
        "Collar HireATS gives you a free demo for the first 21 days of subscription and tailor the costs to you based on your needs and feature request.",
      ending: "",
    },
  ];
  return (
    <>
      <div className="faqPageContainer">
        <div className="faqPageContent">
          <h2>FAQ</h2>

          <div className="faqBtnContainer">
            {FaqData.map((e) => {
              return <FaqBtn data={e} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
