import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaGamepad, FaChartLine, FaMedal } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";

const features = [
  {
    icon: <FaGamepad className="text-4xl text-green-500 mb-4" />,
    title: "Fun and Engaging",
    description: "Game-like lessons keep you motivated and excited to learn more.",
    bgColor: "bg-green-100"
  },
  {
    icon: <FaChartLine className="text-4xl text-blue-500 mb-4" />,
    title: "Effective Learning",
    description: "Research-backed methods to help you retain knowledge and learn quickly.",
    bgColor: "bg-blue-100"
  },
  {
    icon: <FaMedal className="text-4xl text-yellow-500 mb-4" />,
    title: "Stay Motivated",
    description: "Earn achievements, join leaderboards, and track your progress daily.",
    bgColor: "bg-yellow-100"
  }
];

const languages = [
  { code: "ES", name: "Spanish" },
  { code: "FR", name: "French" },
  { code: "JP", name: "Japanese" },
  { code: "DE", name: "German" },
  { code: "IT", name: "Italian" },
  { code: "+", name: "And more" }
];

const testimonials = [
  {
    initials: "JD",
    name: "John D.",
    text: "I've tried many language apps, and this is by far the most effective. The lessons are fun, and I actually remember what I learn!",
    color: "border-green-500"
  },
  {
    initials: "SM",
    name: "Sarah M.",
    text: "The daily reminders keep me accountable, and the streak counter is surprisingly motivating. I'm now on a 78-day streak learning French!",
    color: "border-blue-500"
  },
  {
    initials: "RK",
    name: "Raj K.",
    text: "I started using this app to prepare for a trip to Japan, and I was amazed at how much I could communicate when I got there.",
    color: "border-yellow-500"
  }
];

const Landing = () => {
  const [_, navigate] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <main className="flex-grow">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
            <motion.div 
              className="lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-5xl font-extrabold text-gray-800 mb-6">
                The fun, effective way to learn a language!
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                Learning with Duolingo is fun, and research shows that it works! With quick, bite-sized lessons, you'll earn points and unlock new levels while gaining real-world communication skills. Our culture chatbot is also available for you to interact with.
              </p>
              <Button 
                onClick={() => navigate("/languageSelection")}
                size="lg" 
                className="px-8 py-4 font-bold text-white bg-green-400 rounded-2xl text-lg hover:bg-green-500 transition-all flex items-center"
              >
                Get Started <FiArrowRight className="ml-2" />
              </Button>
            </motion.div>

              <motion.div 
                className="relative w-64 h-64 md:w-96 md:h-96"
                animate={{ y: [0, -10, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut" 
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-duoYellow rounded-full opacity-20"></div>
                <svg className="relative z-10 w-full h-full" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="120" cy="120" r="120" fill="hsl(157, 91%, 42%)" fillOpacity="0.2"/>
                  <path d="M120 60C86.8629 60 60 86.8629 60 120C60 153.137 86.8629 180 120 180C153.137 180 180 153.137 180 120C180 86.8629 153.137 60 120 60Z" fill="hsl(157, 91%, 42%)"/>
                  <circle cx="95" cy="105" r="15" fill="white"/>
                  <circle cx="145" cy="105" r="15" fill="white"/>
                  <circle cx="95" cy="105" r="5" fill="black"/>
                  <circle cx="145" cy="105" r="5" fill="black"/>
                  <path d="M100 140C106.667 146.667 133.333 146.667 140 140" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M75 80L90 95" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                  <path d="M165 80L150 95" stroke="white" strokeWidth="5" strokeLinecap="round"/>
                </svg>
              </motion.div>
          </div>

          <section className="py-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why learn with Duolingo?</h2>
            <div className="grid md:grid-cols-3 gap-10">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className={`rounded-xl p-6 shadow-lg text-center ${feature.bgColor}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {feature.icon}
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-12 bg-white rounded-2xl shadow-md px-8 my-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">Choose from 40+ languages</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {languages.map((language, index) => (
                <motion.div 
                  key={index}
                  className="text-center p-4 hover:bg-green-200 rounded-lg transition cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <span className="text-xl font-bold text-green-500">{language.code}</span>
                  <p className="font-semibold">{language.name}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <section className="py-12">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">What our users say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${testimonial.color}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-gray-700 mt-2">{testimonial.text}</p>
                </motion.div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Landing;
