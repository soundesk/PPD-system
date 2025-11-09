import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Progress } from './ui/progress';
import { ArrowLeft, ArrowRight, Flower2 } from 'lucide-react';

interface QuizProps {
  onComplete: (score: number) => void;
  onBack: () => void;
}

const questions = [
  {
    id: 1,
    question: "I have been able to laugh and see the funny side of things",
    options: [
      { text: "As much as I always could", value: 0 },
      { text: "Not quite so much now", value: 1 },
      { text: "Definitely not so much now", value: 2 },
      { text: "Not at all", value: 3 }
    ]
  },
  {
    id: 2,
    question: "I have looked forward with enjoyment to things",
    options: [
      { text: "As much as I ever did", value: 0 },
      { text: "Rather less than I used to", value: 1 },
      { text: "Definitely less than I used to", value: 2 },
      { text: "Hardly at all", value: 3 }
    ]
  },
  {
    id: 3,
    question: "I have blamed myself unnecessarily when things went wrong",
    options: [
      { text: "No, never", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, some of the time", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 4,
    question: "I have been anxious or worried for no good reason",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Hardly ever", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, very often", value: 3 }
    ]
  },
  {
    id: 5,
    question: "I have felt scared or panicky for no very good reason",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "No, not much", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, quite a lot", value: 3 }
    ]
  },
  {
    id: 6,
    question: "Things have been getting on top of me",
    options: [
      { text: "No, I have been coping as well as ever", value: 0 },
      { text: "No, most of the time I have coped quite well", value: 1 },
      { text: "Yes, sometimes I haven't been coping as well as usual", value: 2 },
      { text: "Yes, most of the time I haven't been able to cope at all", value: 3 }
    ]
  },
  {
    id: 7,
    question: "I have been so unhappy that I have had difficulty sleeping",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, sometimes", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 8,
    question: "I have felt sad or miserable",
    options: [
      { text: "No, not at all", value: 0 },
      { text: "Not very often", value: 1 },
      { text: "Yes, quite often", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 9,
    question: "I have been so unhappy that I have been crying",
    options: [
      { text: "No, never", value: 0 },
      { text: "Only occasionally", value: 1 },
      { text: "Yes, quite often", value: 2 },
      { text: "Yes, most of the time", value: 3 }
    ]
  },
  {
    id: 10,
    question: "The thought of harming myself has occurred to me",
    options: [
      { text: "Never", value: 0 },
      { text: "Hardly ever", value: 1 },
      { text: "Sometimes", value: 2 },
      { text: "Yes, quite often", value: 3 }
    ]
  }
];

export function Quiz({ onComplete, onBack }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [direction, setDirection] = useState(1);

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setSelectedAnswer(value);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
      
      if (currentQuestion < questions.length - 1) {
        setDirection(1);
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] ?? null);
      } else {
        // Calculate total score
        const finalAnswers = { ...answers, [currentQuestion]: selectedAnswer };
        const totalScore = Object.values(finalAnswers).reduce((sum, val) => sum + val, 0);
        onComplete(totalScore);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setDirection(-1);
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] ?? null);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 py-12 px-4 relative overflow-hidden">
      {/* Decorative elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 right-20 opacity-10"
      >
        <Flower2 className="w-64 h-64 text-purple-300" />
      </motion.div>
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button
            variant="ghost"
            onClick={onBack}
            className="mb-4 text-purple-700 hover:text-purple-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50">
            <div className="flex justify-between items-center mb-2">
              <span className="text-purple-700">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-purple-600">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </motion.div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentQuestion}
            custom={direction}
            initial={{ opacity: 0, x: direction * 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -100 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-8 bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-xl">
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 flex items-center justify-center text-white">
                    {currentQuestion + 1}
                  </div>
                  <h3 className="text-purple-900 flex-1">{currentQ.question}</h3>
                </div>
              </div>

              <RadioGroup
                value={selectedAnswer?.toString()}
                onValueChange={(value) => handleAnswer(parseInt(value))}
              >
                <div className="space-y-4">
                  {currentQ.options.map((option, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Label
                        htmlFor={`option-${index}`}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedAnswer === option.value
                            ? 'border-purple-400 bg-purple-50'
                            : 'border-pink-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                        }`}
                      >
                        <RadioGroupItem value={option.value.toString()} id={`option-${index}`} />
                        <span className="text-purple-900">{option.text}</span>
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>

              <div className="flex justify-between mt-8 gap-4">
                <Button
                  onClick={handlePrevious}
                  variant="outline"
                  disabled={currentQuestion === 0}
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={selectedAnswer === null}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                >
                  {currentQuestion === questions.length - 1 ? 'See Results' : 'Next'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
