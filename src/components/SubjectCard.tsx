
import React, { useState, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Bookmark, BookmarkMinus, Eye } from 'lucide-react';
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
  const { language, addBookmark, removeBookmark, isBookmarked } = useApp();
  const navigate = useNavigate();
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  const bookmarked = isBookmarked(id);
  
  // Initialize audio
  if (!audioRef.current) {
    audioRef.current = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQQAAAAMABwAKAA0AEAASA==');
    audioRef.current.volume = 0.2;
  }
  
  const playClickSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(err => console.log("Audio play failed:", err));
    }
  };
  
  const handleViewGuide = () => {
    playClickSound();
    navigate(`/guide/${id}`);
  };
  
  const handleBookmarkToggle = () => {
    playClickSound();
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };
  
  return (
    <>
      <Card className="card-hover overflow-hidden relative border-4 border-green-200 dark:border-purple-800 bg-white dark:bg-black rounded-xl hover:border-yellow-200 transition-colors">
        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className={`text-lg font-semibold text-black dark:text-white ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'en' ? name : name_bn}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {version} {language === 'en' ? 'Version' : 'ভার্সন'}
              </p>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-lg h-8 w-8"
              onClick={handleBookmarkToggle}
              onMouseDown={playClickSound}
            >
              {bookmarked ? (
                <BookmarkMinus className="h-5 w-5 text-yellow-500" />
              ) : (
                <Bookmark className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              )}
            </Button>
          </div>
          
          <div className="flex items-center space-x-1 mt-3">
            <Button 
              variant="ghost" 
              size="sm"
              className="rounded-lg text-green-700 hover:text-green-900 dark:text-purple-400 dark:hover:text-purple-200 p-0"
              onClick={() => {
                playClickSound();
                setIsPreviewOpen(true);
              }}
            >
              <Eye className="h-4 w-4 mr-1" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'Preview' : 'প্রিভিউ'}
              </span>
            </Button>
          </div>
          
          <Button 
            onClick={handleViewGuide}
            onMouseDown={playClickSound}
            className="w-full mt-4 bg-green-600 hover:bg-green-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg"
          >
            <span className={language === 'bn' ? 'font-bengali' : ''}>
              {language === 'en' ? 'Enter Guide' : 'গাইডে প্রবেশ করুন'}
            </span>
          </Button>
        </div>
      </Card>
      
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-md bg-white dark:bg-black border-4 border-green-200 dark:border-purple-800">
          <DialogHeader>
            <DialogTitle className={`text-black dark:text-white ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? name : name_bn}
            </DialogTitle>
            <DialogDescription className={`${language === 'bn' ? 'font-bengali' : ''} !text-base text-gray-700 dark:text-gray-300`}>
              {language === 'en' ? description : description_bn}
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button 
              onClick={() => {
                playClickSound();
                setIsPreviewOpen(false);
                handleViewGuide();
              }}
              className="bg-green-600 hover:bg-green-700 dark:bg-purple-600 dark:hover:bg-purple-700 text-white rounded-lg"
            >
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'Enter Guide' : 'গাইডে প্রবেশ করুন'}
              </span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SubjectCard;
