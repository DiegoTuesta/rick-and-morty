import { useState } from "react";

const Location = ({ data, dataSelect, srtSearch }) => {
  const [srt, setStr] = useState("");
  const [select, setSelect] = useState("0");

  function validate() {
    if (srt !== "" && srt !== " ") {
      if (select === "1"){
        srtSearch({ srt: Number.parseInt(srt), select });
        setStr('')
      }
      if (select === "2") { 
        srtSearch({ srt, select });
        // setStr('')
      }
      if (select === "0"){
        srtSearch({ srt: "", select });
        setStr('')
      } 
    } else {
      if (select === "0") {
        setStr('')
        srtSearch({ srt: "", select });
      } else {
        window.alert("ingrese data");
        // console.log('vacio')
      }
    }
    //console.log(srt)
  }

  return (
    <>
      <div className="header">
        <div className="img-header">
          <img src="/assets/img/logo.svg" alt="logo" />
          <div className="input-search">
            <div className="input-content">
              <div>
                <select onChange={(e) => setSelect(e.target.value)}>
                  <option value="0">--Random--</option>
                  <option value="1">Id</option>
                  <option value="2">Name</option>
                </select>
              </div>
              {/* <label htmlFor="select">Search Location: </label> */}
              <div>
                <input
                  value={srt}
                  disabled={select !== "0" ? false : true}
                  type={select === "1" ? "number" : "text"}
                  onChange={(e) => setStr(e.target.value)}
                  placeholder="Enter Location"
                />
              </div>
              <div>
                <button onClick={validate}>Search</button>
              </div>
            </div>
          </div>
          {dataSelect.length > 0 && select === "2" && (
            <select
              className="select-name"
              onChange={(e) =>
                srtSearch({ srt: Number.parseInt(e.target.value), select: "1" })
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

        <div className="content-location">
          <div className="content-location-son">
            <div className="div-son" >
              <h3>Nombre:</h3>
              <p>{data.data?.name}</p>
            </div>
            <div className="div-son">
              <h3>Tipo:</h3>
              <p>{data.data?.type}</p>
            </div>
            <div className="div-son">
              <h3>Dimension:</h3>
              <p>{data.data?.dimension}</p>
            </div>
            <div className="div-son">
              <h3>Poblacion:</h3>
              <p>{data.residents?.length}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
