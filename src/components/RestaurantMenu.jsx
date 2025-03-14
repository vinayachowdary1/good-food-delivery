import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, existingItem } from "../utils/cartSlice";

const RestaurantMenu = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [selectedItems, setSelectedItems] = useState([]);
  const dispatch = useDispatch();
  const cartItem = useSelector((store) => store.cart.items);

  useEffect(() => {
    fetchMenu();
  }, [id]);

  const fetchMenu = async () => {
    try {
      const response = await fetch(MENU_API + id);
      if (!response.ok) {
        throw new Error(`Failed to fetch menu: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();

      if (data?.statusCode === 1) {
        setError("Oops!! Something went wrong. Please try again later.");
        return;
      }

      const categoryData =
        data?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
          (category) =>
            category?.card?.card["@type"] ===
            "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
        ) || [];

      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching menu:", error);
      setError("Failed to fetch menu. Please try again later.");
    }
  };

  const accordionHandler = (event) => {
    const targetValue = event.target.value;
    if (event.target.tagName === "BUTTON" && targetValue !== "") {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.includes(targetValue)
          ? prevSelectedItems.filter((item) => item !== targetValue)
          : [targetValue]
      );
    }
  };

  const categoryHandler = (event) => {
    const itemName = event.target.getAttribute("data-name");
    const targetCategoryValue = event.target.getAttribute("data-category");
    let categoryObject;

    try {
      categoryObject = JSON.parse(targetCategoryValue);
    } catch (error) {
      console.error("Error parsing category:", error);
      return;
    }

    const { id, name, price, defaultPrice, category } = categoryObject;
    const formattedPrice = parseInt(price / 100) || parseInt(defaultPrice / 100);

    const itemDetails = {
      id,
      name: name || itemName,
      price: formattedPrice,
      quantity: 1,
      category
    };

    const filterData = cartItem.findIndex((item) => item.id === itemDetails.id);

    filterData === -1
      ? dispatch(addItem(itemDetails))
      : dispatch(existingItem(filterData));
  };

  if (error) {
    return <div className="text-red-500 text-center py-4">{error}</div>;
  }

  if (!categories.length) {
    return <div className="text-center py-4">Loading categories...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {categories.map((categoryData, index) => (
        <div key={index} className="mb-6">
          <div
            className="flex justify-between items-center py-2 cursor-pointer border-b border-gray-300"
            onClick={accordionHandler}
          >
            <h3 className="text-lg font-semibold">
              {categoryData?.card?.card?.title} ({categoryData?.card?.card?.itemCards.length})
            </h3>
            <button value={categoryData?.card?.card?.title}>
              {selectedItems.includes(categoryData?.card?.card?.title) ? "-" : "+"}
            </button>
          </div>
          {selectedItems.includes(categoryData?.card?.card?.title) && (
            <div className="mt-4">
              {categoryData?.card?.card?.itemCards?.map((item) => (
                <div
                  key={item?.card?.info?.id}
                  className="flex justify-between items-center py-2 border-b border-gray-200"
                  onClick={categoryHandler}
                >
                  <div>
                    <h1 className="text-md font-medium">
                      {item?.card?.info?.name} - ₹{parseInt(item?.card?.info?.price / 100) || parseInt(item?.card?.info?.defaultPrice / 100)}
                    </h1>
                    <p className="text-sm text-gray-600">{item?.card?.info?.description}</p>
                  </div>
                  <button
                    className="px-4 py-1 bg-blue-500 text-white rounded-md"
                    data-name={item?.card?.info?.name}
                    data-category={JSON.stringify(item?.card?.info)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RestaurantMenu;






