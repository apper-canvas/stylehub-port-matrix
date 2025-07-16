import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";
import { cartService } from "@/services/api/cartService";
import { wishlistService } from "@/services/api/wishlistService";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      setError(null);
      const productData = await productService.getById(parseInt(id));
      setProduct(productData);
      setSelectedSize(productData.sizes[0]);
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }

    try {
      await cartService.add({
        productId: product.Id,
        quantity,
        size: selectedSize,
        price: product.discountedPrice || product.price
      });
      toast.success("Added to cart");
    } catch (err) {
      toast.error("Failed to add to cart");
    }
  };

  const handleWishlistToggle = async () => {
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
    } catch (err) {
      toast.error("Failed to update wishlist");
    }
  };

  if (loading) {
    return <Loading type="detail" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProduct} />;
  }

  if (!product) {
    return <Error message="Product not found" />;
  }

  const discountPercentage = product.discountedPrice 
    ? Math.round(((product.price - product.discountedPrice) / product.price) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="aspect-square rounded-lg overflow-hidden"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-primary" : "border-gray-200"
                }`}
              >
                <img
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product.name}
            </h1>
            <p className="text-lg text-gray-600 mb-4">{product.brand}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-2">
                {product.discountedPrice ? (
                  <>
                    <span className="text-3xl font-bold text-primary">
                      ₹{product.discountedPrice}
                    </span>
                    <span className="text-xl text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                    <Badge variant="error">
                      {discountPercentage}% OFF
                    </Badge>
                  </>
                ) : (
                  <span className="text-3xl font-bold text-gray-900">
                    ₹{product.price}
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <ApperIcon name="Star" size={16} className="text-yellow-500 fill-current" />
                <span className="font-medium">{product.rating}</span>
              </div>
              <span className="text-gray-500">({product.reviewCount} reviews)</span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 border rounded-md text-sm font-medium transition-colors ${
                    selectedSize === size
                      ? "border-primary bg-primary text-white"
                      : "border-gray-300 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <ApperIcon name="Minus" size={16} />
              </button>
              <span className="text-lg font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-gray-100"
              >
                <ApperIcon name="Plus" size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <Button
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2"
            >
              <ApperIcon name="ShoppingBag" size={20} />
              Add to Cart
            </Button>
            
            <Button
              onClick={handleWishlistToggle}
              variant="outline"
              className="px-6"
            >
              <ApperIcon
                name="Heart"
                size={20}
                className={isWishlisted ? "fill-current text-red-500" : ""}
              />
            </Button>
          </div>

          {/* Product Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <ApperIcon name="Truck" size={16} />
                Free shipping on orders over ₹1000
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="RotateCcw" size={16} />
                30-day return policy
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Shield" size={16} />
                1-year warranty
              </li>
              <li className="flex items-center gap-2">
                <ApperIcon name="Award" size={16} />
                Premium quality guarantee
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;