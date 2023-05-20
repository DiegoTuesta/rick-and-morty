import { useState, useEffect } from "react";
import InputLocation from "./components/InputLocation";
import Location from "./components/Location";
import ResidentInfo from "./components/ResidentInfo";
import axios from "axios";
import Pagination from "./components/Pagination";

function App() {
  const [location, setLocation] = useState({});
  const [idLocation, setIdLocation] = useState(Math.floor(Math.random() * 126));
  const [page, setPage] = useState(1);
  const [residents, setResidents] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  // const [idRandom, setIdRandom] = useState(0)

  const getResidentInfo = (residents2) => {
    // console.log(residents2[0].split("/")[5])
    const id = residents2.map((resident) => resident.split("/")[5]);
    axios
      .get(`https://rickandmortyapi.com/api/character/${id}`)
      .then((res) => {
        setResidents(res.data);
      })
      .catch((err) => console.log(err));
  };

  const getData = (id) => {
    setPage(1)
    const urlApi = "https://rickandmortyapi.com/api/location";
    axios
      .get(`${urlApi}/${id}`)
      .then((res) => {
        setLocation(res.data);
        getResidentInfo(res.data.residents);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSearchResult = (search) => {
    if (search !== "") {
      const urlApi = "https://rickandmortyapi.com/api/location?name=";
      axios
        .get(`${urlApi}${search}`)
        .then((res) => {
          // console.log(res.data);
          setSearchResult(res.data?.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      setIdLocation(Math.floor(Math.random()* 126))
      setSearchResult([])
    }
  };

  useEffect(() => {
    getData(idLocation);
  }, [idLocation]);

  const perPage = 10;
  const quantyPage =
    residents.length > 0 ? Math.ceil(residents.length / perPage) : 0;
  const firstIndex = (page - 1) * perPage;
  const residents1 =
    residents.length > 0
      ? residents.slice(firstIndex, firstIndex + perPage)
      : 0;
  // console.log(residents1)
  return (
    <>
      <InputLocation
        dataSelect={searchResult}
        srtSearch={getSearchResult}
        setId={setIdLocation}
      />
      {location.id ? (
        <>
          <Location data={location} />
          {<Pagination page={page} setPage={setPage} quantyPage={quantyPage} />}

          <div className="card-content">
            <div className="card-content-son">
              {residents1.length > 0 ? (
                residents1.map((item) => (
                  <ResidentInfo key={item.id} data={item} />
                ))
              ) : residents.name ? (
                <ResidentInfo data={residents} />
              ) : (
                ""
              )}
            </div>
          </div>
          <br /><br />
        </>
      ) : (
        <div className="loading-content">
          <div className="custom-loader"></div>
        </div>
      )}
    </>
  );
}

export default App;
