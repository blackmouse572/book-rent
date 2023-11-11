import { getManyBooks } from "@/apis/book";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import clsx from "clsx";
import { useState } from "react";
import { API_GET_ALL_USER_QUERY_KEYS } from "../../apis/users";
import { IBook, IResponse } from "../../types";
import { Icons } from "../icons";

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const queryController = useQuery<IResponse<IBook[]>, AxiosError>(
        [...API_GET_ALL_USER_QUERY_KEYS],
        () => getManyBooks({ genres: "Top 100 books of all time" }),
        {
            keepPreviousData: true,
        }
    );

    const books = queryController.data?.data || [];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % books.length);
    };

    const previousSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + books.length) % books.length
        );
    };

    const booksContent = (
        <div className="flex flex-row justify-between">
            {books.map((book, index) => (
                <div
                    key={index}
                    className={`h-full absolute text-right top-10 pr-40 right-24 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h2 className="text-right text-2xl pr-40">{book.name}</h2>
                    <p className="text-right pr-40">
                        {book?.category?.pop()?.name}
                    </p>
                    <p className="text-right pr-40">{book.author}</p>
                </div>
            ))}
            {books.map((book, index) => (
                <img
                    key={index}
                    src={book.image}
                    alt={book.name}
                    className={`h-full absolute top-0 ${
                        index === currentSlide ? "right-0" : "left-0"
                    } justify-end ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </div>
    );

    const slideButtons = books.map((_, index) => (
        <button
            key={index}
            type="button"
            className={clsx("w-3 h-3 rounded-full", {
                "bg-white": index === currentSlide,
                "bg-gray-300": index !== currentSlide,
                "dark:bg-gray-800/30": true,
            })}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
        />
    ));

    return (
        <div
            id="default-carousel"
            className="relative w-full"
            data-carousel="slide"
        >
            <div className="relative h-56 md:h-96 overflow-hidden rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500">
                <div className="flex flex-col">
                    <div className="flex items-center px-4 py-16 lg:py-0 ">
                        <div className="hero w-full row min-height-588 align-items-center ">
                            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center ">
                                <div className="text-left h-56 md:h-96">
                                    <div className="p-4 md:px-16 lg:py-20">
                                        <p className="text-2xl font-semibold text-gray-400 mb-2">
                                            The Bookworm Editors
                                        </p>
                                        <h2 className="text-5xl mb-4">
                                            <span className="font-normal block">
                                                Featured Books of the
                                            </span>
                                            <span className="font-semibold block">
                                                February
                                            </span>
                                        </h2>
                                        <a
                                            href="#"
                                            className="btn dark btn-wide rounded-0"
                                        >
                                            <span>See More</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="text-center h-56 md:h-96 ">
                                    {booksContent}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                {slideButtons}
            </div>
            <button
                type="button"
                className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-prev
                onClick={previousSlide}
            >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover-bg-white/50 dark:group-hover-bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <Icons.chevronLeft size={25} />
                    <span className="sr-only">Previous</span>
                </div>
            </button>
            <button
                type="button"
                className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                data-carousel-next
                onClick={nextSlide}
            >
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover-bg-white/50 dark:group-hover-bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                    <Icons.chevronRight size={25} />
                    <span className="sr-only">Next</span>
                </div>
            </button>
        </div>
    );
}

export default Carousel;
