'use client'

import { useState } from 'react'

export default function Home() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setAnswer('') // Clear previous answer
    setLoading(true)

    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question }),
    })

    const data = await res.json()
    setAnswer(data.answer)
    setLoading(false)
  }

  return (
    <main
    className="min-h-screen bg-cover bg-center flex flex-col items-start justify-start py-10 px-4"
    style={{
      backgroundImage: "url('canada.jpg')",
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
    }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-lg w-full max-w-xl mx-auto mt-32">
        <header className="text-3xl font-bold mb-6 text-center text-red-600 flex items-center justify-center gap-2">
          Ask IRCC Buddy! <span className="text-4xl animate-bounce">🍁</span>
        </header>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about IRCC..."
            className="w-full p-4 border rounded-lg shadow-sm focus:outline-none focus:ring focus:border-red-400"
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

        {/* Loading Dots */}
        {loading && (
          <div className="flex justify-center mt-4">
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
          </div>
        )}
      </div>
    </main>
  )
}
