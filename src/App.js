import React, { useState } from "react";
import "./App.css";
import dataset from "../src/dataset.json";
import Moment from "react-moment";

let dataSet = dataset;
let copyDataSet = [...dataset];
const statuses = ["COMPLETE", "INCOMPLETE", "ERROR"];

function App() {
  const [selectedStatuses, setSelectedStatuses] = useState([
    "COMPLETE",
    "INCOMPLETE",
    "ERROR",
  ]);

  const handleSelect = (status) => {
    const isSelected = selectedStatuses.includes(status);
    const newSelection = isSelected
      ? selectedStatuses.filter((currentStatus) => currentStatus !== status)
      : [...selectedStatuses, status];
    setSelectedStatuses(newSelection);
    dataSet = copyDataSet.filter((item) => newSelection.includes(item.status));
  };
  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">First name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Carrier</th>
            <th className="dropdown">
              <div
                className="dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Status
              </div>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton1"
                style={{ paddingLeft: 10 }}
              >
                {statuses.map((status, index) => (
                  <li key={index}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={() => handleSelect(status)}
                        checked={selectedStatuses.includes(status)}
                      />
                      <label className="form-check-label">
                        {status.charAt(0) + status.substring(1).toLowerCase()}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </th>
            <th scope="col">Data</th>
          </tr>
        </thead>
        <tbody>
          {dataSet.length > 0 &&
            dataSet.map((data, index) => (
              <tr key={index}>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.carrier}</td>
                <td>
                  {data.status === "COMPLETE" && (
                    <i
                      className="bi bi-check-circle-fill"
                      style={{ color: "green", fontSize: 20 }}
                    ></i>
                  )}
                  {data.status === "INCOMPLETE" && (
                    <i
                      className="bi bi-x-circle-fill"
                      style={{ color: "orange", fontSize: 20 }}
                    ></i>
                  )}
                  {data.status === "ERROR" && (
                    <i
                      className="bi bi-dash-circle-fill"
                      style={{ color: "red", fontSize: 20 }}
                    ></i>
                  )}
                </td>
                <td>
                  <Moment format="MMM DD, YYYY">{data.eventDate}</Moment>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
