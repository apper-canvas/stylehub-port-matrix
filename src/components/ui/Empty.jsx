import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No items found", 
  description = "We couldn't find what you're looking for", 
  actionText = "Browse Categories",
  onAction,
  icon = "Search"
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-full p-8 mb-6">
        <ApperIcon
          name={icon}
          size={64}
          className="text-gray-400"
        />
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      {onAction && (
        <motion.button
          onClick={onAction}
          className="bg-gradient-to-r from-primary to-pink-500 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-primary transition-all duration-200 flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="ArrowRight" size={16} />
          {actionText}
        </motion.button>
      )}
    </motion.div>
  );
};

export default Empty;