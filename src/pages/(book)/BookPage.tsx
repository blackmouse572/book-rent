import { GetManyBooksParams } from "@/apis/book";
import BookFilterSidebar from "@/components/book-filter-sidebar";
import BookGridLoading from "@/components/book-grid-loading";
import { IBreadcrumb } from "@/components/breadcrumb";
import Breadcrumb from "@/components/breadcrumb/breadcrumb";
import MetaData from "@/components/metadata";
import Paginition from "@/components/ui/paginition";
import useGetManyBooks from "@/pages/(book)/useGetManyBooks";
import React from "react";
import { Link } from "react-router-dom";

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
        if (isLoading) return <BookGridLoading pageSize={bookState.perPage!} />;
        if (!data?.data || data.data.length === 0)
            return (
                <div className="w-full h-full col-span-full row-span-full">
                    <h3 className="text-slate-300 text-center">
                        No result found
                    </h3>
                </div>
            );
        return data?.data.map((book) => {
            return (
                <Link
                    to={`/books/${book._id}`}
                    key={book._id}
                    className="w-full group"
                >
                    <div className="overflow-clip aspect-[5/7] w-full rounded-md shadow-md border border-gray-200 group-hover:shadow-xl transition-all duration-300">
                        <img
                            src={book.image}
                            alt={book.name}
                            className="aspect-[5/7] object-contain group-hover:scale-105 transition-all duration-300"
                            height={700}
                            width={500}
                        />
                    </div>
                    <h3 className="text-base font-medium">{book.name}</h3>
                    <p className="text-xs">By&nbsp;{book.author}</p>
                    <h6 className="text-lg font-bold mt-1">
                        ${book.rental_price}
                    </h6>
                </Link>
            );
        });

    }, [bookState.perPage, data?.data, isLoading]);

    const totalPage = React.useMemo(() => {
        return data?._pagination?.totalPage || 1;
    }, [data?._pagination?.totalPage]);

    if (isError) return <div>Something went wrong</div>;
    return (
        <main className="container mx-auto min-h-screen w-full">
            <MetaData title="Books" />
            <Breadcrumb items={breadcrumb} className="my-8 w-full" />
            <div className="flex gap-2 w-full">
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
