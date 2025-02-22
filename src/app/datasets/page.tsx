import Link from "next/link";
import React from "react";
import { getDatasets } from "~/server/dataset_queries";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import DatasetDeleteButton from "~/components/forms/DatasetDeleteButton";
import UpdateDataset from "~/components/forms/UpdateDataset";
const page = async () => {
  const data = await getDatasets();

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      {data.map((dataset) => (
        <div key={dataset.id} className="flex items-center gap-2">
          <span>{dataset.title}</span>
          <DatasetDeleteButton datasetId={dataset.id} />
          <UpdateDataset datasetId={dataset.id} data={dataset} />
          <Link href={`/datasets/${dataset.id}`}>View</Link>
        </div>
      ))}
      <Link href="/datasets/create" className="h-4 w-40 bg-primary text-white">
        Create
      </Link>
    </div>
  );
};

export default page;
