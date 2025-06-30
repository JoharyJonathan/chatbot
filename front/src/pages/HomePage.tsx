import axios from "axios";
import React from "react"
import { useState} from "react"


const HomePage: React.FC = () => {
    const [chatInput, setChatInput] = useState('');
    const [chatResponse, setChatResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await axios.post('http://localhost:8000/chat', {
                prompt: chatInput,
                model: 'llama3.2:3b', // specify model or default backend
            });
            setChatResponse(response.data.response);
        } catch (err: any) {
            console.error('Error sending message to chatBot: ', err);
            if (err.response) {
                setError(`ChatBot error : ${err.response.data.detail || 'Unexpected Response'}`);
            } else if (err.request) {
                setError('Server error, check ollama server or backend server !');
            } else {
                setError(`Unexpected Error : ${err.message}`);
            }
            setChatResponse(''); // Remove last response
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center p-4">
            <h2 className="text-2xl font-bold mb-4">Chatbot Ollama</h2>
                <form onSubmit={handleChatSubmit} className="flex flex-col items-center w-full max-w-md">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask a question ..."
                      disabled={isLoading}
                      className="border-gray-300 border rounded-full p-3 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            {chatResponse && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
                    <h3 className="text-lg font-semibold mb-2">ChatBot's response :</h3>
                    <p className="text-gray-800 whitespace-pre-wrap">{chatResponse}</p>
                </div>
            )}
        </div>
    )
}

export default HomePage