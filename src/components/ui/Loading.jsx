import { motion } from "framer-motion";

const Loading = ({ type = "products" }) => {
  const shimmerVariants = {
    animate: {
      backgroundPosition: ["0px 0px", "200px 0px"],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  if (type === "products") {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <motion.div
              className="h-48 md:h-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer"
              variants={shimmerVariants}
              animate="animate"
              style={{ backgroundSize: "200px 100%" }}
            />
            <div className="p-4 space-y-3">
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
              <motion.div
                className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded w-2/3"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
              <motion.div
                className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded w-1/2"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "detail") {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-4">
            <motion.div
              className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded-lg"
              variants={shimmerVariants}
              animate="animate"
              style={{ backgroundSize: "200px 100%" }}
            />
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 4 }).map((_, index) => (
                <motion.div
                  key={index}
                  className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded-lg"
                  variants={shimmerVariants}
                  animate="animate"
                  style={{ backgroundSize: "200px 100%" }}
                />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-6">
            <div className="space-y-3">
              <motion.div
                className="h-8 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded w-3/4"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
              <motion.div
                className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded w-1/2"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
            </div>

            <div className="space-y-2">
              <motion.div
                className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded w-1/3"
                variants={shimmerVariants}
                animate="animate"
                style={{ backgroundSize: "200px 100%" }}
              />
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, index) => (
                  <motion.div
                    key={index}
                    className="w-10 h-10 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded"
                    variants={shimmerVariants}
                    animate="animate"
                    style={{ backgroundSize: "200px 100%" }}
                  />
                ))}
              </div>
            </div>

            <motion.div
              className="h-12 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-shimmer rounded-lg"
              variants={shimmerVariants}
              animate="animate"
              style={{ backgroundSize: "200px 100%" }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>
  );
};

export default Loading;