
import { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ClassCard from '@/components/ClassCard';
import Stars from '@/components/Stars';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import guides from '@/data/guides.json';

const Index = () => {
  const { language } = useApp();
  const [search, setSearch] = useState('');
  const [filteredClasses, setFilteredClasses] = useState(guides.classes);
  const [quote, setQuote] = useState(guides.quotes[0]);
  
  // Filter classes based on search term
  useEffect(() => {
    if (!search) {
      setFilteredClasses(guides.classes);
      return;
    }
    
    const lowercaseSearch = search.toLowerCase();
    const filtered = guides.classes.filter(cls => {
      return (
        cls.name.toLowerCase().includes(lowercaseSearch) ||
        cls.name_bn.includes(search)
      );
    });
    
    setFilteredClasses(filtered);
  }, [search]);
  
  // Change quote periodically
  useEffect(() => {
    let interval: number;
    
    if (guides.quotes.length > 1) {
      interval = window.setInterval(() => {
        setQuote(prev => {
          const currentIndex = guides.quotes.findIndex(q => q.text === prev.text);
          const nextIndex = (currentIndex + 1) % guides.quotes.length;
          return guides.quotes[nextIndex];
        });
      }, 10000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, []);
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
  };
  
  const scrollToClasses = () => {
    const classesSection = document.getElementById('classes-section');
    if (classesSection) {
      classesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const downloadSamplePDF = () => {
    alert(language === 'en' ? 'Sample PDF download feature coming soon!' : 'নমুনা পিডিএফ ডাউনলোড ফিচার শীঘ্রই আসছে!');
  };
  
  const showContactInfo = () => {
    alert(language === 'en' ? 'Contact: info@guideofeveryclass.com' : 'যোগাযোগ: info@guideofeveryclass.com');
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-bengal-50 to-white dark:from-bengal-950 dark:to-bengal-900">
      <Stars />
      
      <Header onSearchChange={handleSearchChange} />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative px-4 pt-16 pb-32 sm:pt-24 md:pt-32 md:pb-40 overflow-hidden">
          <div className="container mx-auto text-center relative z-10">
            <h1 
              className={`text-4xl sm:text-5xl md:text-6xl font-bold text-bengal-800 dark:text-bengal-100 mb-6 animate-float ${language === 'bn' ? 'font-bengali' : ''}`}
            >
              {language === 'en' ? 'Guide of Every Class' : 'প্রতি শ্রেণীর গাইড'}
            </h1>
            
            <p 
              className={`text-xl md:text-2xl text-bengal-600 dark:text-bengal-300 mb-10 max-w-2xl mx-auto ${language === 'bn' ? 'font-bengali' : ''}`}
            >
              {language === 'en' 
                ? 'A comprehensive education guide for students in classes 1 to 10. Explore subject guides in both Bangla and English.' 
                : 'ক্লাস ১ থেকে ১০ পর্যন্ত শিক্ষার্থীদের জন্য একটি সম্পূর্ণ শিক্ষা গাইড। বাংলা এবং ইংরেজি উভয় ভাষায় বিষয় গাইড অন্বেষণ করুন।'}
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                className="rounded-full text-lg py-6 px-8 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={scrollToClasses}
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'en' ? 'Browse Guides' : 'গাইড দেখুন'}
                </span>
              </Button>
              
              <Button 
                variant="outline"
                className="rounded-full bg-green-600 hover:bg-green-700 text-white border-none text-lg py-6 px-8"
                onClick={downloadSamplePDF}
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'en' ? 'Download PDF' : 'পিডিএফ ডাউনলোড করুন'}
                </span>
              </Button>
              
              <Button 
                variant="outline"
                className="rounded-full bg-purple-600 hover:bg-purple-700 text-white border-none text-lg py-6 px-8"
                onClick={showContactInfo}
              >
                <span className={language === 'bn' ? 'font-bengali' : ''}>
                  {language === 'en' ? 'Contact' : 'যোগাযোগ'}
                </span>
              </Button>
            </div>
            
            {/* Quote */}
            <div className="mt-12 md:mt-16 max-w-2xl mx-auto">
              <blockquote className="p-6 bg-white dark:bg-bengal-900/50 rounded-xl shadow-md border border-bengal-200 dark:border-bengal-800">
                <p className={`text-bengal-700 dark:text-bengal-300 italic text-lg mb-2 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  "{language === 'en' ? quote.text : quote.text_bn}"
                </p>
                <footer className="text-bengal-500 dark:text-bengal-400">— {quote.author}</footer>
              </blockquote>
            </div>
          </div>
        </section>
        
        <Separator className="mx-auto w-[90%] max-w-5xl h-1 bg-bengal-200 dark:bg-bengal-800 rounded-full my-4" />
        
        {/* Classes Section */}
        <section id="classes-section" className="px-4 py-16">
          <div className="container mx-auto">
            <h2 className={`section-title text-center ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? 'Browse by Class' : 'শ্রেণী অনুসারে দেখুন'}
            </h2>
            
            {filteredClasses.length === 0 ? (
              <div className="text-center py-12">
                <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'No classes found matching your search.' : 'আপনার অনুসন্ধান অনুযায়ী কোন শ্রেণী পাওয়া যায়নি।'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {filteredClasses.map((cls) => (
                  <ClassCard 
                    key={cls.id} 
                    id={cls.id} 
                    name={cls.name} 
                    name_bn={cls.name_bn} 
                  />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <Separator className="mx-auto w-[90%] max-w-5xl h-1 bg-bengal-200 dark:bg-bengal-800 rounded-full my-4" />
        
        {/* Quick Tips Section */}
        <section className="px-4 py-16 bg-bengal-50 dark:bg-bengal-900/30">
          <div className="container mx-auto">
            <h2 className={`section-title text-center ${language === 'bn' ? 'font-bengali' : ''}`}>
              {language === 'en' ? 'Quick Tips' : 'দ্রুত টিপস'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white dark:bg-bengal-900 p-6 rounded-xl shadow-md border border-bengal-200 dark:border-bengal-800">
                <h3 className={`font-bold text-lg mb-2 text-bengal-700 dark:text-bengal-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'Study Schedule' : 'অধ্যয়ন সূচি'}
                </h3>
                <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' 
                    ? 'Create a consistent study schedule with breaks to maximize learning efficiency.' 
                    : 'শিক্ষার দক্ষতা বাড়াতে বিরতি সহ একটি নিয়মিত অধ্যয়ন সূচি তৈরি করুন।'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-bengal-900 p-6 rounded-xl shadow-md border border-bengal-200 dark:border-bengal-800">
                <h3 className={`font-bold text-lg mb-2 text-bengal-700 dark:text-bengal-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'Active Learning' : 'সক্রিয় শিক্ষা'}
                </h3>
                <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' 
                    ? 'Engage actively with the material by taking notes, teaching concepts to others, or creating diagrams.' 
                    : 'নোট নেওয়া, অন্যদের কাছে ধারণা শেখানো বা ডায়াগ্রাম তৈরি করে বিষয়বস্তুর সাথে সক্রিয়ভাবে জড়িত হন।'}
                </p>
              </div>
              
              <div className="bg-white dark:bg-bengal-900 p-6 rounded-xl shadow-md border border-bengal-200 dark:border-bengal-800">
                <h3 className={`font-bold text-lg mb-2 text-bengal-700 dark:text-bengal-300 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' ? 'Practice Questions' : 'অনুশীলন প্রশ্ন'}
                </h3>
                <p className={`text-bengal-600 dark:text-bengal-400 ${language === 'bn' ? 'font-bengali' : ''}`}>
                  {language === 'en' 
                    ? 'Regularly solve practice questions to reinforce your understanding and identify weak areas.' 
                    : 'আপনার বোঝাপড়া শক্তিশালী করতে এবং দুর্বল ক্ষেত্রগুলি চিহ্নিত করতে নিয়মিত অনুশীলন প্রশ্ন সমাধান করুন।'}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
