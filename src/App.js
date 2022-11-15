import { useEffect, useState } from "react";
import Corona from "./Corona";
import Graph from "./Graph";
import "./App.css";
import Table from "./Table";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState();
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "e1072a2a5cmshba58d5d8b2dff58p1abf1bjsn0c8b55ef9231",
      "X-RapidAPI-Host": "covid-193.p.rapidapi.com",
    },
  };

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      await fetch("https://covid-193.p.rapidapi.com/statistics", options)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.response
            .map((country) => ({
              name: country.country,
              value: country.country,
            }))
            .sort((a, b) => a.name.localeCompare(b.name));

          const sortedData = sortData(data.response);
          setTableData(sortedData);
          setCountries(countries);
        });
    };
    getCountries();
  }, []);

  const sortData = (data) => {
    const sortedData = [...data];

    sortedData.sort((a, b) => {
      if (a.cases.active > b.cases.active) {
        return -1;
      } else {
        return 1;
      }
    });
    return sortedData;
  };

  const countryChange = async (event) => {
    const countryCode = event.target.value;

    if (countryCode === "worldwide") {
      await fetch("https://disease.sh/v3/covid-19/all")
        .then((response) => response.json())
        .then((data) => {
          setCountry(countryCode);
          setCountryInfo(data);
        });
    } else {
      const countryResult = tableData.filter(
        (data) => countryCode === data.country
      )[0];

      setCountry(countryCode);
      setCountryInfo({
        cases: countryResult.cases.total,
        recovered: countryResult.cases.recovered,
        active: countryResult.cases.active,
        deaths: countryResult.deaths.total,
      });
    }
  };

  // console.log("country info >>>", countryInfo);

  return (
    <div className="app">
      <div className="header">
        <h1>
          <span>COVID-19</span> Tracker
        </h1>
        <select
          onChange={countryChange}
          value={country}
          className="countrySelect"
        >
          <option value="worldwide">worldwide</option>
          {countries.map((country) => (
            <option value={country.value}>{country.name}</option>
          ))}
        </select>
      </div>
      <p className="case-list"> Dashboard</p>
      <div className="coronaStats">
        <Corona title="Coronavirus cases" total={countryInfo.cases} />
        <Corona title="Recovered" total={countryInfo.recovered} />
        <Corona title="Active cases" total={countryInfo.active} />
        <Corona title="Deaths" total={countryInfo.deaths} />
      </div>

      <p className="case-list">Cases by Country</p>

      <Table countries={tableData} />

      <p className="case-list">Worldwide new cases</p>
      <div className="graph">
        <Graph />
      </div>
    </div>
  );
}

export default App;
