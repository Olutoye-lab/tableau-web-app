
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Input } from "./ui/input"
import { Separator } from "./ui/separator"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet } from "./ui/field"
import { FormEvent, useState } from "react"
import { UseTooltip } from "./UseTooltip"

export interface PageProps {
    nextPage: () => void
    prevPage?: () => void
    payload?: any
    setPayload: (payload: any) => void
}

export default function Form({nextPage, setPayload}: PageProps) {
    const [selectValue, setSelectValue] = useState<string>(".csv")
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

        let dataType = getDataType(selectValue)
        let data: any = form.get("data")
        let server_url = form.get("server url")
        let site_name = form.get("site name")
        let token_name = form.get("token name")
        let token = form.get("token")

        if (dataType === ""){
            setError("Please enter a data type")
        }

        const payload = {
            data: await data.text(),
            dataType: dataType,
            server_url: server_url,
            site_name: site_name,
            token_name: token_name,
            token: token
        }

        setPayload(payload)
        
        nextPage()
    }
    

    return (
        <div className=" border-2 border-green p-10">
        <form onSubmit={handleFormSubmission} > 
        <FieldGroup >
            <FieldSet>
                <FieldGroup>
                    <Field>
                        <FieldLegend>Tableau Mini</FieldLegend>
                        <FieldDescription>Welcome to Mini !!. Please enter the information below to get started.</FieldDescription>
                    </Field>
                    <div className="flex flex-row space-x-2">
                        <Field>
                            <FieldLabel  htmlFor="dataType">Data Type</FieldLabel>
                            <Select defaultValue=".csv" value={selectValue} onValueChange={(val)=>{setSelectValue(val)}}>
                                <SelectTrigger id="dataType">
                                    <SelectValue placeholder="Data Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value=".csv">CSV File</SelectItem>
                                    <SelectItem value=".json">Json file</SelectItem>
                                    <SelectItem value=".xls, .xlsx">Excel file</SelectItem>
                                    <SelectItem value="String">Postgres Connection String</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>

                        <Separator orientation="vertical"/>

                        <Field>
                            <FieldLabel>{selectValue || "Select a data type"}</FieldLabel> 
                            {(selectValue !== "String")?
                                <Input required name="data" type="file" accept={selectValue} className="cursor-pointer" />:
                                <Input required name="data" type="text" placeholder="postgresql:/ ... /mydatabase"/>
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
                            <Input name="server url" required placeholder="https://10ax.online.tableau.com/" /> 
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Site Name</FieldLabel>
                                <UseTooltip info="Only the <site-name> is required. e.g. https://10ax.online.tableau.com/#/site/test-site. The site name is 'test-site' "/>
                            </div>
                            <Input name="site name" required placeholder="https://10ax.online.tableau.com/#/site/<site-name>" /> 
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Personal Access Token</FieldLabel>
                                <UseTooltip info="Visit https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#go-to-your-account-settings-page to get Personal access tokens. "/>
                            </div>
                            <Input name="token" required /> 
                        </Field>
                        <Field>
                            <div className="flex flex-row gap-2">
                                <FieldLabel>Token Name</FieldLabel>
                                <UseTooltip info="Visit 'https://help.tableau.com/current/pro/desktop/en-us/useracct.htm#go-to-your-account-settings-page' to get Personal access tokens. "/>
                            </div>
                            <Input name="token name" required /> 
                        </Field>
                    </div>
                </FieldGroup>
            </FieldSet>
        </FieldGroup>

        
        <div className="flex justify-end pt-8">
            <Button type="submit" size="lg"  className="gap-2 px-8 cursor-pointer">
            Start
            <ChevronRight className="w-5 h-5" />
            </Button>
        </div>
        </form>

        </div>
    )
}