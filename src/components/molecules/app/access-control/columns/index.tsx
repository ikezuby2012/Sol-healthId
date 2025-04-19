import { IAccessControlData } from "@/base/types";
import { PublicKey } from "@solana/web3.js";
import { ColumnDef } from "@tanstack/react-table";
import BN from "bn.js";
import moment from "moment";

export const AccessControlColumn: ColumnDef<IAccessControlData>[] = [
    {
        id: "record_id", header: "Record Id", cell: (props) => {
            return props?.table?.getSortedRowModel()?.flatRows?.indexOf(props?.row) + 1
        },
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "patient",
        header: "Patient",
        cell: ({ row }) => {
            const patient: PublicKey = row.original.patient;
            return patient?.toBase58?.() ?? "N/A";
        },
    },
    {
        accessorKey: "recordType",
        header: "Record Type",
        cell: ({ row }) => {
            const recordType = Object.keys(row.original.recordType)[0];
            return recordType ?? "Unknown";
        },
    },
    {
        accessorKey: "grantedAt",
        header: "Granted at",
        cell: ({ row }) => {
            const timestamp: BN = row.original.grantedAt;
            const millis = timestamp?.toNumber?.() * 1000; // assuming it's in seconds
            return moment(millis).format("YYYY-MM-DD HH:mm:ss");
        }, // if you want to format the BN to a readable date
    },
    {
        accessorKey: "expiresAt", header: "expires at", cell: ({ row }) => {
            const timestamp: BN = row.original.expiresAt;
            const millis = timestamp?.toNumber?.() * 1000; // assuming it's in seconds
            return moment(millis).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    {
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
    },
];