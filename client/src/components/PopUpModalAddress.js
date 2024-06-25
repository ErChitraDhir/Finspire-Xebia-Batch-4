import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import '../assets/PopUpFormAddress.css';

export default function PopUpModalAddress({ show, onClose, initialAddress, resetManualEntryForm, modalSource, updateAddress }) {
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        if (!show) return;

        if (resetManualEntryForm) {
            reset();
        } else if (initialAddress) {
            const addressParts = initialAddress.split(',');
            if (addressParts.length >= 1) setValue('flatNumber', addressParts[0].trim());
            if (addressParts.length >= 2) setValue('street', addressParts[1].trim());
            if (addressParts.length >= 3) setValue('city', addressParts[2].trim());
            if (addressParts.length >= 4) setValue('postalCode', addressParts[3].trim());
        }
    }, [show, initialAddress, resetManualEntryForm, reset, setValue]);

    const onSubmit = (data) => {
        const newAddress = `${data.houseName ? `${data.houseName}, ` : ''}${data.subBuilding ? `${data.subBuilding}, ` : ''}${data.flatNumber}, ${data.street}, ${data.city}, ${data.postalCode}`;
        updateAddress(newAddress); // Update the address in AddressForm
    };

    if (!show) {
        return null;
    }
    
    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <h1 style={{ fontSize: "22px", margin: "0px", padding: "0px" }}>
                        {modalSource === 'manualEntry' ? 'Your Address' : 'Change Address'}
                    </h1>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label>House or Building Name*</label>
                        <input
                            type="text"
                            placeholder="Enter House or Building Name"
                            {...register('houseName', { required: 'Please enter your house or building name' })}
                        />
                        {errors.houseName && <p className="errorMessage">{errors.houseName.message}</p>}
                        
                        <label>Sub Building (Optional)</label>
                        <input
                            type="text"
                            placeholder="Enter Sub Building"
                            {...register('subBuilding')}
                        />
                        
                        <label>Flat or Building Number*</label>
                        <input
                            type="text"
                            placeholder="Enter Flat or Building Number"
                            {...register('flatNumber', { required: 'Please enter your flat or building number' })}
                        />
                        {errors.flatNumber && <p className="errorMessage">{errors.flatNumber.message}</p>}
                        
                        <label>Street*</label>
                        <input
                            type="text"
                            placeholder="Enter Street"
                            {...register('street', { required: 'Please enter your street number' })}
                        />
                        {errors.street && <p className="errorMessage">{errors.street.message}</p>}
                        
                        <label>City*</label>
                        <input
                            type="text"
                            placeholder="Enter City"
                            {...register('city', { required: 'Please enter your city name' })}
                        />
                        {errors.city && <p className="errorMessage">{errors.city.message}</p>}
                        
                        <label>Postal Code*</label>
                        <input
                            type="text"
                            placeholder="Enter Postal Code"
                            {...register('postalCode', { required: 'Please enter your postal code' })}
                        />
                        {errors.postalCode && <p className="errorMessage">{errors.postalCode.message}</p>}
                        
                        <div className="button-container">
                            <button type="submit" className="save-button">
                                Save
                            </button>
                            <button type="button" className="close-button" onClick={onClose}>
                                Close
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
