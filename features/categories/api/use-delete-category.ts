import { InferResponseType } from "hono";
import { toast } from "sonner";

import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.categories[":id"]["$delete"]>

export const useDeleteCategory = (id?:string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error
        >({
            mutationFn: async () => {
                const response = await client.api.categories[":id"]["$delete"]({
                    param: { id },
                });
                return await response.json()
            },
            onSuccess: () => {
                toast.success("Category deleted")
                queryClient.invalidateQueries({ queryKey: ["categories",{ id }]})
                queryClient.invalidateQueries({ queryKey: ["categories"] })
                queryClient.invalidateQueries({ queryKey: ["transactions"] })
                // TODO: Invalidate summary and transactions
            },
            onError: () => {
                toast.error("Failed to delete category")
            }

        })
    
    return mutation;
}