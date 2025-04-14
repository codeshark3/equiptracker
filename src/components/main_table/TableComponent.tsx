"use client";

import { useEffect, useState, useMemo } from "react";
import { DataTable } from "./data-table";
import { Booking, columns } from "./columns";
import { Input } from "~/components/ui/input";
import { matchSorter } from "match-sorter";
import debounce from "lodash/debounce";

interface TableComponentProps {
  initialData: Booking[];
}

const TableComponent = ({ initialData }: TableComponentProps) => {
  const [bookings, setBookings] = useState<Booking[]>(initialData);
  const [globalFilter, setGlobalFilter] = useState("");

  // Debounced filter function
  const debouncedFilter = useMemo(
    () =>
      debounce((filter: string) => {
        if (!filter) {
          setBookings(initialData);
          return;
        }

        const filteredData = matchSorter(initialData, filter, {
          keys: [
            "id",
            "name",
            "equipment_name",
            "start_time",
            "end_time",
            "project_name",
            "supervisor_name",
          ],
          threshold: matchSorter.rankings.CONTAINS,
        });

        setBookings(filteredData);
      }, 300),
    [initialData],
  );

  useEffect(() => {
    debouncedFilter(globalFilter);
    return () => {
      debouncedFilter.cancel();
    };
  }, [globalFilter, debouncedFilter]);

  return (
    <div className="space-y-4">
      {/* <div className="flex items-center justify-between">
        <Input
          placeholder="Search all columns..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm"
        />
      </div> */}
      <DataTable
        columns={columns}
        data={bookings}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};

export default TableComponent;
