import "./styles.css";
import React, { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";

const DonutChartContent = ({ title, subheading, data }) => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  const options = {
    chart: {
      type: "donut",
    },
    labels: labels,
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: "100%",
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  useEffect(() => {
    if (data?.length) {
      let arr1 = [];
      let arr2 = [];

      for (let i of data) {
        arr1.push(i.name === "ACCEPTED" ? "INTERVIEW" : i.name);
        arr2.push(i.value);
      }

      setSeries(arr2);
      setLabels(arr1);
    }
  }, [data]);

  return (
    <div className="donutChartContainer shadow">
      <p className="title1">{title}</p>
      <p className="title2">{subheading}</p>

      <div className="chartContainer">
        <Chart type="donut" options={options} series={series} height={300} />
      </div>
    </div>
  );
};

export default DonutChartContent;
