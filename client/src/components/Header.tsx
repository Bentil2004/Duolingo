import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Heart, Trophy } from "lucide-react";

const Header = () => {
  const { userProgress, selectedLanguage } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  
  // Show header except on exercise page
  const isExercisePage = location.includes('/lesson/');
  
  // Calculate user progress for the selected language
  const currentProgress = selectedLanguage 
    ? userProgress.find(p => p.languageId === selectedLanguage.id)
    : userProgress[0];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  if (isExercisePage) return null;
  
  return (
    <>
      <header className="bg-white py-3 px-4 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="inline-block">
              <span className="text-primary font-extrabold text-2xl">DUOLINGO</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center mr-4">
              <div className="text-accent mr-1">
                <Heart className="h-6 w-6" />
              </div>
              <span className="font-bold">{currentProgress?.hearts || 5}</span>
            </div>
            
            <div className="flex items-center">
              <div className="text-blue-500 mr-1">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="font-bold">{currentProgress?.gems || 0}</span>
            </div>
            
            <Link href="/" className="text-neutral-700 hover:text-primary transition">Home</Link>
            <Link href="/profile" className="text-neutral-700 hover:text-primary transition">Profile</Link>
            <Link href="/leaderboard" className="text-neutral-700 hover:text-primary transition">Leaderboard</Link>
            {/* <Link href="/settings" className="text-neutral-700 hover:text-primary transition">Settings</Link> */}
          </div>
          
          <button 
            className="md:hidden flex items-center" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-neutral-700" />
            ) : (
              <Menu className="h-6 w-6 text-neutral-700" />
            )}
          </button>
        </div>
      </header>
      
      {isMobileMenuOpen && (
        <div className="bg-white shadow-md p-4 fixed w-full z-30" style={{ top: '60px' }}>
          <div className="flex justify-between mb-4">
            <div className="flex items-center">
              <div className="text-accent mr-1">
                <Heart className="h-6 w-6" />
              </div>
              <span className="font-bold">{currentProgress?.hearts || 5}</span>
            </div>
            
            <div className="flex items-center">
              <div className="text-blue-500 mr-1">
                <Trophy className="h-6 w-6" />
              </div>
              <span className="font-bold">{currentProgress?.gems || 0}</span>
            </div>
          </div>
          
          <nav className="flex flex-col space-y-3">
            <Link href="/" className="text-neutral-700 hover:text-primary transition py-2">Home</Link>
            <Link href="/profile" className="text-neutral-700 hover:text-primary transition py-2">Profile</Link>
            <Link href="/leaderboard" className="text-neutral-700 hover:text-primary transition py-2">Leaderboard</Link>
            {/* <Link href="/settings" className="text-neutral-700 hover:text-primary transition py-2">Settings</Link> */}
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
