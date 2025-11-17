import { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InfoSection } from './components/InfoSection';
import { Quiz } from './components/Quiz';
import { Results } from './components/Results';
import { Profile } from './components/Profile';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'profile' | 'quiz' | 'results'>('home');
  const [quizScore, setQuizScore] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setCurrentPage('quiz');
    setQuizScore(null);
  };

  const handleQuizComplete = (score: number) => {
    setQuizScore(score);
    setCurrentPage('results');
  };

  const handleReset = () => {
    setCurrentPage('home');
    setQuizScore(null);
  };

  const handleNavigate = (page: 'home' | 'profile') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      
      {currentPage === 'home' && (
        <>
          <Hero onStartQuiz={handleStartQuiz} />
          <InfoSection onStartQuiz={handleStartQuiz} />
        </>
      )}
      
      {currentPage === 'profile' && (
        <Profile />
      )}
      
      {currentPage === 'quiz' && (
        <Quiz onComplete={handleQuizComplete} onBack={handleReset} />
      )}
      
      {currentPage === 'results' && quizScore !== null && (
        <Results score={quizScore} onReset={handleReset} />
      )}
    </div>
  );
}