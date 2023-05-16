import { useState, useEffect } from 'react'
import Location from './components/Location'
import ResidentInfo from './components/ResidentInfo'
import axios from 'axios'


function App() {
  const [data, setData] = useState(null)
  const [locations, setLocations] = useState([]);

  function getApi(params){
    if (params.type === 0) {
      const idRandom = Math.floor( Math.random() * 126);
      axios.get(`${params.urlApi}/${idRandom}`)
      .then( res => setData({data: res.data, residents: res.data?.residents}) )
      .catch(err => console.error(err))
    }else if(params.type === 1){
      axios.get(`${params.urlApi}/${params.value}`)
      .then( res => setData({data: res.data, residents: res.data?.residents}) )
      .catch(err => console.error(err))
    }else{
      // console.log(params.value)
      axios.get(`${params.urlApi}?name=${params.value}`)
      .then( res => {
        const data2 = []
        res.data?.results.map( item => data2.push({id:item.id, name:item.name}) )
        setLocations(data2)
      })
      .catch(err => console.error(err))
    }
  }
  
  function getData (str = null) {
    const urlApi = 'https://rickandmortyapi.com/api/location';
    if (str) {
      if (str.toString().includes('random')) {
        // console.log(nameLocation)
        getApi({urlApi:urlApi, type: 0})
      }else if( typeof str === 'number' ){
        // console.log('Entro a Numbver')
       getApi({urlApi:urlApi, type: 1, value: str})
      }else {
        // console.log('No es Numero')
        // console.log(str)
        getApi({urlApi:urlApi, type: 2, value: str})
      }
    }else{
      getApi({urlApi:urlApi, type: 0})
    }
  
  }

  function getLocations(str){
   if (str.select === '0') {
    // console.log(str.select)
    getData('random'+Math.floor(Math.random() * 15))
   }else if (str.select === '1'){
    // console.log('Number')
    getData(str.srt)
    // console.log(Number(str.srt)) 
   }else {
    getData(str.srt)
   }
  // console.log(str)
  }

  useEffect( () => {
      getData()
  }, [] )

  
  return (
    <>
      {
        data &&  <Location data = {data} dataSelect={locations}  srtSearch={getLocations} />
      }
      {
        data && data.residents.length > 0 ?
        data.residents.map( (item, index) => <ResidentInfo key={index}  data = {item} /> ) :
        ""
      }
      
      
    </>
  )
}

export default App
