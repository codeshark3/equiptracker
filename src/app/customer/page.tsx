import React from "react";
import TableComponent from "./TableComponent";

import { getSavedDatasets } from "~/server/dataset_queries";
import RequestStatisticsComponent from "./RequestStatisticsComponent";
import { getAllUserAccessRequestCounts } from "~/server/access_request_queries";
const page = async () => {
  //const accessRequests = await getAllUserAccessRequests();
  const savedDatasets = await getSavedDatasets();
  if ("error" in savedDatasets) {
    return <div>Error loading saved datasets</div>;
  }

  const counts = await getAllUserAccessRequestCounts();
  // Format dates if needed
  const formattedData = savedDatasets.map((dataset) => ({
    ...dataset,
    // createdAt: request.createdAt.toISOString(),
  }));

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-8 scroll-m-20 text-4xl font-bold tracking-tight">
        My Access Requests
      </h1>
      <RequestStatisticsComponent counts={counts} />
      <div className="mt-8">
        <h2 className="mb-4 text-2xl font-bold">Saved Datasets</h2>
        <TableComponent initialData={formattedData} />
      </div>
    </div>
  );
};

export default page;
