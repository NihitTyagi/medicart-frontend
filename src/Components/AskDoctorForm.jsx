import React, { useState } from "react";
import axios from "axios";

const AskDoctorForm = () => {
  const [symptoms, setSymptoms] = useState("");
  const [duration, setDuration] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/medicine-suggestions", {
        symptoms,
        duration,
      });

      setMedicines(response.data.medicines);
    } catch (err) {
      console.error("Error fetching medicine suggestions:", err);
      setError("Failed to fetch medicine suggestions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-orange-600 mb-8">Ask a Doctor</h1>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Describe Your Symptoms</h2>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              What symptoms are you facing?
            </label>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
              placeholder="e.g., fever, headache, cough"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              How many days have you been facing these symptoms?
            </label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-orange-600"
              placeholder="e.g., 3"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-orange-600 text-white py-2 px-4 rounded w-full hover:bg-orange-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Finding Medicines..." : "Find Medicine"}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>

        {medicines.length > 0 && (
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Suggested Medicines</h2>
            <ul className="list-disc pl-5">
              {medicines.map((medicine, index) => (
                <li key={index} className="text-gray-700">{medicine}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AskDoctorForm;
