import React from 'react';
import DataList from "./DataList.jsx";

const CardSetDataList = ({items, onChange}) => {
    return (
        <DataList items={items} onChange={onChange} label={"Card Set"}/>
    )
};

export default CardSetDataList;
