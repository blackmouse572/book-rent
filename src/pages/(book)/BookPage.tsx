import { GetManyBooksParams } from "@/apis/book";
import Book from "@/components/book";
import BookFilterSidebar from "@/components/book-filter-sidebar";
import BookGridLoading from "@/components/book-grid-loading";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import MetaData from "@/components/metadata";
import Paginition from "@/components/ui/paginition";
import { useOrderCart } from "@/hooks/useOrderCart";
import useGetManyBooks from "@/pages/(book)/useGetManyBooks";
import React from "react";

const initBookState: GetManyBooksParams = {
    page: 0,
    perPage: 40,
    authors: undefined,
    genres: undefined,
    reviews: undefined,
    search: undefined,
};

function BookPage() {
    const breadcrumb = React.useMemo<IBreadcrumb[]>(() => {
        return [
            {
                label: "Home",
                key: "home",
                href: "/",
                icon: "smartHome",
            },
            {
                key: "books",
                label: "Books",
                href: "/books",
            },
        ];
    }, []);

    const [bookState, setBookState] =
        React.useState<GetManyBooksParams>(initBookState);

    const { data, isLoading, isError } = useGetManyBooks(bookState, {
        refetchOnWindowFocus: false,
    });

    const renderBooks = React.useMemo(() => {
        if (isLoading)
            return (
                <BookGridLoading
                    pageSize={8}
                    className="grid grid-cols-4 col-span-full gap-4"
                />
            );
        if (!data?.data || data.data.length === 0)
            return (
                <div className="w-full h-full col-span-full row-span-full">
                    <h3 className="text-slate-300 text-center">
                        No result found
                    </h3>
                </div>
            );
        return data?.data.map((book) => {
            return <Book key={book._id} book={book} />;
        });
    }, [data?.data, isLoading]);

    const { addToCart } = useOrderCart();
    const onRentAll = React.useCallback(() => {
        const bookIds = data?.data.map((book) => book._id);
        if (bookIds) {
            bookIds.forEach((bookId) => {
                addToCart(bookId as string);
            });
        }
    }, [addToCart, data?.data]);

    const totalPage = React.useMemo(() => {
        return data?._pagination?.totalPage || 1;
    }, [data?._pagination?.totalPage]);

    const totalBook = React.useMemo(() => {
        return data?._pagination?.total || 0;
    }, [data?._pagination?.total]);

    if (isError) return <div>Something went wrong</div>;
    return (
        <main className="container mx-auto min-h-screen w-full">
            <MetaData title="Books" />
            <Breadcrumb items={breadcrumb} className="my-8 w-full" />
            <div className="flex gap-2 w-full mb-8">
                <section
                    key="main.section.sidebar"
                    className="w-1/4 h-min bg-accent sticky top-20 rounded-md px-4 py-5"
                >
                    <BookFilterSidebar
                        onFilterChange={(data) => {
                            setBookState((prev) => ({
                                ...prev,
                                ...data,
                            }));
                        }}
                        onRentAll={onRentAll}
                        totalBooks={totalBook}
                    />
                </section>
                <section
                    key="main.section.books"
                    className="grid grid-cols-4 flex-1 gap-5"
                >
                    {renderBooks}
                    <div className="col-span-full w-fit mx-auto">
                        <Paginition
                            currentPage={bookState.page || 1}
                            totalPage={totalPage}
                            onPageChange={(page) => {
                                setBookState((prev) => ({
                                    ...prev,
                                    page,
                                }));
                            }}
                            onPreviousPage={() => {
                                setBookState((prev) => ({
                                    ...prev,
                                    page: prev.page! - 1,
                                }));
                            }}
                            onNextPage={() => {
                                setBookState((prev) => ({
                                    ...prev,
                                    page: prev.page! + 1,
                                }));
                            }}
                        />
                    </div>
                </section>
            </div>
        </main>
    );
}

export default BookPage;
