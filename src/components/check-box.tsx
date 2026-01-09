import { useEffect, useState } from 'react';
import { DisplaySheet } from './display-sheet';
import { Input } from './ui/input';
import Papa from "papaparse";


function FileCheckboxes({setFile, setFileName}: {setFile: Function, setFileName: Function}) {
    const [checkedName, setCheckedName] = useState<string | null>(null);
    const [GoodData, setGoodData] = useState<unknown>("")
    const [BadData, setBadData] = useState<unknown>("")


    const SheetData = {
        "good_data": {
            name: "Good Sample Dataset",
            description: "This is an ideal, high quality dataset. \n Its features include: \n - Consistent Naming schema \n - Lack of null values \n  - Relevant header names",
            data: GoodData
        },
        "bad_data": {
            name: "Bad Sample Dataset",
            description: "This is a low quality dataset. \n Its features include: \n - Inconsistent Naming schema \n - Significantly high number of null values \n  - Irrelevant header names",
            data: BadData
        }
    }

    const handleChange = (val: string | null) => {
        setCheckedName((prev) => (prev === val ? null : val))
        setFileName(val)
        setFile(( val && val.includes("good"))? SheetData.good_data: SheetData.bad_data)
    };

    const checkboxes = [
    {
        name: 'good_data.csv',
        key: 'checkBox1',
        label: 'good',
    },
    {
        name: 'bad_data.csv',
        key: 'checkBox2',
        label: 'bad',
    },
    ];

    useEffect(()=>{

        Papa.parse("/good_data.csv", {
            download: true, // Required for fetching from URL
            header: true,   // Treat first row as header
            skipEmptyLines: true,
            dynamicTyping: true,  // Convert numbers automatically
            complete: (result) => {
            setGoodData(result.data)
        },
            error: (err) => {
            console.error("Error reading CSV:", err);
        }}
        )

        Papa.parse("/bad_data.csv", {
            download: true, // Required for fetching from URL
            header: true,   // Treat first row as header
            skipEmptyLines: true,
            dynamicTyping: true,  // Convert numbers automatically
            complete: (result) => {
            setBadData(result.data)
        },
            error: (err) => {
            console.error("Error reading CSV:", err);
        }}
        )
    })

 return (
   <div className='flex flex-col gap-1 w-1/5'>
    <p className='text-md italic'>Sample Datasets</p>
     {checkboxes.map((item) => (
        <div className='flex flex-row items-center justify-between gap-2 text-sm' key={item.key}>
         <Input
            type='checkbox'
            className='rounded-xl size-5 bg-white'
            name={item.name}
            checked={item.name === checkedName}
            onChange={(e)=>(e.target.checked)? handleChange(item.name): handleChange(null)}
         />
        <label>{item.name}</label>
        <DisplaySheet data={(item.label === "good")? SheetData.good_data: SheetData.bad_data} />
        </div>
     ))}
   </div>
 );
}
export default FileCheckboxes;