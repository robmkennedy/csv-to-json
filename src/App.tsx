import React, {useState} from 'react';
import './App.css';
import {json} from "node:stream/consumers";

function App() {

    const [csv, setCsv] = useState('');
    const [json, setJson] = useState('');
    const [status, setStatus] = useState('Info will be shown here');

    const displayStatus = (msg: string) => {

    }

    const convertCsvToJson = (csv: string) => {
        const result = []
        const rows = csv.split(/\n/g) || [];

        if (rows.length === 0) {
            displayStatus('No CSV data');
            return 'No CSV data';
        }

        const headerRow = rows.shift();
        if (!headerRow) {
            displayStatus('Could not find first header row in CSV data');
            return 'Could not find first header row in CSV data';
        }

        const attributes = headerRow.split(',');
        if (attributes.length === 0) {
            displayStatus('Could not find header columns in first row');
            return 'Could not find header columns in first row';
        }

        for (let i = 0; i < rows.length; i++) {

            if (!rows[i]) {
                continue
            }

            const obj: {[key: string]: string} = {};
            const currentRowValues = rows[i].split(",");

            for(let  j = 0; j < attributes.length; j++){
                obj[attributes[j]] = currentRowValues[j];
            }

            result.push(obj);
        }
        return JSON.stringify(result, null, 4);
    }

    const handleClick = () => {
        const jsonString = convertCsvToJson(csv);
        setJson(jsonString);
    }

    const handleCsvChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setCsv(event.target.value);
    }

    return (
      <div className="App">
          <div className='title'>Robs CSV to JSON Converter</div>
          <div className='label'>CSV Input</div>
          <textarea id='csvArea' onChange={handleCsvChange}></textarea>
          <button id='convertButton' onClick={handleClick}>Convert To JSON</button>
          {/*<div className='status'>{status}</div>*/}
          <div className='label'>JSON Output</div>
          <textarea id='jsonArea' value={json}></textarea>
      </div>
  );
}

export default App;
