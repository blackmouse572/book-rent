import { Icons } from "../icons";
import { API_GET_ALL_USER_QUERY_KEYS, getAllUserApi } from "../../apis/users";
import { IResponse, User } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRef } from "react";

function FeatureBook() {
  const queryController = useQuery<IResponse<User[]>, AxiosError>(
    [...API_GET_ALL_USER_QUERY_KEYS],
    () => getAllUserApi({}),
    {
      keepPreviousData: true,
    }
  );

  const users: User[] = queryController.data?.data || [];
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleDragStart = () => {
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
      containerRef.current.style.userSelect = "none";
      containerRef.current.style.pointerEvents = "none";
    }
  }

  const handleDragEnd = () => {
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
      containerRef.current.style.userSelect = "auto";
      containerRef.current.style.pointerEvents = "auto";
    }
  }

  return (  
<div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Feature Book</h2>
            <a href="#" className="text-sm text-gray-900 flex items-center">
              Browse all books
              <span className="ml-1">
                <Icons.chevronRight size={10} />
              </span>
            </a>
          </div>
          <div className="mt-6 relative">
            <div
              className="carousel-container flex overflow-hidden overflow-x-auto"
              ref={containerRef}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`carousel-item flex-none w-60 mr-4`}
                >
                  <div className="relative h-90 w-full overflow-hidden rounded-lg bg-white sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 pb-5">
                    <img
                      src={"https://bookworm.madrasthemes.com/wp-content/uploads/2020/08/22-300x449.jpg"}
                      alt={user.fullName}
                      className=" object-cover object-center"
                    />
                    <h3 className="mt-6 text-sm text-center text-gray-500">
                        <a href={user.role}> {user.email} </a>
                    </h3>
                    <p className="text-base text-center font-semibold text-gray-900">
                        {user.role}
                    </p>
                    <p className="text-2xl text-center font-semibold text-gray-900">
                        $1.30
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    );
}

export default FeatureBook;
