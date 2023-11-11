import Book from "@/components/book";
import BookGridLoading from "@/components/book-grid-loading";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useOrderCart } from "@/hooks/useOrderCart";
import useGetManyBooks from "@/pages/(book)/useGetManyBooks";
import { IBook } from "@/types";
import React, { useCallback } from "react";

type Props = {
    book: IBook | null;
};

function BookShouldByWith({ book }: Props) {
    const { data: shouldByWithBooks, isLoading: isLoadingShouldBuyWithBooks } =
        useGetManyBooks({
            genres:
                book?.genres?.length && book.genres.length > 0
                    ? book.genres[0]
                    : "",
        });

    const { toast } = useToast();
    const { addToCart } = useOrderCart();
    const renderShouldByWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks)
            return <BookGridLoading pageSize={4} />;

        const _relatedBooks = shouldByWithBooks?.data.slice(0, 2) || [];

        return _relatedBooks?.map((book) => (
            <>
                <Book book={book} />
                <Icons.plus />
            </>
        ));
    }, [isLoadingShouldBuyWithBooks, shouldByWithBooks?.data]);

    const totalShouldBuyWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks) return 0;
        return shouldByWithBooks?.data.length || 0;
    }, [isLoadingShouldBuyWithBooks, shouldByWithBooks?.data]);

    const totalPriceShouldBuyWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks) return 0;
        return shouldByWithBooks?.data.reduce(
            (acc, book) => acc + book.rental_price,
            0
        );
    }, [isLoadingShouldBuyWithBooks, shouldByWithBooks?.data]);

    const addShouldBuyWithToCart = useCallback(() => {
        if (shouldByWithBooks?.data) {
            shouldByWithBooks?.data.forEach((book) => {
                addToCart(book._id as string);
            });
        }
        toast({
            type: "foreground",
            title: "Add to cart successfully",
            description: "Your cart have been updated",
        });
    }, [addToCart, shouldByWithBooks?.data, toast]);

    return (
        <div className="grid grid-cols-10 place-items-center py-4">
            {renderShouldByWith}
            <div className="border-border px-4 py-8 rounded-md border flex flex-col items-center justify-center gap-3">
                <Button
                    variant={"default"}
                    className=""
                    onClick={addShouldBuyWithToCart}
                >
                    <p>Add {totalShouldBuyWith}</p>
                </Button>
                <p className="text-xl font-bold">${totalPriceShouldBuyWith}</p>
            </div>
        </div>
    );
}

export default BookShouldByWith;
