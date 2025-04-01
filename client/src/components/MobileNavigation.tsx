import { Link, useLocation } from "wouter";
import { Home, User, BarChart2, Settings } from "lucide-react";

const MobileNavigation = () => {
  const [location] = useLocation();

  const isExercisePage = location.includes('/lesson/');
  const isCompletionPage = location.includes('/completion/');
  
  if (isExercisePage || isCompletionPage) return null;

  const isHome = location === "/" || location.includes('/lessons/');
  const isProfile = location === "/profile";
  const isLeaderboard = location === "/leaderboard";
  const isSettings = location === "/settings";
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 px-2 py-3 flex justify-around items-center">
      <Link href="/" className={`flex flex-col items-center ${isHome ? 'text-primary' : 'text-gray-500'}`}>
        <Home className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      
      <Link href="/chart" className={`flex flex-col items-center ${isProfile ? 'text-primary' : 'text-gray-500'}`}>
        <User className="h-6 w-6" />
        <span className="text-xs">Chart</span>
      </Link>
      
    </nav>
  );
};

export default MobileNavigation;
