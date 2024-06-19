import React from "react";
import "../assets/AddressForm.css";
import { RiArrowRightWideFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import PopUpModalAddress from "../components/PopUpModalAddress";

export default function AddressForm() {
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
    const [address, setAddress] = React.useState("");
    const [showDropdown, setShowDropdown] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [resetManualEntryForm, setResetManualEntryForm] = React.useState(false);
    const [modalSource, setModalSource] = React.useState(''); // New state for modal source

    const handleChange = (evt) => {
        setAddress(evt.target.value);
        setShowDropdown(false);
    };

    const handleEdit = () => {
        setShowDropdown(true);
        setAddress("");
    };

    const onSubmit = (data) => {
        console.log(data);
    };

    const openModal = (evt, source) => {
        evt.preventDefault();
        setShowModal(true);
        setModalSource(source);
        if (source === 'manualEntry') {
            setResetManualEntryForm(true);
        } else {
            setResetManualEntryForm(false);
        }
    };

    const closeModal = (source) => {
        setShowModal(false);
        if (source === 'changeAddress') {
            setResetManualEntryForm(false);
        }
    };

    const addressParts = address.split(',');

    return (
        <>
            <div className="container">
                <h2 className="header">
                    <span className="sp">02 </span>Home Address
                </h2>
                <h2 className="header2">Please provide your current address</h2>
                <hr className="hrline" width="100%" size="2" />
                {showDropdown ? (
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "15px" }}>
                        <label
                            htmlFor="address"
                            style={{ color: "black", fontWeight: 700 }}
                        >
                            SEARCH FOR YOUR ADDRESS
                            <br />
                        </label>
                        <select
                            className={`formInput ${errors.address ? 'error' : ''}`}
                            {...register("address", { required: "Address is required*" })}
                            value={address}
                            onChange={handleChange}
                        >
                            <option value="" disabled>
                                Type address or postal code
                            </option>
                            <option value="10,Mukstar Road,Faridkot">
                                10, Mukstar Road, Faridkot
                            </option>
                            <option value="20,Sector 32,Mohali">
                                20, Sector 32, Mohali
                            </option>
                            <option value="31,Main Road,Chandigarh">
                                31, Main Road, Chandigarh
                            </option>
                        </select>
                        {errors.address && (
                            <p className="error-message">{errors.address.message}</p>
                        )}
                        <h2
                            style={{
                                color: "black",
                                marginTop: "8px",
                                marginBottom: "4px",
                                fontWeight:"500"
                            }}
                        >
                            Select address or enter manually using the link below
                        </h2>
                        <button
                            style={{
                                color: "rgb(240, 95, 95",
                                marginTop: "2px",
                                cursor: "pointer",
                                border: "none",
                                backgroundColor: "white",
                                fontWeight: "900",
                                padding: "0px",
                                display: "flex",
                                alignItems: "center"
                            }}
                            onClick={(evt) => openModal(evt, 'manualEntry')}
                        >
                            Prefer to enter address manually <RiArrowRightWideFill />
                        </button>
                        <hr className="hrline" style={{marginTop:"15px"}} width="100%" size="2" />
                    </form>
                ) : (
                    <div className="formattedAddressContainer">
                        <div className="formattedAddress">
                            <p>{addressParts[0]}</p>
                            <p>{addressParts[1]}</p>
                            <p>{addressParts[2]}</p>
                            <button className="RemoveAddressButton" onClick={handleEdit}>
                                Remove address
                            </button>
                            <button className="ChangeAddressButton" onClick={(evt) => openModal(evt, 'changeAddress')}>
                                Change Address Manually <RiArrowRightWideFill />
                            </button>
                        </div>
                        <hr className="dynamicHr" size="2" />
                    </div>
                )}
                <h2 style={{marginTop:"20px",fontWeight:"700",marginBottom:"0px",color:"black"}}>HOW LONG HAVE YOU LIVED AT THIS ADDRESS?*</h2>
                <h3 style={{marginTop:"5px",fontWeight:"400"}}>If less than 6 months, we will also need details of your previous address.</h3>
                <form className="radioType" onSubmit={handleSubmit(onSubmit)}>
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <input
                            {...register("duration", { required: "Duration is required*" })}
                            type="radio"
                            value="6 months or more"
                            name="duration"
                            style={{ marginRight: "10px" }}
                        />
                        <label htmlFor="duration1">6 months or more</label>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
                        <input
                            {...register("duration", { required: "Duration is required*" })}
                            type="radio"
                            value="Less than 6 months"
                            name="duration"
                            style={{ marginRight: "10px" }}
                        />
                        <label htmlFor="duration2">Less than 6 months</label>
                    </div>
                    {errors.duration && (
                        <p className="error-message">{errors.duration.message}</p>
                    )}
                </form>
                <hr className="hrline" style={{marginTop:"15px"}} width="100%" size="2" />
                <label style={{ display: "flex", alignItems: "center",marginTop:"10px",marginRight:"0px",padding:"0px" }} htmlFor="confirmation">
                    <input
                        {...register("confirmation", { required: "Please confirm*" })}
                        type="checkbox"
                        id="confirmation"
                        name="confirmation"
                        style={{ marginRight: "10px" }}
                    /> By checking this box, I confirm that the information provided is accurate and complete to the best of my knowledge.
                </label>
                {errors.confirmation && (
                    <p className="error-message" style={{ marginTop: "5px" }}>
                        {errors.confirmation.message}
                    </p>
                )}
            </div>
            <button type="submit" className="CtnBtn" onClick={handleSubmit(onSubmit)}>
                Continue
            </button>
            <PopUpModalAddress
                show={showModal}
                onClose={closeModal}
                initialAddress={address}
                resetManualEntryForm={resetManualEntryForm}
                modalSource={modalSource}
            />
        </>
    );
}
