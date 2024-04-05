import React, { useState } from 'react';

const RunInterface = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const executeCode = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/execute', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language }),
      });
      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('An error occurred while executing the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-10 w-full">
      <div className="flex items-center justify-center w-full mb-4 ml-2">
        <select
          className="w-1/2 p-2 mb-2 text-white bg-blue-500 border border-gray-700 rounded-md appearance-none"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          style={{ width: '150px' }} // Adjust the width as needed
        >
          <option value="python" className="text-white">Python</option>
          <option value="c" className="text-white">C</option>
          <option value="java" className="text-white">Java</option>
        </select>
      </div>
      <div className="flex justify-between w-full">
        <textarea
          className="w-1/2 h-80 p-2 mb-4 text-black bg-gray-900 border border-gray-700 rounded-md resize-none"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your code here..."
        />
        <div className="w-1/2 p-2 mb-4 ml-4 text-gray-300 bg-gray-900 border border-gray-700 rounded-md overflow-auto">
          <pre>{output}</pre>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mb-4 ml-2">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 disabled:opacity-50"
          onClick={executeCode}
          disabled={loading}
        >
          {loading ? 'Running...' : 'Run'}
        </button>
      </div>
    </div>
  );
};

export default RunInterface;
