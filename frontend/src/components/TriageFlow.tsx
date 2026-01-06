import { useState } from 'react';
import TriageForm from './TriageForm';
import ResultsScreen from './ResultsScreen';
import { TriageResponses, PatientLocation, TriageApiResponse } from '../types';
import { api } from '../services/api';

type FlowStep = 'form' | 'results';

function TriageFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>('form');
  const [triageResult, setTriageResult] = useState<TriageApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTriageSubmit = async (
    responses: TriageResponses,
    location: PatientLocation
  ) => {
    setLoading(true);
    setError(null);

    try {
      const result = await api.submitTriage(responses, location);
      setTriageResult(result);
      setCurrentStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process triage');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('form');
    setTriageResult(null);
    setError(null);
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      {error && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="bg-danger-50 border border-danger-200 rounded-lg p-4">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-danger-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <h3 className="font-semibold text-danger-900">Error</h3>
                <p className="text-sm text-danger-700">{error}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-primary-600 mb-4"></div>
            <p className="text-lg text-gray-600">Processing assessment...</p>
          </div>
        </div>
      )}

      {!loading && currentStep === 'form' && (
        <TriageForm onSubmit={handleTriageSubmit} />
      )}

      {!loading && currentStep === 'results' && triageResult && (
        <ResultsScreen result={triageResult} onStartOver={handleStartOver} />
      )}
    </div>
  );
}

export default TriageFlow;

