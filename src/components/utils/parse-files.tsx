import Papa from "papaparse";
import * as XLSX from 'xlsx'

const parseCSV = async(file: File) => {
    let data
    const text = await file.text()
    console.log(text)
    Papa.parse(text, {
            header: true,   // Treat first row as header
            skipEmptyLines: true,
            dynamicTyping: true,  // Convert numbers automatically
            complete: (result) => {
                console.log(result.data)
                data = result.data
        },
            error: (err: any) => {
            console.error("Error reading file:", err);
        }}
    )
    return data
}

const parseExcel = async(file: File) => {

    const arrayBuffer = await file.arrayBuffer()

    const workbook = XLSX.read(arrayBuffer, {type: "array", cellDates: true})
    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    let json: any[] = XLSX.utils.sheet_to_json(sheet, {
        header: 1, 
        raw: false,
        dateNF: 'yyyy-mm-dd"T"hh:mm:ss".000Z"'})

    const array = json.map((row)=>{

        const obj: any = {}

        for (let i = 0; i < json[0].length; i++){
            obj[json[0][i]] = row[i]
        }
        console.log(obj)
        return obj
    })
    return array.slice(1)
}

export {parseCSV, parseExcel}