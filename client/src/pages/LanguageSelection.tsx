import LanguageCard from "@/components/LanguageCard";
import { languages } from "@/data/languages";
import { motion } from "framer-motion";
import { Globe, ChevronDown } from "lucide-react";

const LanguageSelection = () => {
  return (
    <section className="py-12 px-4 container mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Globe className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 gradient-heading">
            Start Your Language Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose from one of our popular languages and embark on a fun and effective learning experience
          </p>
        </motion.div>
        
        <motion.div 
          className="mt-8 animate-bounce inline-block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <ChevronDown className="h-6 w-6 text-primary" />
        </motion.div>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 gap-8 relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {languages.map((language, index) => (
          <motion.div
            key={language.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
          >
            <LanguageCard language={language} />
          </motion.div>
        ))}
      </motion.div>
      
      <motion.div 
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h3 className="text-2xl font-bold text-gray-700 mb-3">Why Learn With Us?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-primary">1</span>
            </div>
            <h4 className="text-lg font-bold mb-2">Fun & Engaging</h4>
            <p className="text-gray-600">Learn through interactive exercises and games that keep you motivated</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-primary">2</span>
            </div>
            <h4 className="text-lg font-bold mb-2">Effective Method</h4>
            <p className="text-gray-600">Our science-based approach helps you learn and retain new language skills</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-xl font-bold text-primary">3</span>
            </div>
            <h4 className="text-lg font-bold mb-2">Track Progress</h4>
            <p className="text-gray-600">Follow your learning journey with detailed stats and achievements</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default LanguageSelection;
