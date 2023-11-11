import Book from "@/components/book";
import BookGridLoading from "@/components/book-grid-loading";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useOrderCart } from "@/hooks/useOrderCart";
import { formatPrice } from "@/lib/utils";
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

    const relatedBooks = React.useMemo(() => {
        if (
            isLoadingShouldBuyWithBooks ||
            !book ||
            !shouldByWithBooks ||
            shouldByWithBooks?.data.length < 2
        )
            return [];

        const arr =
            shouldByWithBooks?.data
                .filter((b) => b._id !== book?._id)
                .slice(0, 4) || [];
        //Add current book to the first position
        arr.unshift(book);

        return arr;
    }, [book, isLoadingShouldBuyWithBooks, shouldByWithBooks?.data]);

    const { toast } = useToast();
    const { addToCart } = useOrderCart();
    const renderShouldByWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks)
            return <BookGridLoading pageSize={4} />;
        return relatedBooks?.map((book) => (
            <>
                <Book book={book} />
                <Icons.plus />
            </>
        ));
    }, [isLoadingShouldBuyWithBooks, relatedBooks]);

    const totalShouldBuyWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks) return 0;
        return relatedBooks.length || 0;
    }, [isLoadingShouldBuyWithBooks, relatedBooks.length]);

    const totalPriceShouldBuyWith = React.useMemo(() => {
        if (isLoadingShouldBuyWithBooks) return 0;
        return relatedBooks.reduce((acc, book) => acc + book.rental_price, 0);
    }, [isLoadingShouldBuyWithBooks, relatedBooks]);

    const addShouldBuyWithToCart = useCallback(() => {
        if (relatedBooks.length === 0) return;

        relatedBooks.forEach((book) => {
            addToCart(book._id as string);
        });

        toast({
            type: "foreground",
            title: "Add to cart successfully",
            description: "Your cart have been updated",
        });
    }, [addToCart, relatedBooks, toast]);

    if (!book) return null;

    return (
        <div className="grid grid-cols-10 place-items-center py-4">
            {renderShouldByWith}
            {relatedBooks.length > 0 && (
                <div className="border-border px-4 py-8 rounded-md border flex flex-col items-center justify-center gap-3">
                    <Button
                        variant={"default"}
                        className=""
                        onClick={addShouldBuyWithToCart}
                    >
                        <p>Add {totalShouldBuyWith}</p>
                    </Button>
                    <p className="text-xl font-bold">
                        {formatPrice(totalPriceShouldBuyWith)}
                    </p>
                    <p className="text-sm text-gray-500">
                        for {relatedBooks.length} books
                    </p>
                </div>
            )}
        </div>
    );
}

export default BookShouldByWith;
