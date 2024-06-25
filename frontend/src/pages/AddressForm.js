import React from "react";
import "../assets/AddressForm.css";
import { RiArrowRightWideFill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import PopUpModalAddress from "../components/PopUpModalAddress";
import { useLocation } from "react-router-dom";
import LoqateAPI from "../components/LoqateAPI";

export default function AddressForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [formattedAddress, setFormattedAddress] = React.useState({
        flatName: "",
        subBuilding: "",
        flatNumber: "",
        street: "",
        city: "",
        postalCode: ""
    });
    const [showDropdown, setShowDropdown] = React.useState(true);
    const [showModal, setShowModal] = React.useState(false);
    const [resetManualEntryForm, setResetManualEntryForm] = React.useState(false);
    const [modalSource, setModalSource] = React.useState('');
    const location = useLocation();
    const formData = location.state;

    const handleSelectAddress = (address) => {
        setFormattedAddress(address);
        setShowDropdown(false);
    };

    const handleEdit = () => {
        setShowDropdown(true);
        setFormattedAddress({
            flatName: "",
            subBuilding: "",
            flatNumber: "",
            street: "",
            city: "",
            postalCode: ""
        });
    };

    const onSubmit = async (data) => {
        const combinedData = {
            name: {
                firstName: formData.firstName,
                middleName: formData.middleName,
                lastName: formData.lastName
            },
            dateOfBirth: formData.dob,
            address: {
                flatName: formattedAddress.flatName,
                subBuilding: formattedAddress.subBuilding,
                flatNumber: formattedAddress.flatNumber,
                street: formattedAddress.street,
                city: formattedAddress.city,
                postalCode: formattedAddress.postalCode
            },
            hasLivedLessThan6Months: data.duration,
            confirmation: data.confirmation
        };
        console.log('Request Payload:', JSON.stringify(combinedData, null, 2));
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

    const closeModal = () => {
        setShowModal(false);
    };

    const updateAddress = (newAddress) => {
        setFormattedAddress(newAddress);
        setShowDropdown(false);
        setShowModal(false);
    };

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
                        <LoqateAPI onSelectAddress={handleSelectAddress} />
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
                            <p>{formattedAddress.flatName?.trim()}</p>
                            <p>{formattedAddress.subBuilding?.trim()}</p>
                            <p>{formattedAddress.flatNumber?.trim()}</p>
                            <p>{formattedAddress.street?.trim()}</p>
                            <p>{formattedAddress.city?.trim()}</p>
                            <p>{formattedAddress.postalCode?.trim()}</p>
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
                initialAddress={formattedAddress}
                resetManualEntryForm={resetManualEntryForm}
                modalSource={modalSource}
                updateAddress={updateAddress} 
            />
        </>
    );
}
