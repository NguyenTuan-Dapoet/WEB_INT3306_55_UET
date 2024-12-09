import React from 'react'
import './FlightItem.css'

export const FlightItem = (
    {flightNumber, from, to, date, price, image}
) => {
  return (
    <div className='flight-item'>
        <div className="flight-item-img-container">
            <img className='flight-item-image' src={image} alt="" />
        </div>
        <div className='flight-item-info'>
            <div className="flight-item-name">
                <p>{from} đến {to}</p>
            </div>
            <p className="flight-item-date">Ngày đi: {date}</p>
            <p className='flight-item-price'>${price}</p>
        </div>
    </div>
  )
}
  