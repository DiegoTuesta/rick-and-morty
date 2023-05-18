import axios from "axios";
import { useState } from "react";

const ResidentInfo = ({ data }) => {
  const [dataInfo, setDataInfo] = useState(null);

  (() => {
    axios
      .get(data)
      .then((res) => setDataInfo(res.data))
      .catch((err) => console.error(err));
  })();

  return (
    <>
      {dataInfo && (
        <article className="card">
          <div className="card-img">
            <img src={dataInfo.image} alt="" />
            <div className="status-content">
              <div className={dataInfo.status === 'Dead' ? 'status-dead' : dataInfo.status === 'Alive' ? 'status-live' : 'status-unk' } ></div>
              <div> {dataInfo.status} </div>
            </div>
            
          </div>
          <div className="card-body">
            <div className="card-title">
              <h2>{dataInfo.name}</h2>
              <div className="hr"></div>
            </div>
            <div className="card-items">
              
              <p >Especie: {dataInfo.species} </p>
              <p >Origen: {dataInfo.origin.name}</p>
              <p >Apariciones: {dataInfo.episode.length}</p>
            </div>
          </div>
        </article>
      )}
    </>
  );
};

export default ResidentInfo;
