import { useTheme } from '../contexts/ThemeContext';
import { motion } from 'motion/react';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
 const { theme, toggleTheme } = useTheme();

 return (
 <button
 onClick={toggleTheme}
 className="relative inline-flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-all duration-200"
 aria-label="Toggle theme"
 >
 <motion.div
 initial={false}
 animate={{ 
 scale: theme === 'light' ? 1 : 0,
 opacity: theme === 'light' ? 1 : 0,
 rotate: theme === 'light' ? 0 : 180
 }}
 transition={{ duration: 0.2 }}
 className="absolute"
 >
 <Sun className="w-4 h-4 text-gray-900" />
 </motion.div>
 <motion.div
 initial={false}
 animate={{ 
 scale: theme === 'dark' ? 1 : 0,
 opacity: theme === 'dark' ? 1 : 0,
 rotate: theme === 'dark' ? 0 : -180
 }}
 transition={{ duration: 0.2 }}
 className="absolute"
 >
 <Moon className="w-4 h-4 text-white" />
 </motion.div>
 </button>
 );
}