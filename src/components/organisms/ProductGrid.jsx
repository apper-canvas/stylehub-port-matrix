import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { productService } from "@/services/api/productService";

const ProductGrid = ({ category, searchQuery, filters, sortBy }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery, filters, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let filteredProducts = await productService.getAll();
      
      // Apply category filter
      if (category) {
        filteredProducts = filteredProducts.filter(
          product => product.category.toLowerCase() === category.toLowerCase()
        );
      }
      
      // Apply search filter
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.brand.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      // Apply filters
      if (filters) {
        if (filters.priceRange) {
          const { min, max } = filters.priceRange;
          filteredProducts = filteredProducts.filter(product => {
            const price = product.discountedPrice || product.price;
            return (!min || price >= min) && (!max || price <= max);
          });
        }
        
        if (filters.categories?.length > 0) {
          filteredProducts = filteredProducts.filter(
            product => filters.categories.includes(product.category)
          );
        }
        
        if (filters.brands?.length > 0) {
          filteredProducts = filteredProducts.filter(
            product => filters.brands.includes(product.brand)
          );
        }
        
        if (filters.sizes?.length > 0) {
          filteredProducts = filteredProducts.filter(
            product => product.sizes.some(size => filters.sizes.includes(size))
          );
        }
      }
      
      // Apply sorting
      if (sortBy) {
        filteredProducts.sort((a, b) => {
          const priceA = a.discountedPrice || a.price;
          const priceB = b.discountedPrice || b.price;
          
          switch (sortBy) {
            case "price-low":
              return priceA - priceB;
            case "price-high":
              return priceB - priceA;
            case "rating":
              return b.rating - a.rating;
            case "newest":
              return b.Id - a.Id;
            default:
              return 0;
          }
        });
      }
      
      setProducts(filteredProducts);
    } catch (err) {
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading type="products" />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProducts} />;
  }

  if (products.length === 0) {
    return (
      <Empty
        title="No products found"
        description="Try adjusting your search or filters to find what you're looking for"
        actionText="Browse All Products"
        onAction={() => window.location.href = "/"}
        icon="Package"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
        >
          <ProductCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default ProductGrid;