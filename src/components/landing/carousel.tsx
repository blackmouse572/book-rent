import { Icons } from '../icons';
import { useState } from "react";
import { API_GET_ALL_USER_QUERY_KEYS, getAllUserApi } from "../../apis/users";
import { IResponse, User } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";

function Carousel() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const queryController = useQuery<IResponse<User[]>, AxiosError>(
        [...API_GET_ALL_USER_QUERY_KEYS],
        () => getAllUserApi({}),
        {
            keepPreviousData: true,
        }
    );

    const users = queryController.data?.data || [];

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % users.length);
    };

    const previousSlide = () => {
        setCurrentSlide(
            (prevSlide) => (prevSlide - 1 + users.length) % users.length
        );
    };

    const userContent = (
        <div className="flex flex-row justify-between">
            {users.map((user, index) => (
                <div
                    key={index}
                    className={`h-full absolute text-center top-10 pr-40 right-0 ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                >
                    <h2 className="text-right text-2xl pr-40">{user.fullName}</h2>
                    <p className="text-right pr-40">{user.email}</p>                 
                    <p className="text-right pr-40">{user.address}</p>
                </div>
            ))}
            {users.map((user, index) => (
                <img
                    key={index}
                    src="https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/22-300x449.jpg"
                    alt={user.fullName}
                    className={`h-full absolute top-0 ${
                        index === currentSlide ? "right-0" : "left-0"
                    } justify-end ${
                        index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                />
            ))}
        </div>
    );

    const slideButtons = users.map((_, index) => (
        <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
                index === currentSlide ? "bg-white" : "bg-gray-300"
            } dark:bg-gray-800/30 cursor-pointer`}
            aria-current={index === currentSlide}
            aria-label={`Slide ${index + 1}`}
            data-carousel-slide-to={index}
        />
    ));

    return (
        <div id="default-carousel" className="relative w-full" data-carousel="slide">
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
                                        <a href="#" className="btn dark btn-wide rounded-0">
                                            <span>See More</span>
                                        </a>
                                    </div>
                                </div>
                                <div className="text-center text-right h-56 md:h-96 ">
                                    {userContent}
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
