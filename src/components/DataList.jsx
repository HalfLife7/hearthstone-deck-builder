import React, {useEffect, useRef, useState} from "react";

const DataList = ({items, onChange, label}) => {
    const hyphenatedLabel = label.toLowerCase().replace(/ /g, '-')

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
            item.replace(/_/g, " ").toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
        setShowDropdown(true);
    };

    const handleInputBlur = () => {
        setTimeout(() => {
            if (!inputRef.current?.contains(document.activeElement)) {
                setShowDropdown(false);
            }
        }, 200);
    };

    const visibleSuggestions = showDropdown ? suggestions : [];

    const handleSuggestOnClick = (e) => {
        setInputValue(e.target.innerHTML);
        setShowDropdown(false);
        setSuggestions([]);
        onChange(e.target.innerHTML);
    };

    const handleOnKeyDown = (e) => {
        if (e.key === 'Escape') {
            onChange(e.target.value);
            inputRef.current.blur();
        }

        if (e.key === 'Enter') {
            onChange(e.target.value);
            inputRef.current.blur();
        }
    }

    return (
        <div>
            <label className="inline-block align-middle text-center w-24"
                   htmlFor={`${hyphenatedLabel}-data-list`}>{label}:</label>
            <input
                id={hyphenatedLabel}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleOnKeyDown}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleInputBlur}
                ref={inputRef}
                className="border w-48 capitalize"
                aria-label={`Select a ${label.toLowerCase()}`}
            />
            {showDropdown && (
                <ul className="absolute z-30 w-48 max-h-40 overflow-y-auto ml-24">
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
    )
}

export default DataList
