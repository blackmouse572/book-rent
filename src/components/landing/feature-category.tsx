import { getManyBooks } from "@/apis/book";
import BookGridLoading from "@/components/book-grid-loading";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { API_GET_ALL_USER_QUERY_KEYS } from "../../apis/users";
import { IBook, IResponse } from "../../types";
import { Icons } from "../icons";
import Book from "@/components/book";

function FeartureCategory() {
    const { data, isLoading } = useQuery<IResponse<IBook[]>, AxiosError>(
        [...API_GET_ALL_USER_QUERY_KEYS],
        () =>
            getManyBooks({
                genres: "Top features",
            }),
        {
            keepPreviousData: true,
        }
    );

    const renderBooks = React.useMemo(() => {
        if (isLoading) return <BookGridLoading className="h-32" pageSize={2} />;
        return data?.data.map((book, index) => (
            <div key={index} className={`carousel-item flex-none w-60 mr-4`}>
                <Book book={book} />
            </div>
        ));
    }, [data?.data, isLoading]);

    return (
        <div className="bg-gray-100">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Feature Book
                        </h2>
                        <Link
                            to="books"
                            className="text-sm text-gray-900 flex items-center"
                        >
                            Browse all books
                            <span className="ml-1">
                                <Icons.chevronRight size={10} />
                            </span>
                        </Link>
                    </div>
                    <div className="mt-6 relative">
                        <div className="carousel-container flex overflow-hidden overflow-x-auto">
                            {renderBooks}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FeartureCategory;
