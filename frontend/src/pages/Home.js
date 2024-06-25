import { Link } from "react-router-dom";

export default function Home(){
    return(
        <>
        <h2>Hi from Home</h2>
        <Link to="/personal-details">Enable Application</Link>
        </>
    )
}