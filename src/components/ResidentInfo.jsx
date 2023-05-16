import axios from "axios";
import { useState } from "react";

const ResidentInfo = ({ data }) => {
    const [dataInfo, setDataInfo] = useState(null);

    (() => {
        axios.get(data)
        .then(res => setDataInfo(res.data))
        .catch(err => console.error(err))
    })()
    
  return (
    <>
        {
            dataInfo && (
                <article className="card">
                <div className="card-img">
                  <img src={dataInfo.image} alt="" />
                </div>
                <div className="card-body">
                  <h2>{dataInfo.name}</h2>
                  <p>Status: {dataInfo.status} </p>
                  <p>Especie: {dataInfo.species} </p>
                  <p>Origen: {dataInfo.origin.name}</p>
                  <p>Apariciones: {dataInfo.episode.length}</p>
                </div>
              </article>
            )
        }
         
        
    </>
  );
};

export default ResidentInfo;
