import Link from "next/link";
import React from "react";
import { getDatasets } from "~/server/dataset_queries";

import { toast } from "~/hooks/use-toast";
import { Button } from "~/components/ui/button";
import DatasetDeleteButton from "~/components/forms/DatasetDeleteButton";

const Page = async ({
  searchParams,
}: {
  searchParams: { search?: string };
}) => {
  const data = await getDatasets();
  const searchQuery = searchParams.search?.toLowerCase() || '';

  const filteredData = searchQuery
    ? data.filter((dataset) =>
      dataset.title.toLowerCase().includes(searchQuery) ||
      (dataset.description && dataset.description.toLowerCase().includes(searchQuery))
    )
    : data;

  return (
    <div>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Datasets</h1>
          <Link
            href="/datasets/create"
            className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create New Dataset
          </Link>
        </div>

        <form className="mb-6">
          <div className="relative">
            <input
              type="text"
              name="search"
              defaultValue={searchParams.search}
              placeholder="Search datasets..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </form>

        <div className="grid gap-4">
          {filteredData.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">
                {searchQuery
                  ? "No datasets found matching your search."
                  : "No datasets found. Create your first dataset!"}
              </p>
            </div>
          ) : (
            <div className="bg-white shadow rounded-lg divide-y">
              {filteredData.map((dataset) => (
                <div key={dataset.id} className="p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{dataset.title}</h3>
                    {dataset.description && (
                      <p className="mt-1 text-sm text-gray-500 line-clamp-2">{dataset.description}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/datasets/${dataset.id}`}
                      className="text-primary hover:text-primary/90 px-3 py-1.5 text-sm font-medium rounded-md border border-gray-200 hover:border-primary/30"
                    >
                      View Details
                    </Link>
                    <DatasetDeleteButton datasetId={dataset.id} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
