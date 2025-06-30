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
        <div>
            <h2>Chatbot Ollama</h2>
                <form onSubmit={handleChatSubmit}>
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Enter your message ..."
                      disabled={isLoading}
                      className="border-gray-600 border-2 rounded-3xl p-4 mx-3 my-4"
                    />
                    <button type="submit" disabled={isLoading} className="bg-gray-300 px-2 py-3 rounded-xl hover:bg-gray-400">
                      {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {chatResponse && (
                <div>
                    <h3>Chatbot's response :</h3>
                    <p>{chatResponse}</p>
                </div>
            )}
        </div>
    )
}

export default HomePage