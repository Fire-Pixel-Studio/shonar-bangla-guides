
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';
import Stars from '@/components/Stars';
import guides from '@/data/guides.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BookmarksPage = () => {
  const { language, bookmarks } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [bookmarkedSubjects, setBookmarkedSubjects] = useState<any[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  
  // Find all bookmarked subjects
  useEffect(() => {
    const subjects: any[] = [];
    
    guides.classes.forEach(cls => {
      cls.subjects.forEach((subject: any) => {
        if (bookmarks.includes(subject.id)) {
          subjects.push({
            ...subject,
            className: cls.name,
            className_bn: cls.name_bn,
            classId: cls.id
          });
        }
      });
    });
    
    setBookmarkedSubjects(subjects);
    filterSubjects(subjects, search);
  }, [bookmarks]);
  
  // Filter subjects based on search
  const filterSubjects = (subjects: any[], searchTerm: string) => {
    if (!searchTerm) {
      setFilteredSubjects(subjects);
      return;
    }
    
    const lowercaseSearch = searchTerm.toLowerCase();
    const filtered = subjects.filter(subject => {
      return (
        subject.name.toLowerCase().includes(lowercaseSearch) ||
        subject.name_bn.includes(searchTerm) ||
        subject.className.toLowerCase().includes(lowercaseSearch) ||
        subject.className_bn.includes(searchTerm)
      );
    });
    
    setFilteredSubjects(filtered);
  };
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    filterSubjects(bookmarkedSubjects, value);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bengal-50 to-white dark:from-bengal-950 dark:to-bengal-900">
      <Stars />
      
      <Header onSearchChange={handleSearchChange} />
      
      <main className="flex-1 px-4 py-8">
        <div className="container mx-auto">
          {/* Back button and title */}
          <div className="mb-8">
            <Button 
              variant="ghost" 
              className="flex items-center text-bengal-600 dark:text-bengal-400 hover:text-bengal-800 dark:hover:text-bengal-200 pl-0" 
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              <span className={language === 'bn' ? 'font-bengali' : ''}>
                {language === 'en' ? 'Back to Home' : 'হোমে ফিরে যান'}
              </span>
            </Button>
            
            <h1 className={`mt-4 text-3xl md:text-4xl font-bold text-bengal-800 dark:text-bengal-100 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? 'Bookmarked Guides' : 'বুকমার্ক করা গাইডসমূহ'}
            </h1>
          </div>
          
          {/* No bookmarks message */}
          {filteredSubjects.length === 0 && (
            <div className="bg-white dark:bg-bengal-900 rounded-lg shadow-md p-8 text-center border border-bengal-200 dark:border-bengal-800">
              <p className={`text-xl text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {search ? 
                  (language === 'en' ? 'No bookmarked guides found matching your search.' : 'আপনার অনুসন্ধান অনুযায়ী কোন বুকমার্ক করা গাইড পাওয়া যায়নি।') :
                  (language === 'en' ? 'You have not bookmarked any guides yet.' : 'আপনি এখনও কোন গাইড বুকমার্ক করেননি।')}
              </p>
              
              <Button 
                className="mt-4 bg-bengal-600 text-white hover:bg-bengal-700"
                onClick={() => navigate('/')}
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'en' ? 'Browse Guides' : 'গাইড দেখুন'}
                </span>
              </Button>
            </div>
          )}
          
          {/* Bookmarked guides */}
          {filteredSubjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSubjects.map(subject => (
                <div key={subject.id} className="flex flex-col">
                  <div className="bg-bengal-100 dark:bg-bengal-800 p-2 px-4 rounded-t-lg">
                    <p className={`text-sm font-medium text-bengal-700 dark:text-bengal-200 ${language === 'bn' ? 'font-bengali' : ''}`}>
                      {language === 'en' ? subject.className : subject.className_bn}
                    </p>
                  </div>
                  <div className="-mt-1">
                    <SubjectCard
                      id={subject.id}
                      name={subject.name}
                      name_bn={subject.name_bn}
                      version={subject.version}
                      file_path={subject.file_path}
                      description={subject.description}
                      description_bn={subject.description_bn}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Recently viewed section */}
          <div className="mt-12">
            <h2 className={`section-title ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? 'Recently Viewed' : 'সম্প্রতি দেখা হয়েছে'}
            </h2>
            
            <RecentlyViewed />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Recently Viewed component
const RecentlyViewed = () => {
  const { language, recentlyViewed } = useApp();
  const [recentSubjects, setRecentSubjects] = useState<any[]>([]);
  
  useEffect(() => {
    const subjects: any[] = [];
    
    guides.classes.forEach(cls => {
      cls.subjects.forEach((subject: any) => {
        if (recentlyViewed.includes(subject.id)) {
          subjects.push({
            ...subject,
            className: cls.name,
            className_bn: cls.name_bn,
            classId: cls.id
          });
        }
      });
    });
    
    setRecentSubjects(subjects);
  }, [recentlyViewed]);
  
  if (recentSubjects.length === 0) {
    return (
      <div className="bg-white dark:bg-bengal-900 rounded-lg shadow-md p-6 text-center border border-bengal-200 dark:border-bengal-800">
        <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
          {language === 'en' ? 'You have not viewed any guides recently.' : 'আপনি সম্প্রতি কোন গাইড দেখেননি।'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recentSubjects.map(subject => (
        <div key={subject.id} className="flex flex-col">
          <div className="bg-bengal-100 dark:bg-bengal-800 p-2 px-4 rounded-t-lg">
            <p className={`text-sm font-medium text-bengal-700 dark:text-bengal-200 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? subject.className : subject.className_bn}
            </p>
          </div>
          <div className="-mt-1">
            <SubjectCard
              id={subject.id}
              name={subject.name}
              name_bn={subject.name_bn}
              version={subject.version}
              file_path={subject.file_path}
              description={subject.description}
              description_bn={subject.description_bn}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookmarksPage;
