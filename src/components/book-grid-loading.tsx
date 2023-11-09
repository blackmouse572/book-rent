import { Skeleton } from "@/components/ui/skeleton";

type Props = {
    pageSize: number;
} & React.HTMLAttributes<HTMLDivElement>;

function BookGridLoading({ pageSize, ...props }: Props) {
    return (
        <div {...props}>
            {Array.from({ length: pageSize }).map((_, index) => {
                return (
                    <div key={index} className="w-full">
                        <Skeleton className="w-full aspect-[5/7]" />
                        <Skeleton className="w-4/5 h-5 mt-1 " />
                        <Skeleton className="w-2/3 h-3 mt-1" />
                    </div>
                );
            })}
        </div>
    );
}

export default BookGridLoading;
