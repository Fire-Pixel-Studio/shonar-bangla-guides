import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "@/components/ui/sonner";

type Language = 'en' | 'bn';
type ThemeMode = 'light' | 'dark';

interface AppContextType {
  language: Language;
  toggleLanguage: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  bookmarks: string[];
  addBookmark: (id: string) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (id: string) => boolean;
  recentlyViewed: string[];
  addToRecentlyViewed: (id: string) => void;
  progress: Record<string, 'completed' | 'in-progress' | 'not-started'>;
  updateProgress: (id: string, status: 'completed' | 'in-progress' | 'not-started') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  // Initialize state from localStorage, with fallbacks
  const [language, setLanguage] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );
  
  const [theme, setTheme] = useState<ThemeMode>(
    () => (localStorage.getItem('theme') as ThemeMode) || 'light'
  );
  
  const [bookmarks, setBookmarks] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('bookmarks') || '[]')
  );
  
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(
    () => JSON.parse(localStorage.getItem('recentlyViewed') || '[]')
  );
  
  const [progress, setProgress] = useState<Record<string, 'completed' | 'in-progress' | 'not-started'>>(
    () => JSON.parse(localStorage.getItem('progress') || '{}')
  );

  // Apply theme class to document on mount and theme change
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Save bookmarks to localStorage
  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Save recently viewed to localStorage
  useEffect(() => {
    localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed));
  }, [recentlyViewed]);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('progress', JSON.stringify(progress));
  }, [progress]);

  // Toggle language between English and Bengali
  const toggleLanguage = () => {
    setLanguage(prevLang => {
      const newLang = prevLang === 'en' ? 'bn' : 'en';
      toast(`${newLang === 'en' ? 'Changed to English' : 'বাংলায় পরিবর্তন করা হয়েছে'}`);
      return newLang;
    });
  };

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      toast(`${language === 'en' ? 'Theme changed' : 'থিম পরিবর্তিত'}`);
      return newTheme;
    });
  };

  // Add a bookmark
  const addBookmark = (id: string) => {
    setBookmarks(prev => {
      if (prev.includes(id)) return prev;
      toast(`${language === 'en' ? 'Bookmark added' : 'বুকমার্ক যোগ করা হয়েছে'}`);
      return [...prev, id];
    });
  };

  // Remove a bookmark
  const removeBookmark = (id: string) => {
    setBookmarks(prev => {
      toast(`${language === 'en' ? 'Bookmark removed' : 'বুকমার্ক সরানো হয়েছে'}`);
      return prev.filter(item => item !== id);
    });
  };

  // Check if an item is bookmarked
  const isBookmarked = (id: string) => bookmarks.includes(id);

  // Add to recently viewed (keeping only the most recent 5)
  const addToRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item !== id);
      return [id, ...filtered].slice(0, 5);
    });
  };

  // Update progress status for a guide
  const updateProgress = (id: string, status: 'completed' | 'in-progress' | 'not-started') => {
    setProgress(prev => {
      const statusText = {
        'completed': language === 'en' ? 'Completed' : 'সম্পন্ন',
        'in-progress': language === 'en' ? 'In Progress' : 'চলমান',
        'not-started': language === 'en' ? 'Not Started' : 'শুরু হয়নি'
      };
      
      toast(`${language === 'en' ? 'Status updated: ' : 'স্ট্যাটাস আপডেট: '}${statusText[status]}`);
      return { ...prev, [id]: status };
    });
  };

  const value = {
    language,
    toggleLanguage,
    theme,
    toggleTheme,
    bookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    recentlyViewed,
    addToRecentlyViewed,
    progress,
    updateProgress,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
