import React from 'react'

export default function Inputfield({name,type,handelInputChange,value}) {
    return (
        <div className="input-container">
            <label htmlFor="inputField">
                <span className="start-mark">{`${name}*`}</span>
                <span className="info">&#x1F6C8;</span>
            </label>
            <input type={type} id="inputField" name="Name" value={value} onChange={(event)=>{
                handelInputChange(event)
            }}  />
        </div>
    )
}
