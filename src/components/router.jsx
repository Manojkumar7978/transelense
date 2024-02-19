import React from "react";
import { Route,Routes } from "react-router-dom";
import Businessinfo from "../pages/businessinfo";
import Ownerinfo from "../pages/ownerinfo";


export default function Router(){
    return (
        <>
        <Routes>
            <Route path="/" element={<Businessinfo></Businessinfo>} />
            <Route path="/ownerinfo" element={<Ownerinfo></Ownerinfo>} />

        </Routes>
        </>
    )
}