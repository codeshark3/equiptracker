"use client";
import { useRouter } from "next/navigation";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "~/components/ui/button";
import { Plus, Edit, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { BookingDetailsModal } from "../BookingDetailsModal";

export type Booking = {
  id: string;
  name: string;
  date: string;
  equipment_name: string;
  start_time: string;
  end_time: string;
  project_name: string;
  supervisor_name: string;
  status: string;
  created_at: Date;
  updated_at: Date;
  approved_by: string | null;
};

export const columns: ColumnDef<Booking>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const rawDate = row.getValue("date") as string;
      const date = new Date(rawDate);
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "name",
    header: () => <div className="">Name</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
  },
  {
    accessorKey: "equipment_name",
    header: "Equipment Name",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("equipment_name")}</div>
      );
    },
  },
  {
    accessorKey: "start_time",
    header: "Start Time",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("start_time")}</div>;
    },
  },
  {
    accessorKey: "end_time",
    header: "End Time",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("end_time")}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <span
            className={`rounded-md px-2 py-1 text-sm ${
              row.getValue("status") === "approved"
                ? "bg-emerald-500 text-white"
                : row.getValue("status") === "rejected"
                  ? "bg-red-500 text-white"
                  : "bg-gray-500 text-white"
            }`}
          >
            {row.getValue("status")}
          </span>
        </div>
      );
    },
  },

  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              Details
              <span className="sr-only">{"Open Menu"}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Button
                variant={"ghost"}
                size={"sm"}
                className={"justify-start opacity-0"}
                asChild
              >
                <BookingDetailsModal
                  isOpen={true}
                  onClose={() => {}}
                  id={row.original.id}
                />
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
