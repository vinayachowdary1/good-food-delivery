import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex flex-col items-center mt-8">
      {cartItems.length === 0 ? (
        <h1 className="font-bold text-zinc-400 text-2xl">Cart is Empty</h1>
      ) : (
        <div className="w-full max-w-2xl">
          <h1 className="font-bold text-3xl mb-6 text-center">Your Cart</h1>
          <ul className="space-y-4">
            {cartItems.map((item) => (
              <li
                key={item?.id}
                className="flex items-center justify-between gap-x-8 border-b pb-3"
              >
                <div className="flex flex-col items-start">
                  <span className="font-medium text-lg">{item.name}</span>
                  <span className="text-sm text-gray-500">Qty: {item.quantity}</span>
                </div>
                <span className="text-lg font-semibold">₹{item.price}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Cart;


