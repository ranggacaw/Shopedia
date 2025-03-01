import { BsClock } from "react-icons/bs";
import { LiaShippingFastSolid } from "react-icons/lia";
import { RiReplay30Line } from "react-icons/ri";

const services = [
    { 
        name: "Free Shipping", 
        icon: <LiaShippingFastSolid className="w-10 h-10 mb-1" />,
        description: "Free shipping on all Jabodetabek order or order above 300.000 rupiah"

    },
    { 
        name: "Payment Secure", 
        icon: <BsClock className="w-10 h-10 mb-1" />,
        description: "Contact us for 24 hours a day, 7 days a week"

    },
    { 
        name: "30 Days Return", 
        icon: <RiReplay30Line className="w-10 h-10 mb-1" />,
        description: "Simply return it within 30 days for an exchange"

    },
];

export default services;