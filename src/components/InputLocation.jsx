// import { useState } from "react";

const InputLocation = ({dataSelect, srtSearch, setId }) => {
  // const [srt, setStr] = useState("");
  // const [select, setSelect] = useState("0");

  
  return (
    <>
      <div className="header">
        <div className="img-header">
          <img src="/assets/img/logo.svg" alt="logo" />
          <div className="input-search">
            <div className="input-content">
              
              {/* <label htmlFor="select">Search Location: </label> */}
              <div>
                <input
                  type="text"
                  onChange={(e) => srtSearch(e.target.value)}
                  placeholder="Enter Location"
                />
              </div>
             
            </div>
          </div>
          {dataSelect.length > 0  && (
            <select
              className="select-name"
              onChange={(e) =>
                setId(e.target.value)
              }
            >
              {dataSelect.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </>
  );
};

export default InputLocation;
