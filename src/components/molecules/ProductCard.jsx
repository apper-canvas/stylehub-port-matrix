import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import { cartService } from "@/services/api/cartService";
import { wishlistService } from "@/services/api/wishlistService";

const ProductCard = ({ product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    try {
      if (isWishlisted) {
        await wishlistService.remove(product.Id);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await wishlistService.add(product.Id);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (error) {
      toast.error("Failed to update wishlist");
    }
  };

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    try {
      await cartService.add({
        productId: product.Id,
        quantity: 1,
        size: product.sizes[0],
        price: product.discountedPrice || product.price
      });
      toast.success("Added to cart");
    } catch (error) {
      toast.error("Failed to add to cart");
    }
  };

  const handleProductClick = () => {
    navigate(`/product/${product.Id}`);
  };

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer card-hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 md:h-64 object-cover transition-transform duration-300 hover:scale-105"
        />
        
        {discountPercentage > 0 && (
          <Badge
            variant="error"
            className="absolute top-2 left-2"
          >
            {discountPercentage}% OFF
          </Badge>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="absolute top-2 right-2 flex flex-col gap-2"
        >
          <motion.button
            onClick={handleWishlistToggle}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon
              name="Heart"
              size={16}
              className={isWishlisted ? "text-red-500 fill-current" : "text-gray-600"}
            />
          </motion.button>
          
          <motion.button
            onClick={handleAddToCart}
            className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ApperIcon name="ShoppingBag" size={16} />
          </motion.button>
        </motion.div>
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 line-clamp-2">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-600 mb-2">
          {product.brand}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.discountedPrice ? (
              <>
                <span className="text-lg font-semibold text-primary">
                  ₹{product.discountedPrice}
                </span>
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.price}
                </span>
              </>
            ) : (
              <span className="text-lg font-semibold text-gray-800">
                ₹{product.price}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            <ApperIcon name="Star" size={14} className="text-yellow-500 fill-current" />
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviewCount})
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;