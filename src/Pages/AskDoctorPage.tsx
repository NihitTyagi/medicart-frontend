/// <reference types="vite/client" />
import React, { useState } from 'react';

const SymptomCheckerPage = () => {
    const [symptoms, setSymptoms] = useState('');
    const [duration, setDuration] = useState('');
    const [age, setAge] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setAiResponse('');
        setIsLoading(true);

        if (!symptoms.trim() || !duration.trim() || !age.trim()) {
            setError('Please fill in all fields: symptoms, duration, and age.');
            setIsLoading(false);
            return;
        }

        try {
            const backendUrl ='http://localhost:5000';
            const response = await fetch(`${backendUrl}/api/symptoms/check`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ symptoms, duration, age }),
            });

            const data = await response.json();
            console.log("Response from backend:", data);

            if (!response.ok) {
                throw new Error(data.error || `HTTP error! status: ${response.status}`);
            }
            setAiResponse(data.suggestion);
        } catch (err) {
            console.error("Error fetching symptom info:", err);
            setError(err.message || 'Failed to get information. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">
                    ASK Mr. DOC 
                </h1>

                

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 sm:p-8 space-y-6">
                    <div>
                        <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-1">
                            What symptoms are you experiencing?
                        </label>
                        <textarea
                            id="symptoms"
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="e.g., persistent headache, mild fever, dry cough"
                            rows={4}
                            required
                            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="duration" className="block text-sm font-medium text-gray-700 mb-1">
                            For how long have you had these symptoms?
                        </label>
                        <input
                            type="text"
                            id="duration"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            placeholder="e.g., 2 days, about a week"
                            required
                            className="mt-1 block w-full px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        />
                    </div>

                    <div>
                        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                            What is your age?
                        </label>
                        <input
                            type="number"
                            id="age"
                            value={age}
                            onChange={(e) => setAge(e.target.value)}
                            placeholder="e.g., 35"
                            min="0"
                            max="120"
                            required
                            className="mt-1 block w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-blue focus:border-brand-blue sm:text-sm"
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-blue hover:bg-brand-blue-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-blue disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Getting Information...
                                </>
                            ) : 'Get AI Information'}
                        </button>
                    </div>
                </form> 

                {error && (
                    <div className="mt-6 text-black bg-danger-bg border border-danger-border text-danger-text px-4 py-3 rounded-md relative" role="alert">
                        <strong className="font-bold">Error: </strong>
                        <span className="block sm:inline">{error}</span>
                    </div>
                )}

                {aiResponse && (() => {
    let parsed;
    try {
        // Remove Markdown code block formatting if present
        const cleanedResponse = aiResponse.replace(/```json|```/g, '').trim();
        parsed = JSON.parse(cleanedResponse);
    } catch (err) {
        return (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                <strong className="font-bold">Invalid AI response format.</strong>
                <p>Please ensure the AI response is in valid JSON format.</p>
            </div>
        );
    }

    return (
        <div className="mt-8 bg-gray-50 shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">Mr.DOC's Suggestions:</h2>

            <div className="mb-6">
                <h3 className="text-lg font-medium text-green-700 mb-2">Suggested Medicines:</h3>
                <ul className="list-disc list-inside text-black">
                    {parsed.medicine.map((med, index) => (
                        <li key={index}>{med}</li>
                    ))}
                </ul>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-medium text-yellow-700 mb-2">Precautions:</h3>
                <p className="text-black">{parsed.precautions}</p>
            </div>

            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md">
                <p className="font-bold">Important Reminder:</p>
                <p>This information is general. For specific advice, diagnosis, or before taking any medication or product, <strong>please consult your doctor or a pharmacist.</strong></p>
            </div>
        </div>
    );
})()}
            </div>
        </div>
    );
};

export default SymptomCheckerPage;