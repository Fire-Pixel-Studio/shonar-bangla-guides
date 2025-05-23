
import { useApp } from '@/context/AppContext';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  const { language } = useApp();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-bengal-50 dark:bg-bengal-950 border-t border-bengal-200 dark:border-bengal-800 py-6 mt-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-bengal-600 hover:text-bengal-800 dark:text-bengal-400 dark:hover:text-bengal-200 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noreferrer"
              className="text-bengal-600 hover:text-bengal-800 dark:text-bengal-400 dark:hover:text-bengal-200 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={20} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-bengal-600 hover:text-bengal-800 dark:text-bengal-400 dark:hover:text-bengal-200 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
          </div>
          
          <p className={`text-sm text-bengal-600 dark:text-bengal-400 mb-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'en' 
              ? `Copyright © ${currentYear} Guide of Every Class. All rights reserved.` 
              : `কপিরাইট © ${currentYear} প্রতি শ্রেণীর গাইড। সর্বস্বত্ব সংরক্ষিত।`}
          </p>
          
          <p className={`flex items-center text-sm text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
            {language === 'en' ? 'Made in Bangladesh with ' : 'বাংলাদেশে নির্মিত '}
            <span className="text-red-500 mx-1">❤️</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
