import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectTrigger, SelectContent, SelectGroup, SelectLabel, SelectItem, SelectValue } from "../ui/select";

export default function ScoreBlock({scores}: {scores: any[]}){
    const [activeValue, setActiveValue] = useState<string>("")

    return (
        <Card className="flex flex-col justify-between shadow-md">
            <CardHeader>
                <CardTitle>Column Scores</CardTitle>
                <Select onValueChange={(val)=> setActiveValue(val)} >
                    <SelectTrigger className="w-[180px] bg-background mt-2">
                        <SelectValue placeholder="Select a column" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                        {scores.map((item: any, index: number)=>(
                            <SelectItem key={index} value={item["name"]}>{item["name"]}</SelectItem>
                        ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </CardHeader>
            
            <CardContent className="text-center flex-grow flex items-center justify-center">
                {(activeValue.length !== 0) ?
                <p className="text-6xl font-bold text-primary">{scores.find((item: any)=>item["name"] === activeValue)["score"]}</p>:
                <p className="text-muted-foreground">Please select a column</p>}
            </CardContent>
            <CardFooter className="text-sm text-muted-foreground">Quality score</CardFooter>
        </Card>
    )
}
