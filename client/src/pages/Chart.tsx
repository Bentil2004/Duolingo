import React, { useState, useRef, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f0f8f0;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const ChatContainer = styled.div`
  height: 400px;
  overflow-y: auto;
  padding: 1rem;
  background: white;
  border-radius: 10px;
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const Message = styled(motion.div)`
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 10px;
  animation: ${fadeIn} 0.3s ease-in;
`;

const UserMessage = styled(Message)`
  background: #2e7d32;
  color: white;
  align-self: flex-end;
  max-width: 75%;
`;

const BotMessage = styled(Message)`
  background: #e8f5e9;
  color: #2e7d32;
  align-self: flex-start;
  max-width: 75%;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  border: 2px solid #2e7d32;
  border-radius: 10px;
  margin-bottom: 1rem;
  font-size: 1rem;
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #4caf50;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  background: #2e7d32;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background: #1b5e20;
  }
  &:disabled {
    background: #a5d6a7;
    cursor: not-allowed;
  }
`;

interface Message {
  text: string;
  isUser: boolean;
}

const CulturalChat: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isUser: true }]);
    setIsLoading(true);

    try {
      const response = await fetch("https://stupid-cougars-exist.loca.lt/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: userMessage })
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.response, isUser: false }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry, there was an error connecting to the server.", isUser: false },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <Container>
      <h1 style={{ color: "#2E7D32", textAlign: "center", marginBottom: "2rem" }}>
        Cultural Knowledge Assistant
      </h1>
      <ChatContainer ref={chatRef}>
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {message.isUser ? (
                <UserMessage>{message.text}</UserMessage>
              ) : (
                <BotMessage>{message.text}</BotMessage>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && <BotMessage>Thinking...</BotMessage>}
      </ChatContainer>
      <form onSubmit={handleSubmit}>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about Spanish or French culture..."
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Asking..." : "Ask"}
        </Button>
      </form>
    </Container>
  );
};

export default CulturalChat;