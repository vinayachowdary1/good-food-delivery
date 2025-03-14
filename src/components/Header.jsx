import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="bg-white text-black px-10 shadow-md flex items-center justify-between gap-20">
      <img src={LOGO_URL} alt="Logo" className="h-[5.5rem] w-[5.5rem] object-contain" />
      <ul className="flex space-x-12 text-lg font-medium">
        <li>
          <Link to="/" className="hover:text-orange-500 text-xl">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-orange-500 text-xl">About Us</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-orange-500 text-xl">Contact Us</Link>
        </li>
        <li>
          <Link to="/cart" className="hover:text-orange-500 text-xl">Cart {cartItems.length}</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;







