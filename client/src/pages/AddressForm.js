import React from "react";
import "../assets/AddressForm.css";
import { RiArrowRightWideFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import PopUpModalAddress from "../components/PopUpModalAddress";
import { useLocation } from "react-router-dom";

export default function AddressForm() {
    const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
    const [address, setAddress] = React.useState("");
    const [showDropdown, setShowDropdown] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [resetManualEntryForm, setResetManualEntryForm] = React.useState(false);
    const [modalSource, setModalSource] = React.useState('');
    const [searchResults, setSearchResults] = React.useState([]);
    const location = useLocation();
    const formData = location.state;

    const handleChange = async (evt) => {
        setAddress(evt.target.value);
        if (evt.target.value.length > 2) {
            const apiKey = 'NE98-KY68-YR34-WB91';
            const country = 'IND'; 
            const url = `https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws?Key=${apiKey}&Text=${evt.target.value}&IsMiddleware=false&Countries=${country}`;
            try {
                const response = await fetch(url);
                const data = await response.json();
                setSearchResults(data.Items);
            } catch (error) {
                console.error("Error fetching address data:", error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSelect = (address) => {
        setAddress(address);
        setSearchResults([]);
        setShowDropdown(false);
    };

    const handleEdit = () => {
        setShowDropdown(true);
        setAddress("");
    };

    const onSubmit = async (data) => {
        const combinedData = { ...(formData || {}), ...data, address };
        console.log(combinedData);
        try {
            const response = await fetch('http://localhost:3003/api/auth/submitPersonalDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(combinedData),
            });

            if (!response.ok) {
                throw new Error('Failed to register customer');
            }

            const result = await response.json();
            console.log(result);

        } catch (error) {
            console.error('Error:', error);
        }
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

    const updateAddress = (newAddress) => {
        setAddress(newAddress);
        setShowDropdown(false);
        setShowModal(false);
    };

    const addressParts = address.split(',');

    return (
        <>
            <div className="container">
                <h2 className="header">
                    <span className="sp">02 </span>Home Address
                </h2>
                <h2 className="header2">Please provide your current address</h2>
                <hr className="hrline" />
                {showDropdown ? (
                    <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "15px" }}>
                        <label
                            htmlFor="address"
                            className="form-label"
                        >
                            SEARCH FOR YOUR ADDRESS
                        </label>
                        <input
                            type="text"
                            className={`formInput ${errors.address ? 'error' : ''}`}
                            {...register("address", { required: "Address is required*" })}
                            value={address}
                            onChange={handleChange}
                            placeholder="Type address or postal code"
                        />
                        {errors.address && (
                            <p className="error-message">{errors.address.message}</p>
                        )}
                        {searchResults.length > 0 && (
                            <ul className="address-dropdown">
                                {searchResults.map((result) => (
                                    <li key={result.Id} onClick={() => handleSelect(result.Text)}>
                                        {result.Text}
                                    </li>
                                ))}
                            </ul>
                        )}
                        <h2 className="manual-entry-link">
                            Select address or enter manually using the link below
                        </h2>
                        <button
                            className="manual-entry-button"
                            onClick={(evt) => openModal(evt, 'manualEntry')}
                        >
                            Prefer to enter address manually <RiArrowRightWideFill />
                        </button>
                        <hr className="hrline" />
                    </form>
                ) : (
                    <div className="formattedAddressContainer">
                        <div className="formattedAddress">
                            {addressParts.map((part, index) => (
                                <p key={index}>{part.trim()}</p>
                            ))}
                            <button className="RemoveAddressButton" onClick={handleEdit}>
                                Remove address
                            </button>
                            <button className="ChangeAddressButton" onClick={(evt) => openModal(evt, 'changeAddress')}>
                                Change Address Manually <RiArrowRightWideFill />
                            </button>
                        </div>
                        <hr className="dynamicHr" />
                    </div>
                )}
                <h2 className="section-title">HOW LONG HAVE YOU LIVED AT THIS ADDRESS?*</h2>
                <h3 className="section-subtitle">If less than 6 months, we will also need details of your previous address.</h3>
                <form className="radioType" onSubmit={handleSubmit(onSubmit)}>
                    <div className="radio-option">
                        <input
                            {...register("duration", { required: "Duration is required*" })}
                            type="radio"
                            value="6 months or more"
                            name="duration"
                        />
                        <label htmlFor="duration1">6 months or more</label>
                    </div>
                    <div className="radio-option">
                        <input
                            {...register("duration", { required: "Duration is required*" })}
                            type="radio"
                            value="Less than 6 months"
                            name="duration"
                        />
                        <label htmlFor="duration2">Less than 6 months</label>
                    </div>
                    {errors.duration && (
                        <p className="error-message">{errors.duration.message}</p>
                    )}
                </form>
                <hr className="hrline" />
                <label className="confirmation-label" htmlFor="confirmation">
                    <input
                        {...register("confirmation", { required: "Please confirm*" })}
                        type="checkbox"
                        id="confirmation"
                        name="confirmation"
                    /> By checking this box, I confirm that the information provided is accurate and complete to the best of my knowledge.
                </label>
                {errors.confirmation && (
                    <p className="error-message">
                        {errors.confirmation.message}
                    </p>
                )}
                <div className="button-container">
                    <button type="submit" className="CtnBtn" onClick={handleSubmit(onSubmit)}>
                        Continue
                    </button>
                </div>
            </div>
            <PopUpModalAddress
                show={showModal}
                onClose={closeModal}
                initialAddress={address}
                resetManualEntryForm={resetManualEntryForm}
                modalSource={modalSource}
                updateAddress={updateAddress} 
            />
        </>
    );
}
