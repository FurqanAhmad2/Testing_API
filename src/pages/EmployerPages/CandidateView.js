import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CandidateView = () => {
  const [candidateData, setCandidateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`https://collarhire-dev.blacksea-2f0849b1.westus.azurecontainerapps.io/employee/candidate-details/?id=${id}`)
      .then((response) => {
        setCandidateData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching candidate data:', error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading candidate data...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white mt-36 rounded shadow-md p-6 w-full sm:w-3/4 md:w-1/2 lg:w-2/3 xl:w-1/2">
        <h1 className="text-3xl font-semibold mb-4">Candidate Personal Information</h1>
        <div className="mb-6">
          <p><strong>First Name:</strong> {candidateData.personal.first_name}</p>
          <p><strong>Last Name:</strong> {candidateData.personal.last_name}</p>
          <p><strong>Email:</strong> {candidateData.personal.email}</p>
          <p><strong>Gender:</strong> {candidateData.personal.gender}</p>
          <p><strong>Country:</strong> {candidateData.personal.country}</p>
          <p><strong>State:</strong> {candidateData.personal.state}</p>
          <p><strong>City:</strong> {candidateData.personal.city}</p>
        </div>

        <h2 className="text-red-500 text-lg mb-3">Education</h2>
        {candidateData.education.length > 0 ? (
          <div>
            {candidateData.education.map((edu, index) => (
              <div className="bg-gray-50 rounded p-4 mb-3" key={index}>
                <p className="mb-1"><strong>Degree:</strong> {edu.degree}</p>
                <p className="mb-1"><strong>School:</strong> {edu.school}</p>
                <p className="mb-1"><strong>Year:</strong> {edu.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No education details available</p>
        )}

        <h2 className="text-lg mb-3">Experience</h2>
        {candidateData.experience.length > 0 ? (
          <div>
            {candidateData.experience.map((exp, index) => (
              <div className="bg-gray-50 rounded p-4 mb-3" key={index}>
                <p className="mb-1"><strong>Position:</strong> {exp.position}</p>
                <p className="mb-1"><strong>Company:</strong> {exp.company}</p>
                <p className="mb-1"><strong>Year:</strong> {exp.year}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No experience details available</p>
        )}
      </div>
    </div>
  );
};

export default CandidateView;
