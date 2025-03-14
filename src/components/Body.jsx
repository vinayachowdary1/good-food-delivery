import { useState, useEffect, useRef } from "react";
import RestaurantCard from "./Restaurantcard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";

const Body = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState([]);
  const [loading, setLoading] = useState(true);
  const textRef = useRef("");

  useEffect(() => {
    fetchData();
  }, []);

  const online = useOnline();
  if (!online) {
    return <h1 className="text-center text-red-500 mt-10">Please Check Your Internet Connection</h1>;
  }

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0843007&lng=80.2704622&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const final = await response.json();
      const restaurants =
        final?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
      setData(restaurants);
      setFilter(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchHandler = () => {
    const searchText = textRef.current.value.toLowerCase();
    if (searchText) {
      const filteredItems = data.filter(
        (item) =>
          item?.info?.name?.toLowerCase().includes(searchText) ||
          item?.info?.cuisines?.some((cuisine) =>
            cuisine.toLowerCase().includes(searchText)
          )
      );
      setFilter(filteredItems.length > 0 ? filteredItems : data);
    }
  };

  const handler = () => {
    const filteredData = [...data].sort((a, b) => 
      (b?.info?.avgRating || 0) - (a?.info?.avgRating || 0)
    );
    setFilter(filteredData);
  };

  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="p-6">
      <div className="flex items-center gap-4 mb-6">
        <input
          type="text"
          className="p-2 rounded-md bg-gray-200 text-black w-1/2"
          placeholder="Enter the Restaurant names"
          ref={textRef}
        />
        <button onClick={searchHandler} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Search</button>
        <button onClick={handler} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Top Rated Restaurants</button>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filter.length > 0 ? (
          filter.map((item) => (
            <Link key={item?.info?.id} to={`/restaurantMenu/${item?.info?.id}`}>
              <RestaurantCard item={item?.info} />
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500">No restaurants found. Try a different search.</p>
        )}
      </div>
    </div>
  );
};

export default Body;




