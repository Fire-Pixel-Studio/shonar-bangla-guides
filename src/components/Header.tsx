
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sun, Moon, Search, Home, Bookmark, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearchChange?: (search: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-bengal-950 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-bengal-100 dark:hover:bg-bengal-900"
              onClick={() => navigate('/')}
              title={language === 'en' ? 'Home' : 'হোম'}
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <div 
              className="flex items-center font-bold text-bengal-700 dark:text-bengal-300 cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className={`text-lg ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'en' ? 'Guide of Every Class' : 'প্রতি শ্রেণীর গাইড'}
              </span>
            </div>
          </div>
          
          {onSearchChange && (
            <div className="relative w-full sm:w-64 md:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input 
                className="pl-10 bg-gray-50 dark:bg-bengal-900 border-bengal-200 dark:border-bengal-700"
                placeholder={language === 'en' ? "Search..." : "অনুসন্ধান করুন..."}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-bengal-100 dark:hover:bg-bengal-900"
              onClick={() => navigate('/bookmarks')}
              title={language === 'en' ? 'Bookmarks' : 'বুকমার্ক'}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-bengal-100 dark:hover:bg-bengal-900"
              onClick={toggleLanguage}
              title={language === 'en' ? 'বাংলা' : 'English'}
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-full hover:bg-bengal-100 dark:hover:bg-bengal-900"
              onClick={toggleTheme}
              title={language === 'en' ? 'Toggle theme' : 'থিম পরিবর্তন করুন'}
            >
              {theme === 'light' ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
