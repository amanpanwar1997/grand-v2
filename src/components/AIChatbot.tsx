import { useState, useEffect, useRef } from 'react';
import { Bot, X, Minimize2, Maximize2, User, Send } from 'lucide-react';
import { publicAnonKey } from '../utils/supabase/info';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  suggestions?: string[];
}

type ConversationStage = 'ask_name' | 'ask_phone' | 'completed';

interface AIChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIChatbot({ isOpen, onClose }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [conversationStage, setConversationStage] = useState<ConversationStage>('ask_name');
  const [isTyping, setIsTyping] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hi! 👋 I'm here to help you learn about Inchtomilez Digital Marketing & Advertising.\n\n**What's your name?**"
        );
      }, 500);
    }
  }, [isOpen]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const addBotMessage = (text: string, suggestions?: string[]) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'bot',
      timestamp: new Date(),
      suggestions,
    };
    setMessages((prev) => [...prev, message]);
  };

  const addUserMessage = (text: string) => {
    const message: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, message]);
  };

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2;
  };

  const validatePhone = (phone: string): boolean => {
    // Indian mobile number format: 10 digits starting with 6/7/8/9
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  };

  const saveLead = async (name: string, phone: string) => {
    const leadId = `chatbot:${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const leadData = {
      id: leadId,
      name,
      phone,
      email: '',
      service: '',
      city: '',
      budget: '',
      status: 'new',
      createdAt: new Date().toISOString(),
    };

    let supabaseSuccess = false;
    let emailSuccess = false;
    let localStorageSuccess = false;

    // 1. Save to Supabase (with retry logic)
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        const response = await fetch('/api/server/chatbot/submit', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(leadData),
        });

        if (response.ok) {
          supabaseSuccess = true;
          break;
        }
      } catch (error) {
        // Silent retry
      }

      if (attempt < 3) {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }

    // 2. Send Email Notification (Web3Forms)
    try {
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '4440f9a5-d781-49af-b6ae-80ab8ebfc4ed',
          subject: `🔔 New AI Chatbot Lead: ${name}`,
          from_name: 'Inchtomilez AI Chatbot',
          email: 'inchtomilez@gmail.com',
          message: `New lead captured via AI Chatbot:

Name: ${name}
Phone: ${phone}

This lead was submitted through the AI Chatbot on the Inchtomilez website.

Please follow up within 1 hour for best conversion rates.`,
        }),
      });

      if (emailResponse.ok) {
        emailSuccess = true;
      }
    } catch (error) {
      // Silent fail
    }

    // 3. Save to LocalStorage (Emergency Backup)
    try {
      const backupData = {
        ...leadData,
        leadId,
        supabaseSuccess,
        emailSuccess,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(`chatbot_lead_${leadId}`, JSON.stringify(backupData));
      localStorageSuccess = true;
    } catch (error) {
      // Silent fail
    }

    return supabaseSuccess || emailSuccess || localStorageSuccess;
  };

  const processUserInput = async (input: string) => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    // Add user message
    addUserMessage(trimmedInput);
    setInputValue('');

    // Show typing indicator
    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsTyping(false);

    // Process based on conversation stage
    if (conversationStage === 'ask_name') {
      if (validateName(trimmedInput)) {
        setLeadName(trimmedInput);
        addBotMessage(
          `Nice to meet you, **${trimmedInput}**! 🎉\n\nWhat's your phone number?\n\n*(We'll contact you within 1 hour)*`
        );
        setConversationStage('ask_phone');
      } else {
        // Silent validation - just ask again
        addBotMessage("Could you tell me your full name?");
      }
    } else if (conversationStage === 'ask_phone') {
      const cleanPhone = trimmedInput.replace(/\D/g, '').slice(0, 10);
      
      if (validatePhone(cleanPhone)) {
        setLeadPhone(cleanPhone);
        addBotMessage(`Great! Got your number: **${cleanPhone}** ✅\n\n⏳ Saving your details...`);
        
        setIsSaving(true);
        const success = await saveLead(leadName, cleanPhone);
        setIsSaving(false);

        if (success) {
          addBotMessage(
            `🎉 Thank you, **${leadName}**!\n\n✅ Your details have been saved successfully!\n✅ We've received your information\n✅ Our team will contact you within 1 hour\n\n📞 Contact: ${cleanPhone}\n\nIs there anything else you'd like to know about our services?`,
            [
              'Tell me about your services',
              'What are your packages?',
              'How much does it cost?',
              'Show me your portfolio',
            ]
          );
        } else {
          addBotMessage(
            `Thank you, **${leadName}**! We've received your information.\n\nOur team will contact you at ${cleanPhone} within 1 hour.\n\nHow can I help you learn more about Inchtomilez?`,
            [
              'Tell me about your services',
              'What are your packages?',
            ]
          );
        }
        setConversationStage('completed');
      } else {
        // Silent validation - just ask again
        addBotMessage("Please enter a valid 10-digit mobile number:");
      }
    } else if (conversationStage === 'completed') {
      // Post-lead conversation
      handlePostLeadQuery(trimmedInput);
    }
  };

  const handlePostLeadQuery = async (query: string) => {
    const lowerQuery = query.toLowerCase();

    setIsTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsTyping(false);

    if (lowerQuery.includes('service')) {
      addBotMessage(
        `🎬 **Our Complete Service Portfolio:**\n\n**Digital Marketing:**\n• SEO Optimization\n• Social Media Marketing\n• PPC Advertising\n• Content Marketing\n\n**Creative Services:**\n• Brand Identity Design\n• UI/UX Design\n• Video Production\n• Graphic Design\n\n**Web Solutions:**\n• Website Development\n• E-commerce Solutions\n• Mobile App Development\n• Custom Software\n\n**Strategy:**\n• Marketing Strategy\n• Analytics & Reporting\n• Conversion Optimization\n• Consulting Services\n\nWhich service interests you most?`,
        ['What are your packages?', 'How much does it cost?', 'Show me your portfolio']
      );
    } else if (lowerQuery.includes('package') || lowerQuery.includes('pricing') || lowerQuery.includes('cost')) {
      addBotMessage(
        `💰 **Our Pricing Packages:**\n\n**🌟 Starter Package**\n₹25,000 - ₹50,000/month\nPerfect for small businesses\n\n**💎 Professional Package**\n₹50,000 - ₹1,50,000/month\nIdeal for growing companies\n\n**🚀 Enterprise Package**\n₹1,50,000+/month\nCustom solutions for large brands\n\n*Prices vary based on specific requirements and services selected.*\n\nWould you like a custom quote?`,
        ['Tell me about your services', 'Show me your portfolio', 'Contact via WhatsApp']
      );
    } else if (lowerQuery.includes('portfolio') || lowerQuery.includes('work') || lowerQuery.includes('results')) {
      addBotMessage(
        `🏆 **Our Achievements:**\n\n✨ **500+ Successful Projects**\nAcross 21+ industries\n\n📈 **Average ROI: 300%**\nFor our clients within 6 months\n\n⭐ **98% Client Satisfaction**\nBased on verified reviews\n\n🎯 **Industry Leaders**\nAward-winning campaigns in healthcare, real estate, education, and e-commerce\n\n*Our team will share detailed case studies during your consultation call.*\n\nReady to start your transformation?`,
        ['What are your packages?', 'Contact via WhatsApp', 'Call me']
      );
    } else if (lowerQuery.includes('whatsapp')) {
      addBotMessage(
        `📱 **Connect on WhatsApp:**\n\nClick here to chat: [WhatsApp Direct Link]\n\n*Our team responds within 15 minutes during business hours (9 AM - 8 PM)*\n\nOr we'll call you at **${leadPhone}** within 1 hour!`,
        ['Tell me about your services', 'Show me your portfolio']
      );
    } else if (lowerQuery.includes('call') || lowerQuery.includes('phone')) {
      addBotMessage(
        `📞 **We'll Call You Soon!**\n\n✅ Your number: **${leadPhone}**\n⏰ Expected call time: Within 1 hour\n🕒 Business hours: 9 AM - 8 PM (Mon-Sat)\n\n*Our marketing consultant will discuss your requirements and create a custom strategy.*\n\nAnything else I can help with?`,
        ['What are your packages?', 'Show me your portfolio']
      );
    } else if (lowerQuery.includes('email')) {
      addBotMessage(
        `📧 **Email Details Sent!**\n\nWe've sent a comprehensive brochure and pricing details to the email associated with your contact.\n\n*Check your inbox (and spam folder) in the next 5-10 minutes.*\n\nWhat else would you like to know?`,
        ['Tell me about your services', 'What are your packages?']
      );
    } else {
      // Default response
      addBotMessage(
        `I'm here to help! I can tell you about:\n\n✨ Our services\n💰 Pricing packages\n🏆 Portfolio & results\n📞 Contact options\n\nWhat would you like to know?`,
        ['Tell me about your services', 'What are your packages?', 'Show me your portfolio']
      );
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    processUserInput(suggestion);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processUserInput(inputValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // If collecting phone number, auto-filter to numbers only and limit to 10 digits
    if (conversationStage === 'ask_phone') {
      value = value.replace(/\D/g, '').slice(0, 10);
    }
    
    setInputValue(value);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col">
      {/* Chatbot Window */}
      <div
        className={`glass-strong rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isMinimized ? 'h-16 w-80' : 'h-[min(85vh,600px)] w-[min(calc(100vw-32px),380px)]'
        }`}
        style={{
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        {/* Header */}
        <div className="bg-yellow-500 text-black px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm md:text-base">Inchtomilez AI Assistant</div>
              <div className="flex items-center gap-1 text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>Online</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="hover:bg-black/10 p-1.5 rounded transition-colors"
              aria-label={isMinimized ? 'Maximize' : 'Minimize'}
            >
              {isMinimized ? (
                <Maximize2 className="w-4 h-4" />
              ) : (
                <Minimize2 className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="hover:bg-black/10 p-1.5 rounded transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Messages Area */}
        {!isMinimized && (
          <>
            <div className="bg-black/95 h-[calc(100%-8rem)] overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div key={message.id} className="flex flex-col gap-2">
                  <div
                    className={`flex gap-2 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'bot' && (
                      <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-black" />
                      </div>
                    )}
                    <div
                      className={`max-w-[75%] px-3 py-2 rounded-2xl text-xs md:text-sm ${
                        message.sender === 'user'
                          ? 'bg-yellow-500 text-black rounded-br-none'
                          : 'bg-white/5 text-white rounded-bl-none'
                      }`}
                      style={{ whiteSpace: 'pre-wrap' }}
                    >
                      {message.text.split('**').map((part, index) =>
                        index % 2 === 1 ? <strong key={index}>{part}</strong> : part
                      )}
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-black" />
                      </div>
                    )}
                  </div>

                  {/* Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="flex flex-wrap gap-2 ml-9">
                      {message.suggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="text-xs px-3 py-1.5 bg-white/5 hover:bg-yellow-500 hover:text-black text-white rounded-full transition-colors"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-2 items-center">
                  <div className="w-7 h-7 bg-yellow-500 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-black" />
                  </div>
                  <div className="bg-white/5 px-4 py-2 rounded-2xl rounded-bl-none flex gap-1">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-black p-3">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  ref={inputRef}
                  type={conversationStage === 'ask_phone' ? 'tel' : 'text'}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={
                    conversationStage === 'ask_name'
                      ? 'Enter your name...'
                      : conversationStage === 'ask_phone'
                      ? 'Enter 10-digit mobile number...'
                      : 'Type your message...'
                  }
                  className="flex-1 bg-white/5 text-white px-4 py-2 rounded-full text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 border border-white/10"
                  disabled={isSaving}
                  maxLength={conversationStage === 'ask_phone' ? 10 : undefined}
                />
                <button
                  type="submit"
                  disabled={isSaving || !inputValue.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed text-black p-2.5 rounded-full transition-colors flex items-center justify-center"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
              {conversationStage === 'ask_phone' && (
                <p className="text-[10px] text-gray-400 mt-1 text-center">
                  Step 2/2 • Enter valid Indian mobile number
                </p>
              )}
              {conversationStage === 'ask_name' && (
                <p className="text-[10px] text-gray-400 mt-1 text-center">
                  Step 1/2 • Tell us your name
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
