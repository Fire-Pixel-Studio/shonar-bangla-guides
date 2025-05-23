
import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkMinus, Eye, CheckCircle, Clock } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SubjectCardProps {
  id: string;
  name: string;
  name_bn: string;
  version: string;
  file_path: string;
  description: string;
  description_bn: string;
}

const SubjectCard: React.FC<SubjectCardProps> = ({ 
  id, 
  name, 
  name_bn, 
  version, 
  file_path, 
  description,
  description_bn 
}) => {
  const { language, addBookmark, removeBookmark, isBookmarked, addToRecentlyViewed, progress, updateProgress } = useApp();
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const bookmarked = isBookmarked(id);
  const currentProgress = progress[id] || 'not-started';
  
  const handleViewGuide = () => {
    addToRecentlyViewed(id);
    navigate(`/guide/${id}`);
  };
  
  const handleBookmarkToggle = () => {
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };
  
  const handleProgressChange = () => {
    const nextStatus: Record<string, 'completed' | 'in-progress' | 'not-started'> = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    
    updateProgress(id, nextStatus[currentProgress]);
  };
  
  return (
    <>
      <Card className="card-hover overflow-hidden relative border-bengal-200 dark:border-bengal-800 bg-white dark:bg-bengal-900">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-semibold text-bengal-800 dark:text-bengal-200 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'en' ? name : name_bn}
              </h3>
              <p className="text-sm text-bengal-600 dark:text-bengal-400 mt-1">
                {version} {language === 'en' ? 'Version' : 'ভার্সন'}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handleBookmarkToggle}
            >
              {bookmarked ? (
                <BookmarkMinus className="h-5 w-5 text-bengal-600 dark:text-bengal-400" />
              ) : (
                <Bookmark className="h-5 w-5 text-bengal-600 dark:text-bengal-400" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center space-x-1 mt-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="text-bengal-500 hover:text-bengal-700 dark:text-bengal-400 dark:hover:text-bengal-200 p-0"
              onClick={() => setIsPreviewOpen(true)}
            >
              <Eye className="h-4 w-4 mr-1" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'Preview' : 'প্রিভিউ'}
              </span>
            </Button>
            <span className="text-bengal-400 dark:text-bengal-600">|</span>
            <Button 
              variant="ghost" 
              size="sm"
              className="p-0 text-bengal-500 hover:text-bengal-700 dark:text-bengal-400 dark:hover:text-bengal-200"
              onClick={handleProgressChange}
            >
              {currentProgress === 'completed' ? (
                <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
              ) : currentProgress === 'in-progress' ? (
                <Clock className="h-4 w-4 mr-1 text-orange-500" />
              ) : (
                <Clock className="h-4 w-4 mr-1" />
              )}
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {currentProgress === 'completed' ? 
                  (language === 'en' ? 'Completed' : 'সম্পন্ন') : 
                  currentProgress === 'in-progress' ? 
                  (language === 'en' ? 'In Progress' : 'চলমান') : 
                  (language === 'en' ? 'Not Started' : 'শুরু হয়নি')}
              </span>
            </Button>
          </div>
          
          <Button 
            onClick={handleViewGuide}
            className="w-full mt-4 bg-bengal-600 text-white hover:bg-bengal-700"
          >
            <span className={language === 'bn' ? 'font-bengali' : ''}>
              {language === 'en' ? 'View Guide' : 'গাইড দেখুন'}
            </span>
          </Button>
        </div>
        
        {/* Add floating stars for decoration */}
        <span className="star w-1 h-1 top-2 left-5 animate-star-float" style={{ '--delay': '0.2' } as React.CSSProperties}></span>
        <span className="star w-1.5 h-1.5 bottom-5 right-6 animate-star-float" style={{ '--delay': '1.3' } as React.CSSProperties}></span>
      </Card>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className={language === 'bn' ? 'font-bengali' : ''}>
              {language === 'en' ? name : name_bn}
            </DialogTitle>
            <DialogDescription className={`${language === 'bn' ? 'font-bengali' : ''} !text-base`}>
              {language === 'en' ? description : description_bn}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={handleViewGuide}
              className="bg-bengal-600 text-white hover:bg-bengal-700"
            >
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'View Full Guide' : 'সম্পূর্ণ গাইড দেখুন'}
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubjectCard;
