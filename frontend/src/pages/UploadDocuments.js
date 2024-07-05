import React from "react";
import { Link } from "react-router-dom";
export default function UploadDocuments({onComplete}){
    return(
        <>
        <h2>Add Your Official Documents</h2>
        <Link to="/login">Continue to Login</Link>
    </>
    )
}