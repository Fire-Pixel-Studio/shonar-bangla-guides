
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
  const { language } = useApp();
  const navigate = useNavigate();
  
  return (
    <Card 
      className="card-hover cursor-pointer overflow-hidden relative border-bengal-200 dark:border-bengal-800 bg-white dark:bg-bengal-900"
      onClick={() => navigate(`/class/${id}`)}
    >
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <h3 className={`text-xl font-bold text-bengal-700 dark:text-bengal-300 mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
          {language === 'en' ? name : name_bn}
        </h3>
        <div className="mt-3">
          <span className="inline-block px-4 py-2 bg-bengal-100 dark:bg-bengal-800 text-bengal-800 dark:text-bengal-200 rounded-full text-sm">
            {language === 'en' ? 'Coming Soon' : 'শীঘ্রই আসছে'}
          </span>
        </div>

        {/* Add floating stars for decoration */}
        <span className="star w-1 h-1 top-2 left-5 animate-star-float" style={{ '--delay': '0' } as React.CSSProperties}></span>
        <span className="star w-2 h-2 bottom-3 right-3 animate-star-float" style={{ '--delay': '1.2' } as React.CSSProperties}></span>
        <span className="star w-1.5 h-1.5 top-10 right-8 animate-star-float" style={{ '--delay': '0.5' } as React.CSSProperties}></span>
      </div>
    </Card>
  );
};

export default ClassCard;
