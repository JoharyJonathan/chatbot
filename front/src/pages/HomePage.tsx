import axios from "axios"
import React, { useState } from "react"

interface ChatMessage {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const HomePage: React.FC = () => {
    const [chatInput, setChatInput] = useState<string>('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [conversationId, setConversationId] = useState<string | null>(null);

    const handleChatSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!chatInput.trim()) return;

        const userMessage: ChatMessage = {
            role: 'user',
            content: chatInput,
            timestamp: new Date().toISOString(),
        };

        setChatHistory((prevHistory) => [...prevHistory, userMessage]);
        setChatInput('');
        setIsLoading(true);
        setError('');

        try {
            const payload: { prompt: string; model: string; conversation_id?: string } = {
                prompt: userMessage.content,
                model: 'llama3.2:3b',
            };
            if (conversationId) {
                payload.conversation_id = conversationId;
            }

            const response = await axios.post('http://localhost:8000/chat', payload);

            const assistantResponseContent = response.data.response;
            const returnedConversationId = response.data.conversation_id;

            const assistantMessage: ChatMessage = {
                role: 'assistant',
                content: assistantResponseContent,
                timestamp: new Date().toISOString(),
            };

            setChatHistory((prevHistory) => [...prevHistory, assistantMessage]);

            if (returnedConversationId && returnedConversationId !== conversationId) {
                setConversationId(returnedConversationId);
                console.log("Nouvelle conversation démarrée avec l'ID:", returnedConversationId);
            }

        } catch (err: any) {
            console.error('Error sending message to chatbot: ', err);
            if (err.response) {
                setError(`Erreur du chatbot: ${err.response.data.detail || 'Réponse inattendue'}`);
            } else if (err.request) {
                setError('Erreur serveur, vérifiez le serveur Ollama ou le backend !');
            } else {
                setError(`Erreur inattendue: ${err.message}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const startNewChat = () => {
        setConversationId(null);
        setChatHistory([]);
        setChatInput('');
        setError('');
        console.log("Nouvelle conversation démarrée.");
    };

    return (
        <div className="flex flex-col items-center p-4 min-h-screen bg-gray-50">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Chatbot Ollama</h2>

            <button
                onClick={startNewChat}
                className="bg-green-500 text-white px-5 py-2 rounded-full hover:bg-green-600 transition duration-300 ease-in-out mb-6 shadow-lg"
            >
                New chat
            </button>

            <div className="flex flex-col w-full max-w-2xl bg-white rounded-lg shadow-xl p-6 mb-6">
                <div className="flex-grow overflow-y-auto max-h-96 mb-4 p-2 border border-gray-200 rounded-md bg-gray-50">
                    {chatHistory.length === 0 ? (
                        <p className="text-gray-500 text-center italic">Start new conversation ...</p>
                    ) : (
                        chatHistory.map((msg, index) => (
                            <div key={index} className={`mb-3 p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-100 text-blue-800 self-end ml-auto' : 'bg-gray-200 text-gray-800 self-start mr-auto'}`}>
                                <strong className="capitalize">{msg.role}:</strong>
                                <p className="whitespace-pre-wrap">{msg.content}</p>
                                <span className="text-xs text-gray-500 block text-right">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                            </div>
                        ))
                    )}
                </div>

                <form onSubmit={handleChatSubmit} className="flex w-full">
                    <input
                        type="text"
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        placeholder="Ask question..."
                        disabled={isLoading}
                        className="flex-grow border-gray-300 border rounded-l-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="bg-blue-500 text-white px-6 py-3 rounded-r-full hover:bg-blue-600 transition duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                        {isLoading ? 'Thinking...' : 'Send'}
                    </button>
                </form>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        </div>
    );
};

export default HomePage