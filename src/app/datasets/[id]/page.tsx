import Link from "next/link";
import React from "react";

import { getDatasetById } from "~/server/dataset_queries";

interface Props {
  params: {
    id: number;
  };
}



const DatasetDetailsPage = async ({ params }: Props) => {
  const { id } = await params;
  const dataset = await getDatasetById(id);

  return (
    <div>
      {dataset.map((dataset) => (
        <div key={dataset.id}>
          <span>{dataset.title}</span>
          <span>{dataset.year}</span>
          <span>{dataset.pi_name}</span>
          <span>{dataset.description}</span>
          <span>{dataset.division}</span>
          <span>{dataset.papers}</span>
          <span>{dataset.tags}</span>
        </div>
      ))}

      <Link href="/datasets">Go Back</Link>
      <Link href={`/datasets/${id}/update/`}>Update</Link>

    </div>
  );
};

export default DatasetDetailsPage;
