import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
    let menu = useSelector((data) => { return data.menus })
    // console.log(menu)
    const active=useSelector((data)=>{return data.active}) // change style of menu accordingly 
    const navigate = useNavigate()  
    const dispatch=useDispatch()
    // function to update active nav on store
    const setActive=(ind)=>{
        dispatch({
            type:'active',
            payload:ind
        })
    }

    return (
        <div className='sidebar'>
            <h1>Partner with us</h1>
            <p>Be our partner in just few steps and start Increasing your reach by gaining new customers.</p>
            <div className='menu' >
                {
                    menu.map((el, ind) => {
                        return <div key={ind} className={el}
                            onClick={() => {
                                if (active <= ind)
                                    return
                                setActive(ind + 1)
                                navigate('/')
                            }}
                            style={ind + 1 < active ? { cursor: 'pointer' } : {}}
                        >
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '18px',

                            }}>
                                <div className={`number ${active >= ind + 1 ? 'active' : ''}`}>{ind + 1}
                                    <hr className={ind === 7 ? "none" : ""} style={(active > ind + 1) ? { border: '1px dashed #DC3545' } : {}} />
                                </div>
                                <p>{el}</p>

                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
