import React, { useState } from 'react';
import axios from 'axios';
import "../assets/LoqateAPI.css"
const LoqateAPI = ({ onSelectAddress }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleInputChange = async (e) => {
        const value = e.target.value;
        setQuery(value);

        if (value.length > 2) {
            try {
                const response = await axios.get('https://api.addressy.com/Capture/Interactive/Find/v1.10/json3.ws', {
                    params: {
                        Key: 'NE98-KY68-YR34-WB91', 
                        Text: value,
                        IsMiddleware: true,
                        Container: '',
                        Countries: 'IND',
                    }
                });

                const results = response.data.Items;
                if (results) {
                    setSuggestions(results);
                } else {
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Error fetching address suggestions:', error);
                setSuggestions([]);
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = async (suggestion) => {
        try {
            const response = await axios.get('https://api.addressy.com/Capture/Interactive/Retrieve/v1.00/json3.ws', {
                params: {
                    Key: 'NE98-KY68-YR34-WB91', 
                    Id: suggestion.Id
                }
            });

            const details = response.data.Items[0];
            if (details) {
                const formattedAddress = {
                    flatNumber: details.BuildingNumber || '',
                    street: details.Street || '',
                    city: details.City || '',
                    postalCode: details.PostalCode || '',
                };
                setQuery(`${formattedAddress.flatNumber} ${formattedAddress.street}, ${formattedAddress.city}, ${formattedAddress.postalCode}`);
                onSelectAddress(formattedAddress);
            }
        } catch (error) {
            console.error('Error fetching address details:', error);
        }
        setSuggestions([]);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Enter address"
                className='formInputAPI'
            />
            {suggestions.length > 0 && (
                <ul className="containerAPI" style={{marginTop:"5px"}}>
                    {suggestions.map((suggestion) => (
                        <li key={suggestion.Id} onClick={() => handleSuggestionClick(suggestion)}>
                            {suggestion.Text}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default LoqateAPI;
