import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.accounts[":id"]["$patch"]>
type RequestType = InferRequestType<typeof client.api.accounts[":id"]["$patch"]>["json"]

export const useEditAccount = (id?:string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
        >({
            mutationFn: async (json) => {
                const response = await client.api.accounts[":id"]["$patch"]({
                    param: { id },
                    json
                });
                return await response.json()
            },
            onSuccess: () => {
                toast.success("Account updated")
                queryClient.invalidateQueries({ queryKey: ["accounts",{ id }]})
                queryClient.invalidateQueries({ queryKey: ["accounts"] })
                // TODO: Invalidate summary and transactions
            },
            onError: () => {
                toast.error("Failed to create account")
            }

        })
    
    return mutation;
}