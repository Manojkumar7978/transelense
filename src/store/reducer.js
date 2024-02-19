let businessInfo = JSON.parse(localStorage.getItem("businessInfo")) || {
    Name: "",
    Country: "India",
    State: "Odisha",
    City: "Berhampur",
    Address: "",
    Open: "",
    Close: "",
    Email: "",
    Mob: "",
    Image: ""
}
let ownerDetails =JSON.parse(localStorage.getItem("ownerDetails")) ||
 {
    Name: "",
    Country: "India",
    State: "Odisha",
    City: "Berhampur",
    Address: "",
    Email: "",
    Mob: "",
    Image: ""
}


let initialState = {
    menus: [
        "Business Information",
        "Owner & Manager Details",
        "PAN/Aadhaar Details",
        "Legal Documents",
        "Bank Details",
        "Service Info",
        "Preview Document",
        "Reach Increased"
    ],
    active: 1,
    businessInfo: {
        ...businessInfo
    },
    ownerDetails: {
        ...ownerDetails
    }
}

const reducer = (state = initialState, action) => {
    if (action.type === 'active') {
        state = {
            ...state,
            active: action.payload
        }
        return state
    }
    if (action.type === 'businessInfo') {
        state = {
            ...state,
            businessInfo: { ...action.payload }
        }
        return state
    }
    if(action.type==='ownerDetails'){
        state = {
            ...state,
            ownerDetails: { ...action.payload }
        }
        return state
    }
    return state
}
export default reducer