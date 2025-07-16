import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category, index }) => {
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    navigate(`/category/${category.name.toLowerCase()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative overflow-hidden rounded-lg cursor-pointer group"
      onClick={handleCategoryClick}
    >
      <div className="aspect-square relative">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-white text-xl font-semibold mb-2">
            {category.name}
          </h3>
          <p className="text-white/80 text-sm">
            {category.subcategories.length} subcategories
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;