import { Link, useLocation } from "wouter";

const Footer = () => {
  const [location] = useLocation();

  const isExercisePage = location.includes('/lesson/');
  const isCompletionPage = location.includes('/completion/');
  
  if (isExercisePage || isCompletionPage) return null;
  
  return (
    <footer className="bg-white py-4 px-6 shadow-lg mt-auto border-t">
      <div className="container mx-auto flex justify-between items-center">
        <span className="text-sm text-gray-600">© {new Date().getFullYear()} DOULINGO</span>
        
        <div className="flex space-x-4">
          <Link href="/help" className="text-sm text-gray-600 hover:text-primary transition">Help</Link>
          <Link href="/privacy" className="text-sm text-gray-600 hover:text-primary transition">Privacy</Link>
          <Link href="/terms" className="text-sm text-gray-600 hover:text-primary transition">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
