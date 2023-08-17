import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import {
  Sidebar,
  Menu,
  MenuItem,
  useProSidebar,
  SubMenu,
} from "react-pro-sidebar";
import { useSearchParams } from "react-router-dom";
import SubHeading1 from "../components/common/SubHeading1/subHeading1";
import useWindow from "../hooks/useWindow";
import { getApikey, postApikey } from "../apicalls";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import ActionButton from "../components/common/ActionButton/actionButton";

const EmployeeEndpoints = [
  {
    type: "GET",
    name: "Profile",
    url: "/employee/data/",
    exampleRequest: {},
    exampleResponse: {
      id: 96,
      first_name: "Test",
      last_name: "Test",
      email: "example@outlook.com",
      date_of_birth: null,
      user_type: "EMPLOYEE",
      gender: "MALE",
      image: "",
      contact_number: "",
      description: "",
      country: "Afghanistan",
      state: "Samangan",
      city: "",
      locality: "",
      public: true,
      race: null,
      sexual_orientation: null,
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description:
      "This endpoint retrieves the profile of an employee by valid token.",
    params: [],
  },
  {
    type: "PATCH",
    name: "Profile",
    url: "/employee/data/",
    exampleRequest: {
      first_name: "Test",
      last_name: "Test",
    },
    exampleResponse: {
      data: "",
      status: 201,
      statusText: "Created",
      headers: {
        "content-language": "en-us",
        "content-length": "0",
      },
      config: {
        transitional: {
          silentJSONParsing: true,
          forcedJSONParsing: true,
          clarifyTimeoutError: false,
        },
      },
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Edit profile",
    params: [
      {
        name: "<any key>",
        desc: "Value of the key being changed",
      },
    ],
  },
  {
    type: "GET",
    name: "Education",
    url: "/employee/education/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 23,
        education_type: "ABC Course",
        starting_year: "2015",
        completion_year: "2019",
        starting_month: "JANUARY",
        completion_month: "JANUARY",
        ongoing: false,
        institute: "ABC Institute",
        percentage: null,
        cgpa: "9.2",
        user: 96,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get education details",
    params: [],
  },
  {
    type: "POST",
    name: "Education",
    url: "/employee/education/",
    exampleRequest: {
      education_type: "ABC Course",
      starting_year: "2015",
      completion_year: "2019",
      starting_month: "JANUARY",
      completion_month: "JANUARY",
      ongoing: "N",
      institute: "ABC Institute",
      cgpa: "9.2",
    },
    exampleResponse: {
      message: "successful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Create education detail",
    params: [],
  },
  {
    type: "PATCH",
    name: "Education",
    url: "/employee/education/:id",
    exampleRequest: {
      starting_year: "2017",
      completion_year: "2020",
    },
    exampleResponse: {
      id: 23,
      education_type: "ABC Course",
      starting_year: "2017",
      completion_year: "2020",
      starting_month: "JANUARY",
      completion_month: "JANUARY",
      ongoing: false,
      institute: "ABC Institute",
      percentage: null,
      cgpa: "9.2",
      user: 96,
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Edit education detail",
    params: [
      {
        name: "<any key>",
        desc: "Value of the key being changed",
      },
    ],
  },
  {
    type: "DELETE",
    name: "Education",
    url: "/employee/education/:id",
    exampleRequest: {},
    exampleResponse: {
      data: "",
      status: 204,
      statusText: "No Content",
      headers: {
        "content-language": "en-us",
      },
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Delete education detail",
    params: [],
  },
  {
    type: "GET",
    name: "Experience",
    url: "/employee/experience/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 64,
        ongoing: false,
        job_title: "App Dev",
        company_name: "ABC Company",
        country: "",
        state: "",
        city: "",
        description: "",
        starting_year: "2021",
        completion_year: "2022",
        starting_month: "NOVEMBER",
        completion_month: "DECEMBER",
        user: 96,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get experience details",
    params: [],
  },
  {
    type: "POST",
    name: "Experience",
    url: "/employee/experience/",
    exampleRequest: {
      job_title: "App Dev",
      company_name: "ABC Company",
      starting_year: "2021",
      completion_year: "2022",
      starting_month: "NOVEMBER",
      completion_month: "DECEMBER",
    },
    exampleResponse: {
      message: "successful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Create experience detail",
    params: [],
  },
  {
    type: "PATCH",
    name: "Experience",
    url: "/employee/experience/:id",
    exampleRequest: {
      job_title: "Web Dev",
    },
    exampleResponse: {
      id: 23,
      job_title: "Web Dev",
      company_name: "ABC Company",
      starting_year: "2021",
      completion_year: "2022",
      starting_month: "NOVEMBER",
      completion_month: "DECEMBER",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Edit experience detail",
    params: [
      {
        name: "<any key>",
        desc: "Value of the key being changed",
      },
    ],
  },
  {
    type: "DELETE",
    name: "Experience",
    url: "/employee/experience/:id",
    exampleRequest: {},
    exampleResponse: {
      data: "",
      status: 204,
      statusText: "No Content",
      headers: {
        "content-language": "en-us",
      },
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Delete experience detail",
    params: [],
  },
  {
    type: "GET",
    name: "Skill",
    url: "/employee/skill/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 458,
        user: {
          id: 96,
          first_name: "Test",
          last_name: "Test",
          email: "risavsarkar@outlook.com",
          date_of_birth: null,
          user_type: "EMPLOYEE",
          gender: "MALE",
          image: "",
          contact_number: "7676767676",
          description: "",
          country: "American Samoa",
          state: "Devoll District",
          city: "Aībak",
          locality: "",
          public: true,
          race: null,
          sexual_orientation: null,
        },
        description: "Skill A",
        skill_level: "BEGINNER",
        year_of_experience: 2,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get skill details",
    params: [],
  },
  {
    type: "POST",
    name: "Skill",
    url: "/employee/skill/",
    exampleRequest: {
      description: "Skill A",
      skill_level: "BEGINNER",
      year_of_experience: "2",
    },
    exampleResponse: {
      message: "successful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Create skill detail",
    params: [],
  },
  {
    type: "PATCH",
    name: "Skill",
    url: "/employee/experience/:id",
    exampleRequest: {
      year_of_experience: "3",
    },
    exampleResponse: {
      id: 23,
      description: "Skill A",
      skill_level: "BEGINNER",
      year_of_experience: "2",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Edit skill detail",
    params: [
      {
        name: "<any key>",
        desc: "Value of the key being changed",
      },
    ],
  },
  {
    type: "DELETE",
    name: "Skill",
    url: "/employee/skill/:id",
    exampleRequest: {},
    exampleResponse: {
      data: "",
      status: 204,
      statusText: "No Content",
      headers: {
        "content-language": "en-us",
      },
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Delete skill detail",
    params: [],
  },
  {
    type: "GET",
    name: "Resume",
    url: "/employee/resume/",
    exampleRequest: {},
    exampleResponse: {
      id: 136,
      date_of_upload: "2023-03-22T09:04:02.642819Z",
      resume:
        "https://atsstoragers.blob.core.windows.net/media/resumes/Healthcare-portal-hiringghana.pdf?se=2023-03-22T11%3A06%3A08Z&sp=r&spr=https&sv=2021-08-06&sr=b&sig=uFVcldEqkqH/UEeLFIThl0xjaH4atlQqNCRFFvtP3Go%3D",
      employee: 96,
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get skill details",
    params: [],
  },
  {
    type: "POST",
    name: "Resume",
    url: "/employee/upload-resume/",
    exampleRequest: {},
    exampleResponse: {
      name: "filename",
      email: null,
      mobile_number: null,
      skills: ["React.js", "Backend", "Technologies", "Django"],
      college_name: null,
      degree: null,
      designation: null,
      experience: ["Comp A", "Comp B"],
      company_names: null,
      no_of_pages: 1,
      total_experience: 0,
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "Content-Type",
        value: "multipart/form-data",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description:
      "This endpoint is used to upload the resume of the employee in these file formats - .pdf, .docx, and .txt and the request is being send as form data",
    params: [
      {
        name: "file",
        desc: "In formdata add file to 'file' key",
      },
    ],
  },
  {
    type: "DELETE",
    name: "Resume",
    url: "/employee/delete-resume/:id",
    exampleRequest: {},
    exampleResponse: {
      data: "",
      status: 204,
      statusText: "No Content",
      headers: {
        "content-language": "en-us",
      },
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Delete resume",
    params: [],
  },
  {
    type: "GET",
    name: "Interview Slots",
    url: "/calender/slotbyjob/:jobId",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 14,
        job: "...",
        link: "https://meet.google.com/dgt-tgei-xyz",
        datetime: "2023-03-25T09:00:00Z",
        is_available: true,
        timezone: "Asia/Calcutta",
        employer: 39,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get interview slots for the job",
    params: [],
  },
  {
    type: "POST",
    name: "Book Slot",
    url: "/calender/schedule/",
    exampleRequest: {
      slot: 14,
    },
    exampleResponse: {
      message: "successful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Book interview slot",
    params: [
      {
        name: "slot",
        desc: "Slot ID",
      },
    ],
  },
  {
    type: "GET",
    name: "Interview Schedule",
    url: "/calender/myschedule/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 8,
        slot: {
          id: 14,
          job: "...",
          link: "https://meet.google.com/dgt-tgei-xyz",
          datetime: "2023-03-25T09:00:00Z",
          is_available: false,
          timezone: "Asia/Calcutta",
          employer: 39,
        },
        candidate: "...",
        date_created: "2023-03-22T09:18:50.613957Z",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get the entire schedule for job interviews of the employee",
    params: [],
  },
  {
    type: "POST",
    name: "Job Apply",
    url: "/jobs/currentjobs/",
    exampleRequest: {
      job: "2",
      responses: [
        {
          q_id: "1",
          answer: "answer1",
        },
        {
          q_id: "2",
          answer: "answer2",
        },
      ],
      resume: "111",
    },
    exampleResponse: {
      message: "seccessful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Apply to job",
    params: [
      {
        name: "job",
        desc: "Job ID",
      },
      {
        name: "responses",
        desc: "Array of objects having 'q_id' and 'answer' key for question ID and answer text",
      },
      {
        name: "resume",
        desc: "Resume ID",
      },
    ],
  },
  {
    type: "GET",
    name: "Job Applications",
    url: "/calender/slotbyjob/:jobId",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 7,
        employee: "...",
        job: "...",
        status: "ACCEPTED",
        date_created: "2023-02-27T10:49:19.202523Z",
        score: "50.00",
        resume: 111,
      },
      {
        id: 11,
        employee: "...",
        job: "...",
        status: "PENDING",
        date_created: "2023-03-01T11:32:33.004240Z",
        score: "0.00",
        resume: 111,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get all job applications",
    params: [],
  },
  {
    type: "GET",
    name: "Job Score",
    url: "/employee/get-score/:jobId",
    exampleRequest: {},
    exampleResponse: {
      score: 50,
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get all jobs",
    params: [],
  },
  {
    type: "GET",
    name: "Onboarding Video",
    url: "/employer/onboarding/video/:jobId",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 2,
        video:
          "https://atsstoragers.blob.core.windows.net/media/media/onboarding/sample_KgFx8pH.mp4?se=2023-03-22T11%3A38%3A04Z&sp=r&spr=https&sv=2021-08-06&sr=b&sig=zyYX6adApPUNmAMFAulsszWcN72FQH2bymcqBH9ofVI%3D",
        created_at: "2023-02-25T16:04:02.759619Z",
        job: 7,
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    description: "Get onboarding videos of the job",
    params: [],
  },
  {
    type: "POST",
    name: "Onboarding Quiz",
    url: "/employer/onboarding/candidate-response-by-job/:jobId",
    exampleRequest: [
      {
        question: "8",
        response_text: "answer",
      },
      {
        question: "10",
        response_text: "a",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    exampleResponse: {
      message: "successful",
    },
    description: "Upload onboarding quiz responses",
    params: [],
  },
  {
    type: "GET",
    name: "Onboarding Files",
    url: "/employer/onboarding/file/?employee=:employeeId&job=:jobId",
    exampleRequest: {},
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    exampleResponse: [
      {
        id: 5,
        employee: "...",
        job: "...",
        file_type: "4",
        file: "https://atsstoragers.blob.core.windows.net/media/onboardingfiles/Healthcare-portal-hiringghana.pdf",
        created_at: "2023-03-22T10:51:58.215147Z",
      },
    ],
    description: "Get onboarding files",
    params: [],
  },
  {
    type: "GET",
    name: "Onboarding File Types",
    url: "/employer/onboarding/filetype/:jobId",
    exampleRequest: {},
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    exampleResponse: [
      {
        id: 4,
        job: "...",
        types: "test",
      },
      {
        id: 5,
        job: "...",
        types: "test2,test3",
      },
    ],
    description: "Get onboarding file types",
    params: [],
  },
  {
    type: "POST",
    name: "Onboarding Files",
    url: "/employer/onboarding/file/",
    exampleRequest: {
      FormData: ["file", "job", "file_type"],
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "Content-Type",
        value: "multipart/form-data",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    exampleResponse: {
      message: "successful",
    },
    description: "Upload onboarding files",
    params: [
      {
        name: "file",
        desc: "File",
      },
      {
        name: "job",
        desc: "Job ID",
      },
      {
        name: "file_type",
        desc: "File type ID",
      },
    ],
  },
  {
    type: "GET",
    name: "DEI Quiz",
    url: "/dei/questions/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 2,
        question_text: "Question 1",
        question_answers: "answer",
      },
      {
        id: 4,
        question_text: "Question 2",
        question_answers: "answer",
      },
      {
        id: 5,
        question_text: "Question 3",
        question_answers: "answer",
      },
    ],
    description: "Get DEI quiz questions",
    params: [],
  },
  {
    type: "POST",
    name: "DEI Quiz",
    url: "/dei/answers/",
    exampleRequest: [
      {
        question: "2",
        answer: "answer",
        job: "7",
      },
      {
        question: "3",
        answer: "answer",
        job: "7",
      },
      {
        question: "4",
        answer: "answer",
        job: "7",
      },
    ],
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      {
        name: "apikey",
        value: "<value>",
      },
    ],
    exampleResponse: {
      message: "successful",
    },
    description: "Upload DEI quiz answers",
    params: [
      {
        name: "question",
        desc: "Question ID",
      },
      {
        name: "job",
        desc: "Job ID",
      },
      {
        name: "answer",
        desc: "Answer of the question by id",
      },
    ],
  },
];

const EmployerEndpoints = [
  {
    type: "GET",
    name: "Job",
    url: "/jobs/employer-job-list/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Get all jobs created by an employer",
    params: [],
  },
  {
    type: "POST",
    name: "Job",
    url: "/jobs/employer-job-list/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Create a job",
    params: [],
  },
  {
    type: "PATCH",
    name: "Job",
    url: "/jobs/employer-job-list/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Edit a job",
    params: [],
  },
  {
    type: "DELETE",
    name: "Job",
    url: "/jobs/employer-job-list/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Delete a job",
    params: [],
  },
  {
    type: "POST",
    name: "Questions",
    url: "/employer/question/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Post list of questions",
    params: [],
  },
  {
    type: "PATCH",
    name: "Questions",
    url: "/employer/question/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Edit question by ID",
    params: [],
  },
  {
    type: "GET",
    name: "Questions",
    url: "/employer/question-by-job/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Get questions by job ID",
    params: [],
  },
  {
    type: "POST",
    name: "Candidate Status",
    url: "/employer/candidate-status-change/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description:
      "Change candidate status - Accepted, Rejected, Interview, Onboarding",
    params: [],
  },
  {
    type: "GET",
    name: "Company",
    url: "/employer/company/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Get all companies created by an employer",
    params: [],
  },
  {
    type: "POST",
    name: "Company",
    url: "/employer/company/",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Create a company",
    params: [],
  },
  {
    type: "PATCH",
    name: "Company",
    url: "/employer/company/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Edit a company",
    params: [],
  },
  {
    type: "DELETE",
    name: "Company",
    url: "/employer/company/:id",
    exampleRequest: {},
    exampleResponse: {},

    headers: [],
    description: "Delete a company",
    params: [],
  },
  {
    type: "GET",
    name: "Interview Slots",
    url: "/calender/slotbyjob/:jobId",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 14,
        job: "...",
        link: "https://meet.google.com/dgt-tgei-xyz",
        datetime: "2023-03-25T09:00:00Z",
        is_available: true,
        timezone: "Asia/Calcutta",
        employer: 39,
      },
    ],

    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      { name: "apikey", value: "<value>" },
    ],
    description: "Get interview slots for the job",
    params: [],
  },
  {
    type: "POST",
    name: "Interview Slot",
    url: "/calender/slotbyjob/",
    exampleRequest: {
      job: "7",
      datetime: "2023-03-25 09:00:00",
      link: "https://meet.google.com/dgt-tgei-xyz",
      timezone: "Asia/Calcutta",
    },
    exampleResponse: {
      message: "successful",
    },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      { name: "apikey", value: "<value>" },
    ],
    description: "Book interview slot",
    params: [
      {
        name: "job",
        desc: "Job ID for the slot",
      },
      {
        name: "datetime",
        desc: "Date and time in the format 'yyyy-mm-dd hh-mm-ss'",
      },
      {
        name: "link",
        desc: "Meeting link",
      },
      {
        name: "timezone",
        desc: "Timezone for the job",
      },
    ],
  },
  {
    type: "DELETE",
    name: "Interview Slot",
    url: "/calender/slot/:slotID",
    exampleRequest: {},
    exampleResponse: { message: "successful" },
    headers: [
      {
        name: "Authorization",
        value: "Token <token>",
      },
      { name: "apikey", value: "<value>" },
    ],
    description: "Delete interview slot",
    params: [],
  },
];

const CommonEndpoints = [
  {
    type: "GET",
    name: "Job List",
    url: "/jobs/job-list/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 2,
        question_set: [
          {
            id: 1,
            question_text: "Where do you see yourself in 5 year ?",
            question_answers: "",
            question_type: "TEXT",
            question_category: "A",
            job: 2,
          },
          {
            id: 2,
            question_text: "What are your expectations ?",
            question_answers: "",
            question_type: "TEXT",
            question_category: "O",
            job: 2,
          },
        ],
        company: {
          id: 1,
          name: "TechMax pvt ltd",
          description: "Sample company",
          reg_no: "345436546",
          country: "Austria",
          state: "Carinthia",
          city: "Dellach",
          pin: "4544554",
          logo: "",
          is_active: true,
          posted_by: 4,
        },
        title: "Sr data Entry operator",
        description: "This is a sample job",
        created_at: "2023-01-17T20:58:01.094506Z",
        is_active: true,
        expiry_date: "2023-02-11",
        is_remote: false,
        salary_min: 1200,
        salary_max: 60000,
        country: "Djibouti",
        state: "Dikhil Region",
        city: "Gâlâfi",
        pin: "345345",
        skills: "Java,",
        term: "",
        job_type: "Freelance",
        vacancy: 7,
        timezone: "America/Argentina/Tucuman",
        posted_by: 4,
        category: 2,
      },
      {
        id: 3,
        question_set: [
          {
            id: 3,
            question_text: "Question 1",
            question_answers: "Op1,Op2,Op3",
            question_type: "MCQ",
            question_category: "A",
            job: 3,
          },
          {
            id: 4,
            question_text: "Question 2",
            question_answers: "",
            question_type: "TEXT",
            question_category: "A",
            job: 3,
          },
        ],
        company: {
          id: 3,
          name: "Infitech",
          description: "Afsaf afasf asfsa",
          reg_no: "12345",
          country: "Armenia",
          state: "Vayots Dzor Region",
          city: "Zarrit’ap’",
          pin: "10000",
          logo: "",
          is_active: true,
          posted_by: 9,
        },
        title: "Frontend Dev",
        description: "awfasf fsaafa",
        created_at: "2023-01-18T04:26:34.947129Z",
        is_active: true,
        expiry_date: "2023-05-05",
        is_remote: true,
        salary_min: 50000,
        salary_max: 60000,
        country: "Afghanistan",
        state: "Badakhshan",
        city: "Ashkāsham",
        pin: "10000",
        skills: "Javascript,Engineering,Database,Java,Python,Ruby",
        term: "",
        job_type: "Full Time",
        vacancy: 5,
        timezone: "Africa/Abidjan",
        posted_by: 9,
        category: 7,
      },
    ],
    headers: [{ name: "apikey", value: "<value>" }],
    description: "Get all jobs",
    params: [],
  },
  {
    type: "GET",
    name: "Job By ID",
    url: "/jobs/job-list/:id",
    exampleRequest: {},
    exampleResponse: {
      id: 2,
      question_set: [
        {
          id: 1,
          question_text: "Where do you see yourself in 5 year ?",
          question_answers: "",
          question_type: "TEXT",
          question_category: "A",
          job: 2,
        },
        {
          id: 2,
          question_text: "What are your expectations ?",
          question_answers: "",
          question_type: "TEXT",
          question_category: "O",
          job: 2,
        },
      ],
      company: {
        id: 1,
        name: "TechMax pvt ltd",
        description: "Sample company",
        reg_no: "345436546",
        country: "Austria",
        state: "Carinthia",
        city: "Dellach",
        pin: "4544554",
        logo: "",
        is_active: true,
        posted_by: 4,
      },
      title: "Sr data Entry operator",
      description: "This is a sample job",
      created_at: "2023-01-17T20:58:01.094506Z",
      is_active: true,
      expiry_date: "2023-02-11",
      is_remote: false,
      salary_min: 1200,
      salary_max: 60000,
      country: "Djibouti",
      state: "Dikhil Region",
      city: "Gâlâfi",
      pin: "345345",
      skills: "Java,",
      term: "",
      job_type: "Freelance",
      vacancy: 7,
      timezone: "America/Argentina/Tucuman",
      posted_by: 4,
      category: 2,
    },
    headers: [{ name: "apikey", value: "<value>" }],
    description: "Get job data by id",
    params: [],
  },
  {
    type: "GET",
    name: "Job Search",
    url: "/jobs/job-list/?location=''&category=''&salary_min=''&salary_max=''&search=''",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 2,
        question_set: [
          {
            id: 1,
            question_text: "Where do you see yourself in 5 year ?",
            question_answers: "",
            question_type: "TEXT",
            question_category: "A",
            job: 2,
          },
          {
            id: 2,
            question_text: "What are your expectations ?",
            question_answers: "",
            question_type: "TEXT",
            question_category: "O",
            job: 2,
          },
        ],
        company: {
          id: 1,
          name: "TechMax pvt ltd",
          description: "Sample company",
          reg_no: "345436546",
          country: "Austria",
          state: "Carinthia",
          city: "Dellach",
          pin: "4544554",
          logo: "",
          is_active: true,
          posted_by: 4,
        },
        title: "Sr data Entry operator",
        description: "This is a sample job",
        created_at: "2023-01-17T20:58:01.094506Z",
        is_active: true,
        expiry_date: "2023-02-11",
        is_remote: false,
        salary_min: 1200,
        salary_max: 60000,
        country: "Djibouti",
        state: "Dikhil Region",
        city: "Gâlâfi",
        pin: "345345",
        skills: "Java,",
        term: "",
        job_type: "Freelance",
        vacancy: 7,
        timezone: "America/Argentina/Tucuman",
        posted_by: 4,
        category: 2,
      },
      {
        id: 3,
        question_set: [
          {
            id: 3,
            question_text: "Question 1",
            question_answers: "Op1,Op2,Op3",
            question_type: "MCQ",
            question_category: "A",
            job: 3,
          },
          {
            id: 4,
            question_text: "Question 2",
            question_answers: "",
            question_type: "TEXT",
            question_category: "A",
            job: 3,
          },
        ],
        company: {
          id: 3,
          name: "Infitech",
          description: "Afsaf afasf asfsa",
          reg_no: "12345",
          country: "Armenia",
          state: "Vayots Dzor Region",
          city: "Zarrit’ap’",
          pin: "10000",
          logo: "",
          is_active: true,
          posted_by: 9,
        },
        title: "Frontend Dev",
        description: "awfasf fsaafa",
        created_at: "2023-01-18T04:26:34.947129Z",
        is_active: true,
        expiry_date: "2023-05-05",
        is_remote: true,
        salary_min: 50000,
        salary_max: 60000,
        country: "Afghanistan",
        state: "Badakhshan",
        city: "Ashkāsham",
        pin: "10000",
        skills: "Javascript,Engineering,Database,Java,Python,Ruby",
        term: "",
        job_type: "Full Time",
        vacancy: 5,
        timezone: "Africa/Abidjan",
        posted_by: 9,
        category: 7,
      },
    ],
    headers: [{ name: "apikey", value: "<value>" }],
    description: "Get jobs by filter",
    params: [
      {
        name: "search",
        desc: "Search term",
      },
      {
        name: "location",
        desc: "Name of country",
      },
      {
        name: "category",
        desc: "Category Id",
      },
      {
        name: "salary_min",
        desc: "Salary lower range in number",
      },
      {
        name: "salary_max",
        desc: "Salary upper range in number",
      },
    ],
  },
  {
    type: "GET",
    name: "Categories",
    url: "/jobs/categories/",
    exampleRequest: {},
    exampleResponse: [
      {
        id: 5,
        name: "Design and Creative",
        count: 0,
        health: false,
      },
      {
        id: 10,
        name: "Translation",
        count: 0,
        health: false,
      },
      {
        id: 4,
        name: "Data Science and Analysis",
        count: 1,
        health: false,
      },
    ],
    headers: [{ name: "apikey", value: "<value>" }],
    description: "Get all categories",
    params: [],
  },
];

const ReqType = ({ type }) => {
  return (
    <div
      className={`typeContainer ${
        type === "GET"
          ? "getrequest"
          : type === "POST"
          ? "postrequest"
          : type === "PATCH"
          ? "patchrequest"
          : type === "DELETE"
          ? "deleterequest"
          : ""
      }`}
    >
      <p>{type}</p>
    </div>
  );
};

const Apidocs = () => {
  const { token } = useContext(AuthContext);
  const { collapseSidebar } = useProSidebar();
  const { width } = useWindow();
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get("api");
  const [item, setItem] = useState("home");
  const [selectedItem, setSelectedItem] = useState(EmployeeEndpoints[0]);

  useEffect(() => {
    if (
      value?.includes("employee_") &&
      Number.isInteger(parseInt(value?.substring(9))) &&
      parseInt(value?.substring(9)) <= EmployeeEndpoints.length
    ) {
      setItem(value);
      setSelectedItem(EmployeeEndpoints[parseInt(value.substring(9))]);
      return;
    }

    if (
      value?.includes("employer_") &&
      Number.isInteger(parseInt(value?.substring(9))) &&
      parseInt(value?.substring(9)) <= EmployerEndpoints.length
    ) {
      setItem(value);
      setSelectedItem(EmployerEndpoints[parseInt(value.substring(9))]);
      return;
    }

    setItem("home");
    setSearchParams({ api: "home" });
  }, [value]);

  return (
    <div className="apidocsContainer">
      {width < 600 ? (
        <button onClick={() => collapseSidebar()} className="sidebarOpenBtn">
          <FontAwesomeIcon icon={faBars} />
          <p>Menu</p>
        </button>
      ) : null}

      <div className="apidocsContent">
        <Sidebar
          className="sidebar"
          collapsedWidth={0}
          defaultCollapsed={width < 600 ? true : false}
          width={300}
        >
          {width < 600 ? (
            <button
              onClick={() => {
                collapseSidebar();
              }}
              className="sidebarCloseBtn"
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          ) : null}

          <Menu>
            <MenuItem
              className={`menu ${item === `home` ? "sidebarItemSelected" : ""}`}
              onClick={() => {
                setSearchParams({ api: "home" });
                setItem("home");
              }}
            >
              <div className="sidebarContent">
                <p> Collar Hire API</p>
              </div>
            </MenuItem>

            {/* <SubMenu label="Employee Endpoints" className="menu">
              {EmployeeEndpoints.map((e, index) => {
                return (
                  <MenuItem
                    className={`sidebarItem ${
                      item === `employee_${index}` ? "sidebarItemSelected" : ""
                    }`}
                    onClick={() => {
                      setSearchParams({ api: `employee_${index}` });
                      setItem(`employee_${index}`);
                      setSelectedItem(e);
                      if (width < 600) collapseSidebar();
                    }}
                  >
                    <div className="menuBtnContainer">
                      <ReqType type={e.type} />
                      <p> {e.name}</p>
                    </div>
                  </MenuItem>
                );
              })}
            </SubMenu> */}

            <SubMenu label="Employer Endpoints" className="menu">
              {EmployerEndpoints.map((e, index) => {
                return (
                  <MenuItem
                    className={`sidebarItem ${
                      item === `employer_${index}` ? "sidebarItemSelected" : ""
                    }`}
                    onClick={() => {
                      setSearchParams({ api: `employer_${index}` });
                      setItem(`employer_${index}`);
                      setSelectedItem(e);
                      if (width < 600) collapseSidebar();
                    }}
                  >
                    <div className="menuBtnContainer">
                      <ReqType type={e.type} />
                      <p> {e.name}</p>
                    </div>
                  </MenuItem>
                );
              })}
            </SubMenu>

            {/* <SubMenu label="Common Endpoints" className="menu">
              {CommonEndpoints.map((e, index) => {
                return (
                  <MenuItem
                    className={`sidebarItem ${
                      item === `common_${index}` ? "sidebarItemSelected" : ""
                    }`}
                    onClick={() => {
                      setItem(`common_${index}`);
                      setSelectedItem(e);
                      if (width < 600) collapseSidebar();
                    }}
                  >
                    <div className="menuBtnContainer">
                      <ReqType type={e.type} />
                      <p> {e.name}</p>
                    </div>
                  </MenuItem>
                );
              })}
            </SubMenu> */}
          </Menu>
        </Sidebar>

        {item === "home" ? (
          <>
            <div className="homeContainer">
              <div className="header">
                <SubHeading1
                  text={"Welcome to Collar Hire API Documentation"}
                />

                <p className="desc">
                  {"This page will help you get started with Collar Hire API."}
                </p>
              </div>

              <div className="section">
                <p>Welcome to the Collar Hire API documentation 🚀</p>
                <p>
                  The Collar Hire API allows for building custom workflows
                  better suited to your needs.
                </p>
                <p>
                  This API and its documentation are a aimed to provide a subset
                  of the functionalities used by Collar Hire.
                </p>
                <>
                  <p>All API endpoints are rooted in</p>
                  <p className="urlContainer shadow">{`${process.env.REACT_APP_BASE_URL}`}</p>
                </>
              </div>

              <div className="section">
                <SubHeading1 text={"Contents"} />
                <p>We have three set of APIs - Employee, Employer & Common.</p>
                <p>Each of them are categorised into seperate dropdowns.</p>
                <p>For every endpoints, all the details are provided.</p>
              </div>
            </div>
          </>
        ) : (
          <div className="mainContentContainer">
            <div className="textContainer">
              <div className="header">
                <SubHeading1 text={selectedItem.name} />

                <p className="desc">{selectedItem.description}</p>
                <div className="urlContainer">
                  <div
                    className={`typeContainer ${
                      selectedItem.type === "GET"
                        ? "getrequest"
                        : selectedItem.type === "POST"
                        ? "postrequest"
                        : selectedItem.type === "PATCH"
                        ? "patchrequest"
                        : selectedItem.type === "DELETE"
                        ? "deleterequest"
                        : ""
                    }`}
                  >
                    <p>{selectedItem.type}</p>
                  </div>
                  <p className="url">{selectedItem.url}</p>
                </div>
              </div>

              <div>
                <h4>Params</h4>
                <div className="paramsContainer">
                  {selectedItem.params?.map((e) => {
                    return (
                      <div className="paramsCard shadow">
                        <p>{e.name}</p>
                        <p>{e.desc}</p>
                      </div>
                    );
                  })}
                  {!selectedItem?.params?.length && <p>None</p>}
                </div>
              </div>

              <div>
                <h4>Headers</h4>
                <div className="paramsContainer">
                  {selectedItem.headers?.map((e) => {
                    return (
                      <div className="paramsCard shadow">
                        <p>{e.name}</p>
                        <p>{e.value}</p>
                      </div>
                    );
                  })}
                  {!selectedItem?.headers?.length && <p>None</p>}
                </div>
              </div>
            </div>
            <div className="exampleContainer">
              <div>
                <h4>Request Body</h4>
                <pre className="codeContainer">
                  {JSON.stringify(selectedItem.exampleRequest, null, 2)}
                </pre>
              </div>

              <div>
                <h4>Response Body</h4>
                <pre className="codeContainer">
                  {JSON.stringify(selectedItem.exampleResponse, null, 2)}
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apidocs;
