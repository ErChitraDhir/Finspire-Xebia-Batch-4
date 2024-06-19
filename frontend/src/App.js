import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AddressForm from "./pages/AddressForm";

function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
   <>
   <AddressForm/>
   </>
  );
}

export default App;