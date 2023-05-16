import {useState} from "react";

const Location = ({data, dataSelect, srtSearch}) => {
  const [srt, setStr] = useState('')
  const [select, setSelect] = useState('0')

  function validate(){
    if (srt !== '' && srt !== " ") {
      if(select === '1') srtSearch({srt:Number.parseInt(srt), select}) 
      if(select === '2') srtSearch({srt, select})
      if(select === '0') srtSearch({srt: '', select})
    }else{
      if(select === '0') {
        srtSearch({srt: '', select})
      }else{
        window.alert('ingrese data')
        // console.log('vacio')
      }
    }
    //console.log(srt)
  }

  return (
    <>
      <div className="input-search">
        <label htmlFor="select">Search Location: </label>
        <select onChange={ (e) => setSelect(e.target.value) }>
          <option value="0">--Random--</option>
          <option value="1">Id</option>
          <option value="2">Name</option>
        </select>
        {
          select !== '0' && <input value={srt} type={select === '1' ? 'number': 'text'} onChange={ (e) => (
            setStr(e.target.value)) } placeholder="Enter Location" />
        }
        
        <button onClick={ validate } >Search</button>
      </div>
      {
        (dataSelect.length > 0 && select === '2' ) && (
          <select onChange={ (e) => srtSearch({srt:Number.parseInt(e.target.value), select:"1"}) }>
            {
              dataSelect.map( item => (
                <option key={item.id} value={item.id} >{item.name}</option>
              ) )
            }
          </select>
        )
      }
      <div className="content-location">
        <div>
          <h3>Nombre:</h3>
          <p>{data.data?.name}</p>
        </div>
        <div>
          <h3>Tipo:</h3>
          <p>{data.data?.type}</p>
        </div>
        <div>
          <h3>Dimension:</h3>
          <p>{data.data?.dimension}</p>
        </div>
        <div>
          <h3>Poblacion:</h3>
          <p>{data.residents?.length}</p>
        </div>
      </div>
    </>
  );
};

export default Location;
