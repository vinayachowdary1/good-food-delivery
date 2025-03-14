import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ item }) => {
  const { name, cuisines, avgRating, costForTwo, sla, cloudinaryImageId } = item;

  return (
    <div className="flex flex-col border border-gray-300 rounded-lg bg-whitesmoke w-[20rem] h-[28rem] mb-3">
      <img
        src={CDN_URL + cloudinaryImageId}
        alt={name}
        className="w-full h-[15rem] object-cover rounded-md mb-4"
      />
      <h2 className="text-xl font-semibold px-2">{name}</h2>
      <h3 className="text-sm text-gray-600 break-words mb-2 px-2">{cuisines?.join(", ")}</h3>
      <h4 className="text-lg font-bold text-yellow-500 px-2">{avgRating}</h4>
      <h4 className="text-sm text-gray-700 px-2">{costForTwo}</h4>
      <h5 className="text-sm text-gray-500 px-2">{sla?.deliveryTime} minutes</h5>
    </div>
  );
};

export default RestaurantCard;



