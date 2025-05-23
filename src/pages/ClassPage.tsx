
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SubjectCard from '@/components/SubjectCard';
import Stars from '@/components/Stars';
import guides from '@/data/guides.json';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const ClassPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useApp();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState<any[]>([]);
  const [classData, setClassData] = useState<any>(null);
  
  // Find the class data
  useEffect(() => {
    const foundClass = guides.classes.find(cls => cls.id === id);
    if (foundClass) {
      setClassData(foundClass);
      filterSubjects(foundClass.subjects, '');
    } else {
      navigate('/not-found');
    }
  }, [id, navigate]);
  
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
        subject.name_bn.includes(searchTerm)
      );
    });
    
    setFilteredSubjects(filtered);
  };
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    if (classData) {
      filterSubjects(classData.subjects, value);
    }
  };
  
  // Group subjects by version
  const banglaSubjects = filteredSubjects.filter(subject => subject.version === 'Bangla');
  const englishSubjects = filteredSubjects.filter(subject => subject.version === 'English');
  
  if (!classData) {
    return null; // Loading state
  }
  
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
                {language === 'en' ? 'Back to Classes' : 'শ্রেণীগুলিতে ফিরে যান'}
              </span>
            </Button>
            
            <h1 className={`mt-4 text-3xl md:text-4xl font-bold text-bengal-800 dark:text-bengal-100 ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? classData.name : classData.name_bn}
            </h1>
          </div>
          
          {/* No subjects message */}
          {filteredSubjects.length === 0 && (
            <div className="bg-white dark:bg-bengal-900 rounded-lg shadow-md p-8 text-center border border-bengal-200 dark:border-bengal-800">
              <p className={`text-xl text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                {search ? 
                  (language === 'en' ? 'No subjects found matching your search.' : 'আপনার অনুসন্ধান অনুযায়ী কোন বিষয় পাওয়া যায়নি।') :
                  (language === 'en' ? 'Guides for this class are coming soon!' : 'এই শ্রেণীর গাইড শীঘ্রই আসছে!')}
              </p>
            </div>
          )}
          
          {/* Bangla Version Subjects */}
          {banglaSubjects.length > 0 && (
            <div className="mb-12">
              <div className="bg-bengal-100 dark:bg-bengal-800 p-4 rounded-lg mb-6">
                <h2 className={`text-xl font-bold text-bengal-800 dark:text-bengal-100 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'Bangla Medium' : 'বাংলা মাধ্যম'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {banglaSubjects.map(subject => (
                  <SubjectCard
                    key={subject.id}
                    id={subject.id}
                    name={subject.name}
                    name_bn={subject.name_bn}
                    version={subject.version}
                    file_path={subject.file_path}
                    description={subject.description}
                    description_bn={subject.description_bn}
                  />
                ))}
              </div>
            </div>
          )}
          
          {/* English Version Subjects */}
          {englishSubjects.length > 0 && (
            <div>
              <div className="bg-bengal-100 dark:bg-bengal-800 p-4 rounded-lg mb-6">
                <h2 className={`text-xl font-bold text-bengal-800 dark:text-bengal-100 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'English Medium' : 'ইংরেজি মাধ্যম'}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {englishSubjects.map(subject => (
                  <SubjectCard
                    key={subject.id}
                    id={subject.id}
                    name={subject.name}
                    name_bn={subject.name_bn}
                    version={subject.version}
                    file_path={subject.file_path}
                    description={subject.description}
                    description_bn={subject.description_bn}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ClassPage;
