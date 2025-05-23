
import React, { useEffect, useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sun, Moon, Search, Home, Bookmark, Globe, Youtube } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  onSearchChange?: (search: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const { theme, toggleTheme, language, toggleLanguage } = useApp();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Audio for button clicks
  const playClickSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAMABwAKAA0AEAASA==');
    audio.volume = 0.2;
    audio.play().catch(err => console.log("Audio play failed:", err));
  };
  
  // Handle scroll to fix header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white dark:bg-black shadow-md border-b-4 border-green-200 dark:border-purple-800 transition-all ${isScrolled ? 'py-2' : 'py-3'}`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-lg hover:bg-green-100 dark:hover:bg-purple-900"
              onClick={() => {
                playClickSound();
                navigate('/');
              }}
              title={language === 'en' ? 'Home' : 'হোম'}
            >
              <Home className="h-5 w-5" />
            </Button>
            
            <div 
              className="flex items-center font-bold text-black dark:text-white cursor-pointer"
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
                className="pl-10 bg-gray-50 dark:bg-gray-900 border-2 border-green-200 dark:border-purple-800 rounded-lg"
                placeholder={language === 'en' ? "Search classes and guides..." : "শ্রেণী এবং গাইড অনুসন্ধান করুন..."}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-2 sm:mt-0">
            <Button 
              variant="ghost"
              size="icon"
              className="rounded-lg hover:bg-green-100 dark:hover:bg-purple-900"
              onClick={() => {
                playClickSound();
                navigate('/bookmarks');
              }}
              title={language === 'en' ? 'Bookmarks' : 'বুকমার্ক'}
            >
              <Bookmark className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-lg hover:bg-green-100 dark:hover:bg-purple-900"
              onClick={() => {
                playClickSound();
                window.open('https://www.youtube.com/channel/', '_blank');
              }}
              title={language === 'en' ? 'YouTube' : 'ইউটিউব'}
            >
              <Youtube className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-lg hover:bg-green-100 dark:hover:bg-purple-900"
              onClick={() => {
                playClickSound();
                toggleLanguage();
              }}
              title={language === 'en' ? 'বাংলা' : 'English'}
            >
              <Globe className="h-5 w-5" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              className="rounded-lg hover:bg-green-100 dark:hover:bg-purple-900"
              onClick={() => {
                playClickSound();
                toggleTheme();
              }}
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
