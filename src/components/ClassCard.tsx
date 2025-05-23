
import React from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface ClassCardProps {
  id: string;
  name: string;
  name_bn: string;
}

const ClassCard: React.FC<ClassCardProps> = ({ id, name, name_bn }) => {
  const { language, theme } = useApp();
  const navigate = useNavigate();
  
  return (
    <Card 
      className={`card-hover cursor-pointer overflow-hidden relative border-bengal-200 dark:border-bengal-800 
        ${theme === 'light' ? 'bg-white' : 'bg-bengal-900'} rounded-xl`}
      onClick={() => navigate(`/class/${id}`)}
    >
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <h3 className={`text-xl font-bold text-bengal-700 dark:text-bengal-300 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
          {language === 'en' ? name : name_bn}
        </h3>
        <div className="mt-3">
          <span className="inline-block px-4 py-2 bg-bengal-100 dark:bg-bengal-800 text-bengal-800 dark:text-bengal-200 rounded-full text-sm">
            {language === 'en' ? 'Enter Guide Section' : 'গাইড সেকশনে প্রবেশ করুন'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ClassCard;
