import { Card, CardContent } from "./ui/card";

import { DataIngestionSkeleton } from "./Animations/data-ingestion-skeleton";
import { MetadataScanningSkeleton } from "@/components/Animations/metadata-scanning-skeleton";
import { DecodingIntentSkeleton } from "@/components/Animations/decoding-intent-skeleton";
import { SemanticMappingSkeleton } from "@/components/Animations/semantic-mapping-skeleton";
import { EntityResolutionSkeleton } from "@/components/Animations/entity-resolution-skeleton";
import { FileCreationSkeleton } from "@/components/Animations/file-creation-skeleton";
import { TestData } from "./Animations/final-score-skeleton";
import FinalScoreSkeleton from "./Animations/final-score-skeleton";
import { useRef } from "react";


const skeletons = [
  {
    id: 'data-ingestion',
    name: 'Data Ingestion',
    fileName: 'Data Ingestion',
    component: DataIngestionSkeleton
  },
  {
    id: 'metadata-scanning',
    name: 'Metadata Scanning',
    fileName: 'Metadata Scanning',
    component: MetadataScanningSkeleton
  },
  {
    id: 'decoding-intent',
    name: 'Decoding User Intent',
    fileName: 'Decoding User Intent',
    component: DecodingIntentSkeleton
  },
  {
    id: 'semantic-mapping',
    name: 'Semantically Mapping Data',
    fileName: 'Semantically Mapping Data',
    component: SemanticMappingSkeleton
  },
  {
    id: 'entity-resolution',
    name: 'Entity Resolution in Data',
    fileName: 'Column Entity Resolution',
    component: EntityResolutionSkeleton
  },
  {
    id: 'file-creation',
    name: 'Creating Files and Publishing Data',
    fileName: 'Publishing Data',
    component: FileCreationSkeleton
  }
];

interface AnimationProps {
    id: number
    results: any | null
}

export default function LoadAnimations({results, id}: AnimationProps) {
    const final_result = useRef<any>({})

    if (id == 5){
      final_result.current = results
    }
    
    const ActiveSkeletonComponent = skeletons[id].component

    if (results == null){
      results = {
        report : TestData
      }
    }
    
    return (
        <Card className="w-3/4">
            <CardContent className="h-full">
              {(id === 5)? <FinalScoreSkeleton data={final_result.current}/> :<ActiveSkeletonComponent />}
            </CardContent>
        </Card>
    )
}