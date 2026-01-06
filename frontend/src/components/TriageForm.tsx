import { useState } from 'react';
import { TriageResponses, PatientLocation } from '../types';

interface TriageFormProps {
  onSubmit: (responses: TriageResponses, location: PatientLocation) => void;
}

function TriageForm({ onSubmit }: TriageFormProps) {
  const [responses, setResponses] = useState<TriageResponses>({
    isConscious: null,
    hasSevereBleeding: null,
    breathingDifficulty: null,
    hasChestPain: null,
    hasHighFever: null,
    hasSevereTrauma: null,
    ageGroup: null,
  });

  const [location, setLocation] = useState<PatientLocation>({
    lat: 28.6139,
    lng: 77.2090,
  });

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const questions = [
    {
      id: 'isConscious',
      text: 'Is the patient conscious and responding?',
      subtitle: 'Can they respond to your voice or touch?',
      type: 'boolean' as const,
      options: [
        { value: true, label: 'Yes, Conscious', icon: '✓' },
        { value: false, label: 'No, Unconscious', icon: '✗', critical: true },
      ],
    },
    {
      id: 'hasSevereBleeding',
      text: 'Is there severe bleeding?',
      subtitle: 'Heavy blood flow that is difficult to stop',
      type: 'boolean' as const,
      options: [
        { value: false, label: 'No Severe Bleeding', icon: '✓' },
        { value: true, label: 'Yes, Severe Bleeding', icon: '⚠', critical: true },
      ],
    },
    {
      id: 'breathingDifficulty',
      text: 'How is the patient breathing?',
      subtitle: 'Observe chest movement and breathing rate',
      type: 'choice' as const,
      options: [
        { value: 'none', label: 'Normal Breathing', icon: '✓' },
        { value: 'mild', label: 'Mild Difficulty', icon: '○', warning: true },
        { value: 'severe', label: 'Severe Difficulty', icon: '⚠', critical: true },
      ],
    },
    {
      id: 'hasChestPain',
      text: 'Is the patient experiencing chest pain?',
      subtitle: 'Pain, pressure, or tightness in chest area',
      type: 'boolean' as const,
      options: [
        { value: false, label: 'No Chest Pain', icon: '✓' },
        { value: true, label: 'Yes, Chest Pain', icon: '⚠', critical: true },
      ],
    },
    {
      id: 'hasHighFever',
      text: 'Does the patient have high fever?',
      subtitle: 'Body feels very hot to touch (above 102°F / 39°C)',
      type: 'boolean' as const,
      options: [
        { value: false, label: 'No High Fever', icon: '✓' },
        { value: true, label: 'Yes, High Fever', icon: '○', warning: true },
      ],
    },
    {
      id: 'hasSevereTrauma',
      text: 'Any severe injury or trauma?',
      subtitle: 'Accident, fall, burns, broken bones, head injury',
      type: 'boolean' as const,
      options: [
        { value: false, label: 'No Severe Trauma', icon: '✓' },
        { value: true, label: 'Yes, Severe Trauma', icon: '⚠', critical: true },
      ],
    },
    {
      id: 'ageGroup',
      text: 'Patient age group?',
      subtitle: 'Approximate age range',
      type: 'choice' as const,
      options: [
        { value: 'infant', label: 'Infant (0-2 years)', icon: '👶' },
        { value: 'child', label: 'Child (3-12 years)', icon: '🧒' },
        { value: 'adult', label: 'Adult (13-60 years)', icon: '🧑' },
        { value: 'elderly', label: 'Elderly (60+ years)', icon: '👴' },
      ],
    },
  ];

  const handleAnswer = (questionId: string, value: any) => {
    setResponses((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    onSubmit(responses, location);
  };

  const isCurrentAnswered = responses[questions[currentQuestion].id as keyof TriageResponses] !== null;
  const allAnswered = Object.values(responses).every((val) => val !== null);
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const currentQ = questions[currentQuestion];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="card mb-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{currentQ.text}</h2>
          <p className="text-gray-600">{currentQ.subtitle}</p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {currentQ.options.map((option) => {
            const isSelected = responses[currentQ.id as keyof TriageResponses] === option.value;
            return (
              <button
                key={String(option.value)}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                className={`w-full radio-card ${isSelected ? 'radio-card-selected' : ''} ${
                  option.critical ? 'hover:border-danger-300 hover:bg-danger-50' : ''
                } ${option.warning ? 'hover:border-warning-300 hover:bg-warning-50' : ''}`}
              >
                <span className="flex items-center">
                  <span className="text-2xl mr-3">{option.icon}</span>
                  <span className="font-medium text-lg">{option.label}</span>
                </span>
                {isSelected && (
                  <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Location Input (shown on last question) */}
      {currentQuestion === questions.length - 1 && (
        <div className="card mb-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3">Patient Location (Optional)</h3>
          <p className="text-sm text-gray-600 mb-4">
            Helps us recommend the nearest hospital. Default: Central Delhi
          </p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Latitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={location.lat}
                onChange={(e) => setLocation({ ...location, lat: parseFloat(e.target.value) })}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Longitude
              </label>
              <input
                type="number"
                step="0.0001"
                value={location.lng}
                onChange={(e) => setLocation({ ...location, lng: parseFloat(e.target.value) })}
                className="input-field"
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="btn btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>

        {currentQuestion < questions.length - 1 ? (
          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="btn btn-primary btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Get Hospital Recommendation →
          </button>
        )}
      </div>

      {/* Help Text */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>All questions are required. Answer based on what you can observe.</p>
      </div>
    </div>
  );
}

export default TriageForm;

