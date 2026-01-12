
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "./ui/field"
import { FormEvent, useEffect, useState } from "react"
import { UseTooltip } from "./UseTooltip"
import FileCheckboxes from "./check-box"
import { Card } from "./ui/card"
import PasswordInput from "./password-input"

export interface PageProps {
    nextPage: () => void
    prevPage?: () => void
    payload?: any
    setPayload: (payload: any) => void
}

export default function Form({nextPage, setPayload}: PageProps) {
    const [selectValue, setSelectValue] = useState<string>(".csv")
    const [fileName, setFileName] = useState<string>("")
    const [fileData, setFileData] = useState<any>({data: []})
    const [error, setError] = useState<string>("")

    const getDataType = (value: string) => {
        if (value === ".csv")
            return "csv"
        else if (value === ".json")
            return "json"
        else if (value === ".xls, .xlsx")
            return "xlsx"
        else
            return "string"
    }

    const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = new FormData(e.currentTarget)

        console.log("File Data", fileData)

        let dataType = getDataType(selectValue)
        let data: any = form.get("data")
        let server_url = form.get("server url")
        let site_name = form.get("site name")
        let token_name = form.get("token name")
        let token = form.get("token")

        if (dataType === ""){
            setError("Please enter a data type")
        }

        const sample_data: any[] = fileData["data"]

        if (!form.get("data")) {
            data = sample_data
        }

        const payload = {
            data: data,
            dataType: dataType,
            server_url: server_url,
            site_name: site_name,
            token_name: token_name,
            token: token
        }

        setPayload(payload)
        
        nextPage()
    }

    useEffect(()=>{
        setSelectValue(".csv")
    }, [fileData])
    

    return (
        <div className=" border-2 border-green p-10">
        <form onSubmit={handleFormSubmission} > 
        <FieldGroup >
            <FieldSet>
                <FieldGroup>
                    <div className="flex flex-row">
                    <Field>
                        <FieldLegend>Tableau Mini</FieldLegend>
                        <FieldDescription>Welcome to Mini !!. Please enter the information below to get started.</FieldDescription>
                    </Field>       
                    <FileCheckboxes setFileName={setFileName} setFile={setFileData}/>
                    </div>

                    <div className="flex flex-row space-x-2">
                        <Field>
                            <FieldLabel  htmlFor="dataType">Data Type</FieldLabel>
                            <Select defaultValue=".csv" value={selectValue} onValueChange={(val)=>{setSelectValue(val)}}>
                                <SelectTrigger id="dataType">
                                    <SelectValue placeholder="Data Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {(fileName)?
                                    <SelectItem value=".csv">CSV File</SelectItem>:
                                    <>
                                    <SelectItem value=".csv">CSV File</SelectItem>
                                    <SelectItem value=".json">Json file</SelectItem>
                                    <SelectItem value=".xls, .xlsx">Excel file</SelectItem>
                                    <SelectItem value="String">Postgres Connection String</SelectItem>
                                    </>
                                    }   
                                </SelectContent>
                            </Select>
                        </Field>

                        <Separator orientation="vertical"/>

                        <Field>
                            <FieldLabel>{selectValue || "Select a data type"}</FieldLabel> 
                            {(selectValue !== "String")?
                                (fileName)?
                                    <Card className="h-9 flex items-start justify-center rounded-lg p-2 shadow-none font-sans">{fileName}</Card>
                                    : <Input required name="data" type="file" accept={selectValue} className="cursor-pointer" />
                                : <Card className="h-9 flex items-start justify-center rounded-lg p-2 shadow-none font-sans">In development!!</Card>
                            }
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>

            <FieldSeparator />

            <FieldSet>
                <FieldGroup>
                    <div className="grid grid-cols-2 gap-6">
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Server URL</FieldLabel>
                                <UseTooltip info="For tableau cloud users: https://10ax.online.tableau.com/"/>
                            </div>
                            <Input role="textbox" aria-label="server url" name="server url" required placeholder="https://10ax.online.tableau.com/"  /> 
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Site Name</FieldLabel>
                                <UseTooltip info="Only the <site-name> is required. e.g. https://10ax.online.tableau.com/#/site/test-site. The site name is 'test-site' "/>
                            </div>
                            <Input role="textbox" aria-label="site" name="site name" required placeholder="https://10ax.online.tableau.com/#/site/<site-name>"/> 
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Personal Access Token</FieldLabel>
                                <UseTooltip info="Visit https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#go-to-your-account-settings-page to get Personal access tokens. "/>
                            </div>
                            <PasswordInput name={'token'} />
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Token Name</FieldLabel>
                                <UseTooltip info="Visit 'https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#go-to-your-account-settings-page' to get Personal access tokens. "/>
                            </div>
                            <PasswordInput name={'token name'}/>
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>

        
        <div className="flex justify-end pt-8">
            <Button role="button" type="submit" aria-label="submit" size="lg"  className="gap-2 px-8 cursor-pointer">
            Start
            <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
        </form>

        </div>
    )
}