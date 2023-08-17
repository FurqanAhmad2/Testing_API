import "./styles.css";
import React, { useEffect, useRef } from "react";
import Chart from "react-apexcharts";
import SubHeading1 from "../SubHeading1/subHeading1";

const BarChartContent = ({ title, data, color }) => {
  const options = {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      height: 200,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "30%",
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: data?.label,
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          // colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          // colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      // y: {
      //   formatter: function (val) {
      //     return "$" + val + " thousands";
      //   },
      // },
    },
    colors: color,
    grid: {
      borderColor: "#0000001a",
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };

  const series = [
    {
      name: title,
      data: data?.value,
    },
  ];

  return (
    <div className="chart shadow">
      <div className="statsHeader">
        <SubHeading1 text={title} />
      </div>
      <Chart type="bar" options={options} series={series} height={300} />
    </div>
  );
};

export default BarChartContent;
