import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";


export const useConfirm = (
    title: string,
    message: string
): [() => JSX.Element, () => Promise<unknown>] => {
    const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const comfirm = () => new Promise((resolve, reject) => {
        setPromise({ resolve })
    })

    const handleClose = () => {
        setPromise(null)
    }

    const handleComfirm = () => {
        promise?.resolve(true);
        handleClose()
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handleClose()
    }

    const comfirmationDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{message}</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={handleCancel}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleComfirm}
                        variant="outline"
                    >
                        Cancel
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [comfirmationDialog, comfirm]
}