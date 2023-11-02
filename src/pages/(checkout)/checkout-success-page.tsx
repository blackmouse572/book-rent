import { Icons } from "@/components/icons";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
    return (
        <div className="bg-gray-100 h-screen">
            <div className="bg-white p-6  md:mx-auto">
                <Icons.done
                    size={24}
                    className="text-blue-600 w-16 h-16 mx-auto my-6"
                />

                <div className="text-center">
                    <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                        Payment Done!
                    </h3>
                    <p className="text-gray-600 my-2">
                        Thank you for completing your secure online payment.
                    </p>
                    <p> Have a great day! </p>
                    <div className="py-10 text-center">
                        <Link
                            className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                            to={`/`}
                        >
                            GO BACK
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;
