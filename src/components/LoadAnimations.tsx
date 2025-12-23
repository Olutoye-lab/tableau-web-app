import { Card, CardContent } from "./ui/card";

import { DataIngestionSkeleton } from "./Animations/data-ingestion-skeleton";
import { MetadataScanningSkeleton } from "@/components/Animations/metadata-scanning-skeleton";
import { DecodingIntentSkeleton } from "@/components/Animations/decoding-intent-skeleton";
import { SemanticMappingSkeleton } from "@/components/Animations/semantic-mapping-skeleton";
import { EntityResolutionSkeleton } from "@/components/Animations/entity-resolution-skeleton";
import { FileCreationSkeleton } from "@/components/Animations/file-creation-skeleton";
import { useEffect, useState } from "react";


const skeletons = [
  {
    id: 'data-ingestion',
    name: 'Data Ingestion',
    fileName: 'Data Ingestion',
    component: DataIngestionSkeleton
  },
  {
    id: 'decoding-intent',
    name: 'Decoding User Intent',
    fileName: 'Decoding User Intent',
    component: DecodingIntentSkeleton
  },
  {
    id: 'metadata-scanning',
    name: 'Metadata Scanning',
    fileName: 'Metadata Scanning',
    component: MetadataScanningSkeleton
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
}

export default function LoadAnimations({id}: AnimationProps) {

    const ActiveSkeletonComponent = skeletons[id].component


    return (
        <Card className="w-3/4">
            <CardContent className="h-full">
                <ActiveSkeletonComponent fileName={skeletons[id].fileName} />
            </CardContent>
        </Card>
    )
}