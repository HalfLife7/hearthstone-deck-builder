import React from 'react'
import DataList from "./DataList.jsx";

const classes = [
    "Death Knight",
    "Demon Hunter",
    "Druid",
    "Hunter",
    "Mage",
    "Paladin",
    "Priest",
    "Rogue",
    "Shaman",
    "Warlock",
    "Warrior",
]
const classDataList = ({onChange}) => {
    return (
        <DataList items={classes} label="Class" onChange={onChange}/>
    )
}

export default classDataList
