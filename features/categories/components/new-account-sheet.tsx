import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { insertAccountSchema } from "@/db/schema";
import { z } from "zod";
import { useCreateAccount } from "../api/use-create-account";
import { useNewCategory } from "../hooks/use-new-category";
import { AccountForm } from "./account-form";

const formSchema = insertAccountSchema.pick({
    name: true
});

type FormValues = z.input<typeof formSchema>;

function NewAccountSheet() {
    const { isOpen, onClose } = useNewCategory();

    const mutation = useCreateAccount()
    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose()
            }
        })
    }
  return (
      <Sheet open={isOpen} onOpenChange={onClose}>
          <SheetContent className="space-y-4">
              <SheetHeader>
                  <SheetTitle>
                      New Account
                  </SheetTitle>
                  <SheetDescription>
                      Create a new account to track your transactions
                  </SheetDescription>
              </SheetHeader>
              <AccountForm
                  onSubmit={onSubmit}
                  disabled={mutation.isPending}
                  defaultValues={{
                      name: ""
                  }}
              />
          </SheetContent>
    </Sheet>
  )
}

export default NewAccountSheet