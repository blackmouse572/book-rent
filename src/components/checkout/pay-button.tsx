// import { authAxiosClient } from "../../lib/axios";
// import { IOrder } from "@/types/order";
// import { useAuth } from "@/hooks/useAuth";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";



// const PayButton: React.FC<> = () => {
//     const { user } = useAuth();
//     const navigate = useNavigate();

//     const handleCheckout = () => {
//         if (user) {
//             authAxiosClient
//                 .post(`#`, {

//                 })
//                 .then((response) => {
//                     if (response.data.url) {
//                         navigate("/checkout-success");
//                     } else navigate("/checkout-failed");
//                 })
//                 .catch((err) => console.log(err.message));
//         } else {
//             console.log("User is not logged in.");
//         }
//     };

//     return (
//         <>
//             <Button onClick={handleCheckout}>Check out</Button>
//         </>
//     );
// };

// export default PayButton;
