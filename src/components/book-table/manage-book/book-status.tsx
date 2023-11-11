import { putStatusBookApi } from "@/apis/book/update-status-book";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function StatusButton({
    bookId,
    status,
}: {
    bookId: string;
    status: string;
}) {
    const queryClient = useQueryClient();

    // Tạo mutation để cập nhật trạng thái sách
    const updateStatusMutation = useMutation(() => putStatusBookApi(bookId), {
        onSuccess: () => {
            queryClient.invalidateQueries();
        },
    });

    if (updateStatusMutation.isLoading) {
        return <div className="loader">Updating...</div>;
    }

    if (updateStatusMutation.isError) {
        return (
            <div className="error">{`Error: ${updateStatusMutation.error}`}</div>
        );
    }

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => updateStatusMutation.mutate()}
        >
            {status}
        </Button>
    );
}
