import { Link } from "react-router-dom";

const HeaderCategory = ({ category }) => {
  if (!category) return null;

  return (
    <Link
      to={`/category/${category.slug}`}
      className="text-center inline-flex text-sm items-center text-black hover:bg-orange-200 rounded-t-lg px-3 py-2 font-semibold"
    >
      <img
        src={category.image}
        alt={category.name}
        className="w-6 h-6 mr-2"
      />
      {category.name}
    </Link>
  );
};

export default HeaderCategory;
