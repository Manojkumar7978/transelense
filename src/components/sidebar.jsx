import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export default function Sidebar() {
    let menu=useSelector((data)=>{return data.menus})
    // console.log(menu)
    const[active,setActive]=useState(1) // change style of menu accordingly 

  return (
    <div className='sidebar'>
        <h1>Partner with us</h1>
        <p>Be our partner in just few steps and start Increasing your reach by gaining new customers.</p>
        

        
        <div className='menu' >
            {
                menu.map((el,ind)=>{
                    return <div key={ind} className={el}
                    onClick={()=>{
                        if(active<=ind)
                        return
                        setActive(ind+1)
                    }}
                    style={ind+1<active ? {cursor:'pointer'}:{}}
                    >
                        <div style={{display:'flex',
                                     alignItems:'center',
                                    gap:'18px',
                                    
                            }}>
                            <div className={`number ${active>=ind+1 ? 'active' : ''}`}>{ind+1}
                            <hr className={ind===7 ? "none" : ""} style={(active > ind + 1) ? { border: '1px dashed #DC3545' } : {}} />
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
