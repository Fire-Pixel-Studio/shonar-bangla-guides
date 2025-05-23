
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Stars from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Bookmark, BookmarkMinus, CheckCircle, Clock } from 'lucide-react';
import guides from '@/data/guides.json';

const GuidePage = () => {
  const { id } = useParams<{ id: string }>();
  const { language, isBookmarked, addBookmark, removeBookmark, progress, updateProgress } = useApp();
  const navigate = useNavigate();
  const [guideData, setGuideData] = useState<any>(null);
  const [classData, setClassData] = useState<any>(null);
  
  // Find the guide data
  useEffect(() => {
    // Find the class and subject
    let foundClass = null;
    let foundSubject = null;
    
    for (const cls of guides.classes) {
      const subject = cls.subjects.find((subj: any) => subj.id === id);
      if (subject) {
        foundClass = cls;
        foundSubject = subject;
        break;
      }
    }
    
    if (foundClass && foundSubject) {
      setClassData(foundClass);
      setGuideData(foundSubject);
    } else {
      navigate('/not-found');
    }
  }, [id, navigate]);
  
  const bookmarked = isBookmarked(id || '');
  const currentProgress = progress[id || ''] || 'not-started';
  
  const handleBookmarkToggle = () => {
    if (!id) return;
    
    if (bookmarked) {
      removeBookmark(id);
    } else {
      addBookmark(id);
    }
  };
  
  const handleProgressChange = () => {
    if (!id) return;
    
    const nextStatus: Record<string, 'completed' | 'in-progress' | 'not-started'> = {
      'not-started': 'in-progress',
      'in-progress': 'completed',
      'completed': 'not-started'
    };
    
    updateProgress(id, nextStatus[currentProgress]);
  };
  
  if (!guideData || !classData) {
    return null; // Loading state
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bengal-50 to-white dark:from-bengal-950 dark:to-bengal-900">
      <Stars />
      
      <Header />
      
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto">
          {/* Navigation buttons */}
          <div className="mb-6 flex flex-wrap items-center gap-4">
            <Button 
              variant="ghost" 
              className="flex items-center text-bengal-600 dark:text-bengal-400 hover:text-bengal-800 dark:hover:text-bengal-200" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'Home' : 'হোম'}
              </span>
            </Button>
            
            <span className="text-bengal-400 dark:text-bengal-600">/</span>
            
            <Button 
              variant="ghost" 
              className="flex items-center text-bengal-600 dark:text-bengal-400 hover:text-bengal-800 dark:hover:text-bengal-200" 
              onClick={() => navigate(`/class/${classData.id}`)}
            >
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? classData.name : classData.name_bn}
              </span>
            </Button>
            
            <span className="text-bengal-400 dark:text-bengal-600">/</span>
            
            <span className={`text-bengal-700 dark:text-bengal-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? guideData.name : guideData.name_bn}
            </span>
          </div>
          
          {/* Guide header */}
          <div className="bg-white dark:bg-bengal-900 rounded-t-lg shadow-md p-6 border border-bengal-200 dark:border-bengal-800">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className={`text-2xl md:text-3xl font-bold text-bengal-800 dark:text-bengal-100 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? guideData.name : guideData.name_bn}
                </h1>
                <p className={`text-bengal-600 dark:text-bengal-400 mt-1 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 
                    `${classData.name} - ${guideData.version} Version` : 
                    `${classData.name_bn} - ${guideData.version} ভার্সন`}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleProgressChange}
                >
                  {currentProgress === 'completed' ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : currentProgress === 'in-progress' ? (
                    <Clock className="h-4 w-4 text-orange-500" />
                  ) : (
                    <Clock className="h-4 w-4" />
                  )}
                  <span className={language === 'bn' ? 'font-bengali' : ''}>
                    {currentProgress === 'completed' ? 
                      (language === 'en' ? 'Completed' : 'সম্পন্ন') : 
                      currentProgress === 'in-progress' ? 
                      (language === 'en' ? 'In Progress' : 'চলমান') : 
                      (language === 'en' ? 'Not Started' : 'শুরু হয়নি')}
                  </span>
                </Button>
                
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleBookmarkToggle}
                >
                  {bookmarked ? (
                    <>
                      <BookmarkMinus className="h-4 w-4" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>
                        {language === 'en' ? 'Unbookmark' : 'বুকমার্ক সরান'}
                      </span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="h-4 w-4" />
                      <span className={language === 'bn' ? 'font-bengali' : ''}>
                        {language === 'en' ? 'Bookmark' : 'বুকমার্ক করুন'}
                      </span>
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
          
          {/* PDF Viewer (placeholder) */}
          <div className="bg-gray-100 dark:bg-bengal-950 h-[70vh] rounded-b-lg shadow-md flex items-center justify-center border-x border-b border-bengal-200 dark:border-bengal-800 mb-8">
            <div className="text-center p-8">
              <h2 className={`text-xl font-semibold text-bengal-700 dark:text-bengal-300 mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'en' ? 'PDF Viewer Placeholder' : 'পিডিএফ ভিউয়ার প্লেসহোল্ডার'}
              </h2>
              <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {language === 'en' 
                  ? `This is a placeholder for the PDF viewer. The actual PDF content for ${guideData.name} will be displayed here.` 
                  : `এটি পিডিএফ ভিউয়ারের জন্য একটি প্লেসহোল্ডার। ${guideData.name_bn} এর জন্য আসল পিডিএফ কন্টেন্ট এখানে প্রদর্শিত হবে।`}
              </p>
            </div>
          </div>
          
          {/* Guide description */}
          <div className="bg-white dark:bg-bengal-900 rounded-lg shadow-md p-6 border border-bengal-200 dark:border-bengal-800">
            <h2 className={`text-xl font-semibold text-bengal-800 dark:text-bengal-100 mb-4 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? 'About this Guide' : 'এই গাইড সম্পর্কে'}
            </h2>
            <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? guideData.description : guideData.description_bn}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GuidePage;
