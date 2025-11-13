import React from 'react'
import './MovieCards.css'

const MovieCards = ({pictures} ) => {
  return (
    <div className='moviescards rounded-circle'>
               <div className="card" style={{width: "15rem"}}>
               <img src={pictures.img}  alt="..."/>
                <div className="card-body">
                  <p className="card-text">{pictures.title}</p>
               </div>
              </div>
               
              
    </div>
  )
}

export default MovieCards
