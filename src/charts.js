import BarChart from "./components/charts/BarChart";
import Select from "react-select";
import { useState } from "react";
import { DateRange } from "@mui/icons-material";
//import DatePicker from 'react-datepicker'
let charts = [
  { value: "בר", label: "בר" },
  { value: "גרף", label: "גרף" },
];
let isData = false;

const Page = () => {
  let [dateRange, setDateRange] = useState({ startDate: "", endDate: "" });
  let [chartType, setChartType] = useState();
  let [chartData, setChartData] = useState();

  let path = "https://gatavigdorapi.herokuapp.com";

  const fetchData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      type: 1,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${path}/api/updateSpacielOrders`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        return result;
      })
      .then((result) => JSON.parse(result))
      .then((result) => {
        console.log(result);
        return result;
      })
      .then((result) => {
        let data = [];
        result.data.forEach((element) => {
          let thisDate = new Date(element.date);
          let endDate = new Date(dateRange.endDate);
          let startDate = new Date(dateRange.startDate);
          //   console.log(
          //     `DATE RANGE ${JSON.stringify(
          //       DateRange
          //     )} \n this date ${thisDate.getTime()}\n end date ${endDate.getTime()} \n start date ${startDate.getTime()}`
          //   );
          if (
            thisDate.getTime() >= startDate.getTime() &&
            thisDate.getTime() <= endDate.getTime()
          ) {
            console.log("pass if 1!!!");
            console.log(chartType);
            data.push(element);
          }
        });
        console.log("dataaaaaa", data);
        return data;
      })
      .then((data) => {
        setChartData({
          labels: data.map((row) => row.date.getDay()),
          datasets: [
            {
              label: "כמות ליום",
              data: data.map((row) => row.Quantity),
            },
          ],
        });
        console.log(chartData);
      })
      .catch((error) => console.log("error", error));
  };

  const handleChartType = (e) => {
    console.log(e);
    setChartType(e);
  };

  const handleDate = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setDateRange((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div>
      <div>
        <Select
          //   styles={colorStyles}
          className="drop-select"
          name="chartName"
          onChange={handleChartType}
          options={charts}
          placeholder="בחר טבלה..."
        />
      </div>

      <input
        name="endDate"
        type="date"
       
        onChange={handleDate}
        placeholder="תאריך סיום"
      />
      <input
        name="startDate"
        type="date"
        onChange={handleDate}
        placeholder="תאריך התחלה"
      />

      {chartData && <BarChart data={chartData} />}

      <button onClick={fetchData}>הפק</button>
    </div>
  );
};
export default Page;
