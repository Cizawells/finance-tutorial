"use client"

import { useMountedState } from "react-use";

import EditAccountSheet from "@/features/accounts/components/edit-account-sheet copy";
import NewAccountSheet from "@/features/accounts/components/new-account-sheet";

function SheetProvider() {
  const isMounted = useMountedState();

  if(!isMounted) return null
  return (
      <>
      <NewAccountSheet />
      <EditAccountSheet />
      </>
  )
}

export default SheetProvider