import { useState } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw } from 'lucide-react';
import type { QuizQuestion } from '../types';

interface QuizBlockProps {
  questions: QuizQuestion[];
  sectionId: string;
  onComplete?: () => void;
}

export default function QuizBlock({ questions, sectionId: _sectionId, onComplete }: QuizBlockProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [scores, setScores] = useState<boolean[]>([]);
  const [finished, setFinished] = useState(false);

  const question = questions[currentIndex];
  const isCorrect = selectedOption === question?.correctIndex;

  function handleCheck() {
    if (selectedOption === null) return;
    setAnswered(true);
    const newScores = [...scores, selectedOption === question.correctIndex];
    setScores(newScores);
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setAnswered(false);
    } else {
      setFinished(true);
      onComplete?.();
    }
  }

  function handleRestart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswered(false);
    setScores([]);
    setFinished(false);
  }

  if (finished) {
    const correct = scores.filter(Boolean).length;
    return (
      <div className="bg-brand-50/60 border border-brand-200/60 rounded-2xl p-6">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-brand-100 rounded-2xl mb-4">
            <CheckCircle2 className="w-7 h-7 text-brand-600" />
          </div>
          <h3 className="text-lg font-bold text-steel-900">Quiz Complete</h3>
          <p className="text-3xl font-extrabold text-brand-600 mt-2">
            {correct}/{questions.length}
          </p>
          <p className="text-sm text-steel-500 mt-1">
            {correct === questions.length
              ? 'Perfect score!'
              : correct >= questions.length / 2
                ? 'Good work! Review the topics you missed.'
                : 'Keep studying and try again.'}
          </p>
          <button
            onClick={handleRestart}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-brand-600 bg-white border border-brand-200 rounded-xl hover:bg-brand-50 transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-50/40 border border-brand-200/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-brand-700">Knowledge Check</h3>
        <span className="text-xs font-semibold text-brand-500 bg-brand-100 px-2.5 py-1 rounded-full">
          {currentIndex + 1} of {questions.length}
        </span>
      </div>

      <p className="text-sm font-semibold text-steel-900 mb-3">{question.question}</p>

      <div className="space-y-2">
        {question.options.map((option, i) => {
          let optionStyle = 'bg-white border-steel-200 hover:border-brand-300 hover:bg-brand-50/50';
          if (answered) {
            if (i === question.correctIndex) {
              optionStyle = 'bg-success-50 border-success-300 text-success-800';
            } else if (i === selectedOption && !isCorrect) {
              optionStyle = 'bg-danger-50 border-danger-300 text-danger-800';
            } else {
              optionStyle = 'bg-steel-50 border-steel-200 opacity-60';
            }
          } else if (i === selectedOption) {
            optionStyle = 'bg-brand-50 border-brand-400 ring-1 ring-brand-400';
          }

          return (
            <button
              key={i}
              onClick={() => !answered && setSelectedOption(i)}
              disabled={answered}
              className={`w-full text-left px-4 py-3 rounded-xl border text-sm transition-all duration-200 ${optionStyle}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-steel-100 flex items-center justify-center text-xs font-bold text-steel-500 flex-shrink-0">
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="flex-1">{option}</span>
                {answered && i === question.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-success-500 flex-shrink-0" />
                )}
                {answered && i === selectedOption && !isCorrect && i !== question.correctIndex && (
                  <XCircle className="w-4 h-4 text-danger-500 flex-shrink-0" />
                )}
              </div>
            </button>
          );
        })}
      </div>

      {answered && (
        <div className={`mt-3 p-3 rounded-xl text-sm ${
          isCorrect ? 'bg-success-50 border border-success-200 text-success-800' : 'bg-danger-50 border border-danger-200 text-danger-800'
        }`}>
          {question.explanation}
        </div>
      )}

      <div className="mt-4 flex justify-end">
        {!answered ? (
          <button
            onClick={handleCheck}
            disabled={selectedOption === null}
            className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Check Answer
          </button>
        ) : (
          <button onClick={handleNext} className="btn-primary text-sm">
            {currentIndex < questions.length - 1 ? (
              <>Next Question <ArrowRight className="w-4 h-4" /></>
            ) : (
              'See Results'
            )}
          </button>
        )}
      </div>
    </div>
  );
}
