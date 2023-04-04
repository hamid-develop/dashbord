import React, { useState } from "react";
import "./App.css";
import * as XLSX from "xlsx";

function App() {
  const [fileName, setFileName] = useState(null);
  const [column, setColumn] = useState([]);

  const excelFileHandler = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);
    const data = await file.arrayBuffer();
    const workbook = XLSX.read(data);
    // just reading 5 rows from xlsx file instead of upper line if required ..
    //const workbook = XLSX.readFile(data, {sheetRows: 5 });
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
      header: 1,
      defval: "",
    });
    setColumn(jsonData[0]);
    console.log(jsonData);
  };

  return (
    <div className="App">
      <h1>read excel file</h1>
      {fileName && (
        <React.Fragment>
          <h4>
            file name: <span> {fileName} </span>
          </h4>
          <p>
            columns:{" "}
            <select>
              {column.map((c) => (
                <option value={c} key={c}>{c}</option>
              ))}
            </select>
          </p>
        </React.Fragment>
      )}

      <input type="file" onChange={(e) => excelFileHandler(e)} />
    </div>
  );
}

export default App;
