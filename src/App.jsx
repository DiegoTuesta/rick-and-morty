import { useState, useEffect } from "react";
import InputLocation from "./components/InputLocation";
import Location from './components/Location'
import ResidentInfo from "./components/ResidentInfo";
import axios from "axios";
import Pagination from "./components/Pagination";


function App() {
  const [data, setData] = useState(null);
  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  // const [idRandom, setIdRandom] = useState(0)

  function getApi(params) {
    if (params.type === 0) {
      // setLocations([])
      const idRandom = Math.floor(Math.random() * 126 + 1);
      
      axios
        .get(`${params.urlApi}/${idRandom}`)
        .then((res) =>
          setData({ data: res.data, residents: res.data?.residents })
        )
        .catch((err) => console.error(err));
    } else if (params.type === 1) {
      setLocations([])
      axios
        .get(`${params.urlApi}/${params.value}`)
        .then((res) =>
          setData({ data: res.data, residents: res.data?.residents })
        )
        .catch((err) => console.error(err));
    } else {
      // console.log(params.value)
      axios
        .get(`${params.urlApi}?name=${params.value}`)
        .then((res) => {
          const data2 = [];
          res.data?.results.map((item) =>
            data2.push({ id: item.id, name: item.name })
          );
          setLocations(data2);
          // setLocations([])
        })
        .catch((err) => console.error(err));
    }
  }

  function getData(str = null) {
    const urlApi = "https://rickandmortyapi.com/api/location";
    if (str) {
      if (str.toString().includes("random")) {
        // console.log(nameLocation)
        getApi({ urlApi: urlApi, type: 0 });
      } else if (typeof str === "number") {
        // console.log('Entro a Numbver')
        getApi({ urlApi: urlApi, type: 1, value: str });
      } else {
        // console.log('No es Numero')
        // console.log(str)
        getApi({ urlApi: urlApi, type: 2, value: str });
      }
    } else {
      getApi({ urlApi: urlApi, type: 0 });
    }
  }

  function getLocations(str) {
    if (str.select === "0") {
      setData(null)
      // console.log(str.select)
      getData("random" + Math.floor(Math.random() * 15));
    } else if (str.select === "1") {
      setData(null)
      // console.log('Number')
      getData(str.srt);
      // console.log(Number(str.srt))
    } else {
      setData(null)
      getData(str.srt);
    }
    // console.log(str)
  }

  useEffect(() => {
    getData();
  }, []);

  const perPage = 10;
  const quantyPage = data ? Math.ceil(data.residents?.length / perPage) : 0;
  const firstIndex = (page - 1) * perPage;

  const residents = data
    ? data.residents?.slice(firstIndex, firstIndex + perPage)
    : 0;
  return (
    <>
        <InputLocation  dataSelect={locations} srtSearch={getLocations} />

      

      {
      data && data.residents?.length > 0 ? 
      <>
      <Location data={data} />
      <Pagination page={page} setPage={setPage} quantyPage={quantyPage} />
       <div className="card-content">
          <div className="card-content-son">
            {residents.map((item, index) => (
              <ResidentInfo key={index} data={item} />
            ))}
          </div>
        </div>
      </>
       
       : (
        
        <div className="loading-content" >
          <div className="custom-loader"></div>
        </div>
      )}
    </>
  );
}

export default App;
