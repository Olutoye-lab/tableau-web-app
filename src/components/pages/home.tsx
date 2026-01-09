import { Separator } from "@/components/ui/separator"

export default function Home({setPage} : {setPage: Function}){
    return(
        <div className="w-full h-full flex flex-col p-10 gap-8 bg-background">
            <div className="w-full flex flex-row justify-between p-3 gap-2 mt-10">
                <div className="w-full flex flex-col items-start p-3 gap-2">
                    <p className="text-4xl font-headline font-bold text-primary">Welcome to Mini!</p>
                    <p className="text-lg text-muted-foreground">A semantic data ingestion engine helping you balance data usage with data quality.</p>
                </div>
            </div>
            <Separator />
            <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-start gap-5 p-2">
                <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center text-center" onClick={()=>setPage(1)}>
                    <h3 className="text-lg font-semibold mb-2">Start Data Ingestion</h3>
                    <p className="text-sm text-muted-foreground">Begin a new data processing job.</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer flex flex-col items-center justify-center text-center" onClick={()=>setPage(2)}>
                    <h3 className="text-lg font-semibold mb-2">Read Reports</h3>
                    <p className="text-sm text-muted-foreground">View and analyze previous reports.</p>
                </div>
            </div>

        </div>
    )
}
