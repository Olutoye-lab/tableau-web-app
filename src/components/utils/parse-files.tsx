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

    const workbook = XLSX.read(arrayBuffer, {type: "array"})
    const sheet = workbook.Sheets[workbook.SheetNames[0]]

    const json: any[] = XLSX.utils.sheet_to_json(sheet, {header: 1})
    
    console.log("Json", json)

    const array = json.map((row)=>{
        const obj: any = {}

        for (let i = 0; i < json[0].length; i++){
            obj[json[0][i]] = row[i]
        }
        return obj
    })
    return array
}

export {parseCSV, parseExcel}