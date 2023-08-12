import React, { useEffect, useRef, useState } from 'react';

const CardSetDataList = ({ items }) => {
    const [inputValue, setInputValue] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        setSuggestions(items);
    }, [items]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);

        const filteredSuggestions = items.filter(item =>
            item.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowDropdown(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!inputRef.current.contains(document.activeElement)) {
                setShowDropdown(false);
            }
        }, 200);
    };

    const visibleSuggestions = showDropdown ? suggestions : [];

    const handleSuggestOnClick = (e) => {
        setInputValue(e.target.innerHTML);
        setShowDropdown(false);
        setSuggestions([]);
    };

    return (
        <div>
            <label className="inline-block align-middle text-center w-24" htmlFor="card-set">Card Set:</label>
            <input
                id="card-set"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleInputBlur}
                ref={inputRef}
                className="border w-48 capitalize"
                aria-label="Select or search for a card set"
            />
            {showDropdown && (
                <ul className="absolute z-50 w-48 max-h-40 overflow-y-auto ml-24">
                    {visibleSuggestions.map((item, index) => (
                        <li
                            className="capitalize px-2 py-1 bg-white border cursor-pointer hover:whitespace-normal"
                            onClick={handleSuggestOnClick}
                            key={index}
                        >
                            {item.split("_").join(" ")}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CardSetDataList;
