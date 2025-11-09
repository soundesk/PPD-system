import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Heart, Brain, Users, Sparkles } from 'lucide-react';

interface InfoSectionProps {
  onStartQuiz: () => void;
}

export function InfoSection({ onStartQuiz }: InfoSectionProps) {
  const symptoms = [
    { icon: Brain, title: 'Emotional Changes', desc: 'Persistent sadness, mood swings, or feeling overwhelmed' },
    { icon: Heart, title: 'Loss of Interest', desc: 'Reduced interest in activities you once enjoyed' },
    { icon: Users, title: 'Social Withdrawal', desc: 'Difficulty bonding with your baby or withdrawing from loved ones' },
    { icon: Sparkles, title: 'Physical Symptoms', desc: 'Changes in sleep, appetite, or energy levels' }
  ];

  return (
    <div id="info" className="relative min-h-screen bg-gradient-to-b from-rose-50 via-pink-50 to-purple-50 py-20 px-4">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-pink-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-200/20 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-purple-900 mb-4">Understanding Postpartum Depression</h2>
          <p className="text-purple-700 max-w-3xl mx-auto text-lg">
            Postpartum depression is a serious but treatable condition. Recognizing the signs 
            is crucial for getting the help you need and deserve.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {symptoms.map((symptom, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-pink-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl">
                    <symptom.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-purple-900 mb-2">{symptom.title}</h3>
                    <p className="text-purple-700">{symptom.desc}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 p-10 rounded-3xl text-center border border-purple-200/50"
        >
          <h3 className="text-purple-900 mb-4">Ready to Take the First Step?</h3>
          <p className="text-purple-700 mb-6 max-w-2xl mx-auto">
            Our screening questionnaire is based on validated clinical tools. It takes just 5 minutes 
            and can help you understand if you might benefit from professional support.
          </p>
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            Begin Assessment
          </Button>
          <p className="text-sm text-purple-600 mt-4">
            ⚕️ This is a screening tool, not a diagnosis. Please consult a healthcare provider for professional evaluation.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
