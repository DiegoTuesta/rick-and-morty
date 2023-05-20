// import axios from "axios";
// import { useState } from "react";

const ResidentInfo = ({ data }) => {
  // const [dataInfo, setDataInfo] = useState(null);

  // (() => {
  //   axios
  //     .get(data)
  //     .then((res) => setDataInfo(res.data))
  //     .catch((err) => console.error(err));
  // })();
  // console.log(data)

  return (
    <>

        <article className="card">
          <div className="card-img">
            <img src={data.image} alt={data.name}  />
            <div className="status-content">
              <div className={data.status === 'Dead' ? 'status-dead' : data.status === 'Alive' ? 'status-live' : 'status-unk' } ></div>
              <div> {data.status} </div>
            </div>
            
          </div>
          <div className="card-body">
            <div className="card-title">
              <h2>{data.name}</h2>
              <div className="hr"></div>
            </div>
            <div className="card-items">
              
              <p >Especie: {data.species} </p>
              <p >Origen: {data.origin?.name}</p>
              <p >Apariciones: {data.episode?.length}</p>
            </div>
          </div>
        </article>
    </>
  );
};

export default ResidentInfo;
