import { PublicKey } from "@solana/web3.js";
import { ColumnDef } from "@tanstack/react-table";
import BN from "bn.js";
import moment from "moment";

import { IMedicalRecord } from "@/base/types";
import DropDownMenu from "@/components/molecules/app/DropModal";

export function fromAnchorRecordType(recordType: Record<string, any>): string {
    const key = Object.keys(recordType)[0];
    const map: Record<string, string> = {
        medicalHistory: "Medical History",
        medication: "Medication",
        labResults: "Lab Results",
        imaging: "Imaging",
        insurance: "Insurance",
    };

    return map[key] || "Unknown";
}

export const MedicalRecordColumn: ColumnDef<IMedicalRecord>[] = [
    {
        id: "recordId", header: "Record Id", cell: (props) => {
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
        accessorKey: "isActive",
        header: "Status",
        cell: ({ row }) => (row.original.isActive ? "Active" : "Inactive"),
    },
    {
        accessorKey: "timestamp",
        header: "Timestamp",
        cell: ({ row }) => {
            const timestamp: BN = row.original.timestamp;
            const millis = timestamp?.toNumber?.() * 1000; // assuming it's in seconds
            return moment(millis).format("YYYY-MM-DD HH:mm:ss");
        },
    },
    {
        accessorKey: "more",
        header: "more",
        cell: ({ row }) => {
            // const id = row.original?._id as string;
            const recordId = row.original.recordId

            return <DropDownMenu recordId={recordId} />
        },
        enableSorting: false,
        enableHiding: false,
    }
];