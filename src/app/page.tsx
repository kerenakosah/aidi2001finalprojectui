'use client';

import { useState } from 'react'

export default function Home() {
    const [question, setQuestion] = useState('')
    const [answer, setAnswer] = useState('')
    const [loading, setLoading] = useState(false)

    const LOCAL_SERVER = 'http://localhost:8000';
    const SERVER = 'http://3.148.220.10:8000';

    const BASE = SERVER;
    const apiCall = async (url,method,jsonData) => {
        console.log('postCall to :',url,method,jsonData);
        const options = {
            method : method,
            headers : {
                'Content-Type': 'application/json',
            },
        }
        if (method === 'POST' && jsonData) {
            //add body to options
            options.body = jsonData
        }
        try {
            const res = await fetch(url, options);
            const data = await res.json();
            console.log('Response from server,', url, data);
            return data;
        } catch (error) {
            console.error('Error sending data:', url, error);
        }
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setAnswer('') // Clear previous answer
        setLoading(true)

        let url = `${BASE}/kickoff`

        const query = JSON.stringify({ query : question });
        const res = await apiCall(url, 'POST' , query);
        setAnswer(res)
        setLoading(false)
    }

    return (
        <main
        className="min-h-screen bg-cover bg-center flex flex-col items-start justify-start py-10 px-4 border-black"
        style={{
          backgroundImage: "url('canada.jpg')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
        >
          <div className="bg-white/50 p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto justify-start items-start ">
            <header className="text-3xl font-bold mb-6 text-center text-red-600 flex items-center justify-center gap-2">
              Ask IRCC Buddy! <span className="text-4xl animate-bounce">🍁</span>
            </header>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask something about Immigration to Canada..."
                className="w-full p-4 text-black rounded-lg shadow-sm focus:outline-none focus:ring focus:border-red-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                disabled={loading}
              >
                {loading ? 'Fetching...' : 'Get Answer'}
              </button>
            </form>


          </div>
          <div
            className = "justify-center"
          >
            {/* Loading Dots */}
            {loading && (
              <div className="flex justify-center align-center mt-4 border-black">
                <span className="animate-bounce delay-0 text-red-600 text-2xl mx-1">.</span>
                <span className="animate-bounce delay-200 text-red-600 text-2xl mx-1">.</span>
                <span className="animate-bounce delay-400 text-red-600 text-2xl mx-1">.</span>
              </div>
            )}
            {/* Answer */}
            {answer && (
              <div className="mt-6 bg-white p-4 rounded-md shadow border border-red-200">
                <h2 className="text-lg font-semibold mb-2 text-red-700">Answer:</h2>
                <p className="text-gray-800 whitespace-pre-wrap">{answer}</p>
                <button
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition"
                disabled={loading}
                onClick = { () => { setAnswer(''); setQuestion('') }}
                > 
                    new question 
                </button>
              </div>
            )}
          </div>
          
        </main>
    )
}
