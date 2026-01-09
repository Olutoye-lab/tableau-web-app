"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
type Payment = {
    id: string
    column: string
    type: "pending" | "processing" | "success" | "failed"
    message: string
    status: string
  }

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "column",
    header: "Column",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "message",
    header: "Message",
  },
]