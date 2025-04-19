import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowRight } from 'lucide-react';

import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    ColumnDef,
    getSortedRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import { cn } from "@/base/utils";

interface TableProps<TData, Tvalue> {
    columns: ColumnDef<TData, Tvalue>[];
    data: TData[];
    pageCount: number;
}

const Index = <TData, Tvalue>({ columns, data, pageCount = 20 }: TableProps<TData, Tvalue>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const searchParams = useSearchParams();
    const page = Number(searchParams.get("page")) ?? 1;

    const setPage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set("page", String(page));
        //router.push(`?${params.toString()}`);
    };

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        manualPagination: true,
        pageCount,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        initialState: { pagination: { pageSize: 50 } },
    });

    const paginationButtons: React.ReactNode[] = [];
    for (let i = 0; i < (table?.getPageCount() ?? 0); i++) {
        let currentPage;
        if (table.getState().pagination.pageIndex === i) currentPage = true;
        paginationButtons.push(
            <button
                className={cn(
                    "text-black dark:text-white text-sm h-8 w-8 flex items-center rounded-full   justify-center",
                    currentPage &&
                    "bg-gradient-dark p-3 dark:bg-white dark:text-black text-white "
                )}
                key={i}
                onClick={() => { setPage(i + 1); table.setPageIndex(i) }}
            >
                {/* {i + 1} */}
            </button>
        );
    }

    return (
        <div>
            <div className="bg-white space-y-3  p-2 overflow-x-scroll thin-scrollbar">
                <table className="min-w-full">
                    <thead className=" border-b-2  dark:!bg-[#0A344f] dark:border-b-darkBlue bg-white">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        className="px-2 py-3 text-xs text-gray-500 dark:text-white capitalize leading-normal text-left whitespace-nowrap"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column?.columnDef.header,
                                                header.getContext()
                                            )}
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="!bg-white  text-black border-y-2 dark:border-y-darkBlue"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <td
                                            className="whitespace-nowrap text-left text-xs text-gray-500 capitalize px-2 py-2  2xl:tracking-wide "
                                            key={cell.id}
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="h-24 text-center text-lg capitalize text-black dark:text-white font-medium"
                                >
                                    no results found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="flex items-center py-4 mt-2 px-6 justify-between border-t border-gray-200 dark:border-white ">
                <button
                    onClick={() => { setPage(page - 1); table.previousPage() }}
                    disabled={page === 1 || !page}
                    className="dark:bg-white dark:text-black text-black text-sm border border-black dark:border-transparent flex items-center gap-2 rounded-md py-2 px-2 md:px-6 capitalize disabled:opacity-40 disabled:pointer-events-auto"
                >
                    <ArrowLeft />
                    <span className="hidden md:block"> previous</span>
                </button>
                <div className="md:flex items-center gap-4 hidden">
                    {/* {paginationButtons.map((b) => b)} */}
                </div>
                <div className=" text-sm text-black dark:text-white md:hidden">
                    Page {table.getState().pagination.pageIndex + 1} of{" "}
                    {table.getPageCount()}{" "}
                </div>
                <button
                    onClick={() => { setPage(page + 1); table.nextPage() }}
                    disabled={!table.getCanNextPage()}
                    className="dark:bg-white dark:text-black text-black text-sm border border-black dark:border-transparent flex items-center gap-2 rounded-md py-2 px-2 md:px-6 capitalize disabled:opacity-40 disabled:pointer-events-auto"
                >
                    <ArrowRight />
                    <span className="hidden md:block"> next</span>
                </button>
            </div>
        </div>
    )
}


export default Index;