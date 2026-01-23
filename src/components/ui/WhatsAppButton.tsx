import { MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';

/**
 * WhatsApp Floating Chat Button
 * 
 * A simple floating circular button in the bottom-left corner.
 * No card background - just a clean icon with pulse animation.
 * 
 * Features:
 * - Clean circular design (no card/square background)
 * - Smooth hover animations with Motion
 * - Accessible with ARIA labels
 * - Pulse animation to draw attention
 * - Mobile responsive
 * 
 * Phone Number: +91-9669988666
 */

export const WhatsAppButton = () => {
  // WhatsApp link with phone number
  const whatsappURL = 'https://wa.me/919669988666';
  
  return (
    <motion.a
      href={whatsappURL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 left-6 z-50 group"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.5, 
        delay: 1,
        type: "spring",
        stiffness: 200
      }}
    >
      <div className="relative">
        {/* Pulse Ring Animation */}
        <motion.div
          className="absolute inset-0 rounded-full bg-yellow-500"
          animate={{
            scale: [1, 1.5, 1.5, 1],
            opacity: [0.6, 0, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        
        {/* Circular Button - No background, just icon */}
        <motion.div
          className="relative w-14 h-14 rounded-full flex items-center justify-center bg-yellow-500 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          style={{
            boxShadow: '0 4px 20px rgba(234, 179, 8, 0.4)',
          }}
        >
          {/* WhatsApp Icon */}
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <MessageCircle 
              className="w-7 h-7 text-black" 
              strokeWidth={2.5}
            />
          </motion.div>
        </motion.div>
        
        {/* Notification Badge */}
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-black"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </div>
    </motion.a>
  );
};

export default WhatsAppButton;
