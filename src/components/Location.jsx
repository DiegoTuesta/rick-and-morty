import React from 'react'

const Location = ({data}) => {
  return (
    <div>
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
  )
}

export default Location