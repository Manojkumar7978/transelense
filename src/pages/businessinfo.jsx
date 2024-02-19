import React, { useState } from 'react'
import './pages.css'
import Inputfield from '../components/inputfield'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

export default function Businessinfo() {
    const [emailButton, setEmailBtn] = useState('Send OTP')
    const [mobileBtn, setMobBtn] = useState('Send OTP')
    let [otp, setOtp] = useState([])
    let [mobOtp, setMobOtp] = useState([])
    const navigate=useNavigate()
    const dispatch=useDispatch()
    let data=useSelector((info)=>{return info.businessInfo})
    const [businessInfo, setBusinessInfo] = useState({...data})

   
    //function to handel email otp sending
    const handelEmailOtp = (e) => {
        if (emailButton === 'Send OTP') {
            setEmailBtn("Resend OTP")
        }
    }
    // function to handel mobile otp sending 

    const handelMobOtp = (e) => {
        if (mobileBtn === 'Send OTP') {
            setMobBtn("Resend OTP")
        }
    }

    //function to handel input change
    const handelInputChange = (event) => {
        const { name, value } = event.target;

        setBusinessInfo({
            ...businessInfo,
            [name]: value
        })
    }

    // function to handel final submit 
    const handelsubmit = (e) => {
        e.preventDefault()
        const isEmpty = Object.values(businessInfo).some(value => value === "");
        if (isEmpty) {
            alert("Please add all details");
        }else{
            if(mobOtp.length<=0 && otp.length<=0){
                alert("Verify your email id and mobiel number.")
                return
            }
            dispatch({
                type:'active',
                payload:2
            })
            dispatch({
                type:'businessInfo',
                payload:{...businessInfo}
            })
            localStorage.setItem("businessInfo",JSON.stringify(businessInfo))
            navigate('/ownerinfo')
        }
    }


return (
    <div className='input_section'>
        <h1>Business Information</h1>

        {/* business form input section  */}
        <form onSubmit={(e) => {
            handelsubmit(e)
        }}>
            <div>
                <Inputfield value={businessInfo.Name} name={"Name"} handelInputChange={handelInputChange} type={"text"} />
                <div>
                    <label htmlFor="countryfield">
                        <span className="start-mark">Country*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <select name='Country' onChange={(event) => {
                        handelInputChange(event)
                    }}>
                        <option>India</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="statefield">
                        <span className="start-mark">State*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <select name='State' onChange={(event) => {
                        handelInputChange(event)
                    }}>
                        <option>Odisha</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="cityfield">
                        <span className="start-mark">City*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <select name='City' onChange={(event) => {
                        handelInputChange(event)
                    }}>
                        <option>Berhampur</option>
                        <option>Other</option>
                    </select>
                </div>
            </div>

            {/* address input seection  */}
            <div className="address-container">
                <label htmlFor="inputField">
                    <span className="start-mark">Address*</span>
                    <span className="info">&#x1F6C8;</span>
                </label>
                <input value={businessInfo.Address} name='Address' onChange={(event) => {
                    handelInputChange(event)
                }} type={'text'} id="address" />

            </div>

            {/* timer input  */}

            <div>
                <div>
                    <label htmlFor="countryfield">
                        <span className="start-mark">Opening Time*</span>
                    </label>
                    <input type='time' value={businessInfo.Open} name='Open' onChange={(event) => {
                        handelInputChange(event)
                    }} />
                </div>
                <div>
                    <label htmlFor="countryfield">
                        <span className="start-mark">Closing Time*</span>
                    </label>
                    <input type='time' value={businessInfo.Close} name='Close' onChange={(event) => {
                        handelInputChange(event)
                    }} />
                </div>
            </div>

            {/* contact input  */}
            <div className='contact_details'>
                <div style={{ position: 'relative' }}>
                    <label htmlFor="email">
                        <span className="start-mark">E-mail*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input value={businessInfo.Email} type='email' name='Email' onChange={(event) => {
                            handelInputChange(event)
                        }} placeholder='xyz@gmail.com' />
                        <button
                            className='OTP_Btn'
                            onClick={(e) => {
                                e.preventDefault()
                                handelEmailOtp()
                            }}
                            style={emailButton === 'Verified' ? { display: 'none' } : {}}
                        >
                            {emailButton}
                        </button>
                        <div style={emailButton === 'Verified' ? {
                            position: 'absolute', right: '14px',
                            fontSize: '14px',
                            color: 'green',
                            display: 'flex', top: '50%', transform: 'translateY(-50%)'
                        } : { display: 'none' }}>
                            Verified:<span className='verified'>&#x2713;</span>
                        </div>
                    </div>

                    {/* below element display after otp send  */}
                    <div className='OTP' onClick={() => {
                        setOtp([5, 4, 2, 0, 1])
                        if (otp.length > 0) {
                            setEmailBtn('Verified')
                        }
                    }} style={emailButton === 'Resend OTP' ? {} : { visibility: 'hidden' }}>
                        {
                            otp.length === 0 ? <>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                            </>
                                :
                                <>
                                    {
                                        otp.map((el) => {
                                            return <div key={el} style={{ marginBottom: '14px' }}>{el}</div>
                                        })
                                    }
                                </>
                        }
                    </div>
                    {
                        otp.length === 0 ?
                            <p style={emailButton === 'Resend OTP' ? {} : { display: 'none' }}>Enter OTP (60Sec)</p>
                            :
                            <>
                                <p style={emailButton === 'Resend OTP' ? {} : { display: 'none' }} className='verified'>&#x2713;</p>

                            </>
                    }
                </div>

                <div style={{ position: 'relative' }}>
                    <label htmlFor="mob-no">
                        <span className="start-mark">Mobile Number*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input  value={businessInfo.Mob} type='number' name='Mob' onChange={(event) => {
                            handelInputChange(event)
                        }} placeholder='7873795956' />
                        <button
                            className='OTP_Btn'
                            onClick={(e) => {
                                e.preventDefault()
                                handelMobOtp()
                            }}
                            style={mobileBtn === 'Verified' ? { display: 'none' } : {}}
                        >
                            {mobileBtn}
                        </button>
                        <div style={mobileBtn === 'Verified' ? {
                            position: 'absolute', right: '14px',
                            fontSize: '14px',
                            color: 'green',
                            display: 'flex', top: '50%', transform: 'translateY(-50%)'
                        } : { display: 'none' }}>
                            Verified:<span className='verified'>&#x2713;</span>
                        </div>
                    </div>

                    {/* below element display after otp send  */}
                    <div className='OTP' onClick={() => {
                        setMobOtp([5, 4, 2, 0, 1])
                        if (mobOtp.length > 0) {
                            setMobBtn('Verified')
                        }
                    }} style={mobileBtn === 'Resend OTP' ? {} : { display: 'none' }}>
                        {
                            mobOtp.length === 0 ? <>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                                <div className='line'></div>
                            </>
                                :
                                <>
                                    {
                                        mobOtp.map((el) => {
                                            return <div key={el} style={{ marginBottom: '14px' }}>{el}</div>
                                        })
                                    }
                                </>
                        }
                    </div>
                    {
                        mobOtp.length === 0 ?
                            <p style={mobileBtn === 'Resend OTP' ? {} : { display: 'none' }}>Enter OTP (60Sec)</p>
                            :
                            <>
                                <p style={mobileBtn === 'Resend OTP' ? {} : { display: 'none' }} className='verified'>&#x2713;</p>

                            </>
                    }
                </div>

            </div>


            {/* upload image  */}

            <div className='Image_section'>
                <label htmlFor="ImgField" className='Image_fielf'>
                    <span className="start-mark">Upload image of your Restaurant</span>
                    <span className="info">&#x1F6C8;</span>
                </label>
                <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <label for="fileInput" class="file-upload">
                        <span>Click to upload</span>
                        <input type="file" id="fileInput" name="Image" onChange={(event) => {
                            handelInputChange(event)
                        }} accept=".jpg, .jpeg, .png" />
                    </label>
                    <button
                        style={{
                            color: 'white', backgroundColor: '#DA3545',
                            border: 'none',
                            borderRadius: '4px',
                            padding: '12px',
                            width: '120px'
                        }}
                    >
                        Re-upload
                    </button>
                </div>
            </div>

            {/* final submit button  */}
            <div style={{ width: '100%', position: 'relative' }}>
                <input type='submit' value={"Proceed to Owner & Manager Details ->"} />

            </div>
        </form>
    </div>
)
}


