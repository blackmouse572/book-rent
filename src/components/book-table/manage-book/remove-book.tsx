import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteBookById } from "@/apis/book/delete-book";

export function RemoveBookApi({ bookId }: { bookId: string }) {  
    const queryClient = useQueryClient();

  // Tạo mutation để ban user
  const removeBookMutation = useMutation(() => deleteBookById(bookId), {
    onSuccess: () => {
      // Sau khi mutation hoàn thành thành công, bạn có thể làm một số việc sau đây:
      // - Invalidates queries để cập nhật lại dữ liệu.
      // - Hiển thị thông báo thành công.
      queryClient.invalidateQueries();
    },
  });

  if (removeBookMutation.isLoading) {
    return <div className="loader">Removing...</div>;
  }

  if (removeBookMutation.isError) {
    return <div className="error">{`Error: ${removeBookMutation.error}`}</div>;
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => removeBookMutation.mutate()}
    >
      Remove
    </Button>
  );
}
