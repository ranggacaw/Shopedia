import { GiKiwiFruit } from "react-icons/gi";
import { LuMilk } from "react-icons/lu";
import { MdOutlineBakeryDining } from "react-icons/md";
import { PiCarrotDuotone } from "react-icons/pi";
import { RiDrinks2Line } from "react-icons/ri";
import { TbPerfume } from "react-icons/tb";

const categories = [
    { name: "Fruits", icon: <GiKiwiFruit className="w-6 h-5 mb-1" /> },
    { name: "Bakery", icon: <MdOutlineBakeryDining className="w-6 h-5 mb-1" /> },
    { name: "Vegetables", icon: <PiCarrotDuotone className="w-6 h-5 mb-1" /> },
    { name: "Dairy & Milk", icon: <LuMilk className="w-6 h-5 mb-1" /> },
    { name: "Snack & Spice", icon: <TbPerfume className="w-6 h-5 mb-1" /> },
    { name: "Juice & Drink", icon: <RiDrinks2Line className="w-6 h-5 mb-1" /> },
];

export default categories;