import React, { useState } from 'react'
import './pages.css'
import Inputfield from '../components/inputfield'
import { useDispatch, useSelector } from 'react-redux'

export default function Ownerinfo() {
    const [emailButton, setEmailBtn] = useState('Send OTP')
    const [mobileBtn, setMobBtn] = useState('Send OTP')
    let [otp, setOtp] = useState([])
    let [mobOtp, setMobOtp] = useState([])
    const [proceedTonext, setNext] = useState(false)
    const[sameAsBusiness,setSame]=useState(false)
    const[sameAsBusineesmail,setSameasBusinessmail]=useState(false)
    let data=useSelector((info)=>{return info.ownerDetails})
    const[ownerDetails,setOwnerDetails]=useState({...data})
    const dispatch=useDispatch()
    console.log(ownerDetails)

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

    //functio to handel input fields
    const handelInputChange=(event)=>{
        let{name,value}=event.target
        setOwnerDetails({
            ...ownerDetails,
            [name]:value
        })
    }

  // function to handel final submit 
  const handelsubmit = (e) => {
    e.preventDefault()
    const isEmpty = Object.values(ownerDetails).some(value => value === "");
    if (isEmpty) {
        alert("Please add all details");
    }else{
             
      
        dispatch({
            type:'ownerDetails',
            payload:{...ownerDetails}
        })
        alert("Owner Detals Added Sucessfully!")
        localStorage.setItem("ownerDetails",JSON.stringify(ownerDetails))
    }
}

let busEmail=useSelector((data)=>{return data.businessInfo.Email})
let busMob=useSelector((data)=>{return data.businessInfo.Mob})
    return (
        <div className='input_section'>
            <h1>Owner & Manager Details</h1>
            <button className='Owner_Details_btn'>Owner Details</button>
           <form onSubmit={(e)=>{
            handelsubmit(e)
           }}>
           <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                    <Inputfield handelInputChange={handelInputChange} value={ownerDetails.Name} placeholder={'Eg. Prabhat Kumar, Sushma Singh'} name={'Name'} />
                    {/* select state field */}
                    <div style={{ marginTop: '48px' }}>
                        <label htmlFor="statefield">
                            <span className="start-mark">State*</span>
                            <span className="info">&#x1F6C8;</span>
                        </label>
                        <select defaultValue={ownerDetails.State} name='State' onChange={(event) => {
                            handelInputChange(event)
                        }}>
                            <option>Odisha</option>
                            <option>Other</option>
                        </select>
                    </div>
                </div>
                <div className='Image_section'>
                    <label htmlFor="ImgField" className='Image_fielf'>
                        <span className="start-mark">Profile Pic*</span>
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
            </div>
            <div style={{ marginTop: '0', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Inputfield handelInputChange={handelInputChange} name={'City'} value={'Berhampur'} />
                <Inputfield handelInputChange={handelInputChange} name={'Country'} value={'India'} />
            </div>
            <div style={{ marginTop: '0' }} className="address-container">
                <label htmlFor="inputField">
                    <span className="start-mark">Address*</span>
                    <span className="info">&#x1F6C8;</span>
                </label>
                <input value={ownerDetails.Address} name='Address' onChange={(event) => {
                    handelInputChange(event)
                }} type={'text'} id="address" />

            </div>


            {/* contact input fielf  */}
            <div className='contact_details' style={{
                marginTop: '0',
                display: 'flex',
                justifyContent: 'space-between',
                // marginBottom: '129px'
            }}>
                <div style={{ position: 'relative' }}>
                    <label htmlFor="email">
                        <span className="start-mark">E-mail*</span>
                        <span className="info">&#x1F6C8;</span>
                    </label>
                    <div style={{ position: 'relative' }}>
                        <input value={ownerDetails.Email} type='email' name='Email' onChange={(event) => {
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
                    <label
                     onChange={()=>{
                        setSameasBusinessmail(!sameAsBusineesmail)
                        setEmailBtn("Verified")
                       setOwnerDetails({
                        ...ownerDetails,
                        Email:JSON.parse(localStorage.getItem("businessInfo"))
                       })
                    }}
                    style={!sameAsBusineesmail && emailButton==='Send OTP' ?{}:{display:'none'}}
                    htmlFor="bullet-input" className='bullet-input'>
                        <div className="start-mark">Same as Business e-mail</div>
                        <input type='checkbox' style={{width:'14px',margin:'0',}}/>
                    </label>
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
                        <input value={ownerDetails.Mob} type='number' name='Mob' onChange={(event) => {
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
                    <label 
                    onChange={()=>{
                        setSame(!sameAsBusiness)
                        setMobBtn("Verified")
                        setOwnerDetails({
                            ...ownerDetails,
                            Mob:busMob
                        })
                    }}
                    style={!sameAsBusiness && mobileBtn==='Send OTP'?{}:{display:'none'}}
                    htmlFor="bullet-input" className='bullet-input'>
                        <div className="start-mark">Same as Business mobile number</div>
                        <input type='checkbox' style={{width:'14px',margin:'0',}}/>
                    </label>
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

            <div className='final_submit_owner_details'
            style={{justifyContent:'left'}}
            >
                <p>Do you want to fill manager details?</p>
                <button style={{
                    marginLeft: '30px',
                    marginRight: '26px'
                }}>
                    Yes
                </button>
                <button style={!proceedTonext ? {} : { display: 'none', cursor: 'pointer' }}

                   onClick={(e) => {
                    e.preventDefault()
                        setNext(!proceedTonext)
                    }
                    }
                >
                    No
                </button>
                <input
                    style={proceedTonext ? {
                        position: 'relative'
                    } : { display: 'none' }}
                    type='submit' value={"Proceed to PAN & Aadhar Details->"} />

            </div>

           </form>

        </div>
    )
}

