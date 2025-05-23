
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import Stars from "@/components/Stars";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useApp();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <Stars />
      <div className="text-center px-4">
        <h1 className={`text-6xl font-bold mb-4 text-slate-700 dark:text-blue-300 ${language === 'bn' ? 'font-bengali' : ''}`}>404</h1>
        <p className={`text-xl text-slate-600 dark:text-slate-400 mb-8 ${language === 'bn' ? 'font-bengali' : ''}`}>
          {language === 'en' 
            ? "Oops! We couldn't find the page you're looking for." 
            : "উপস! আপনি যে পৃষ্ঠাটি খুঁজছেন তা আমরা খুঁজে পাইনি।"}
        </p>
        <Button 
          className="bg-slate-700 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg"
          onClick={() => navigate('/')}
        >
          <span className={language === 'bn' ? 'font-bengali' : ''}>
            {language === 'en' ? 'Return to Home' : 'হোমে ফিরে যান'}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
