document.addEventListener('DOMContentLoaded', function() {
    // Create chatbot container
    const chatbotContainer = document.createElement('div');
    chatbotContainer.id = 'chatbot-container';
    chatbotContainer.innerHTML = `
        <div id="chatbot-header">
            <span>Menu Assistant</span>
            <button id="minimize-chat">−</button>
        </div>
        <div id="chatbot-messages">
            <div class="chatbot-message bot">
                Hello! I'm your menu assistant. How can I help you today?<br><br>
                You can ask me about:<br>
                • Menu suggestions for events<br>
                • Dietary restrictions<br>
                • Popular dishes<br>
                • Pricing information
            </div>
        </div>
        <div id="chatbot-input">
            <input type="text" id="user-message" placeholder="Ask about our menu..." />
            <button id="send-message">Send</button>
        </div>
    `;
    document.body.appendChild(chatbotContainer);

    // Toggle chat window
    const minimizeBtn = document.getElementById('minimize-chat');
    const chatContainer = document.getElementById('chatbot-container');
    let isMinimized = false;

    minimizeBtn.addEventListener('click', function() {
        isMinimized = !isMinimized;
        if (isMinimized) {
            chatContainer.style.height = '50px';
            chatContainer.style.overflow = 'hidden';
            minimizeBtn.textContent = '+';
        } else {
            chatContainer.style.height = '500px';
            chatContainer.style.overflow = 'auto';
            minimizeBtn.textContent = '−';
        }
    });

    // Handle user messages
    const userInput = document.getElementById('user-message');
    const sendBtn = document.getElementById('send-message');
    const messagesContainer = document.getElementById('chatbot-messages');

    function addMessage(message, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${isUser ? 'user' : 'bot'}`;
        messageDiv.textContent = message;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // Add user message to chat
        addMessage(message, true);
        userInput.value = '';

        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'chatbot-message bot typing';
        typingIndicator.textContent = '...';
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Simulate bot response
        setTimeout(() => {
            messagesContainer.removeChild(typingIndicator);
            const response = generateResponse(message.toLowerCase());
            addMessage(response);
        }, 1000);
    }

    // Handle Enter key press
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    // Handle send button click
    sendBtn.addEventListener('click', handleUserMessage);

    // Simple response generator
    function generateResponse(message) {
        // Menu suggestions
        if (message.includes('menu') || message.includes('suggest') || message.includes('recommend')) {
            if (message.includes('wedding') || message.includes('marriage')) {
                return `For weddings, we recommend our premium package which includes:
                • Starter: Paneer Tikka & Hara Bhara Kebab
                • Main Course: Butter Chicken, Dal Makhani, Paneer Butter Masala
                • Bread: Naan, Tandoori Roti
                • Rice: Jeera Rice, Pulao
                • Dessert: Gulab Jamun, Rasmalai`;
            } else if (message.includes('birthday') || message.includes('party')) {
                return `For birthdays and parties, our special package includes:
                • Starters: Veg Spring Rolls, Chicken Lollipop
                • Main Course: Kadhai Paneer, Chicken Tikka Masala
                • Chinese: Veg Fried Rice, Chilli Paneer
                • Snacks: Pasta, Pizza
                • Dessert: Pastry, Ice Cream`;
            } else if (message.includes('corporate') || message.includes('office')) {
                return `For corporate events, we suggest:
                • Snacks: Veg Cutlet, Paneer Tikka, Chicken Wings
                • Main Course: Paneer Lababdar, Chole Bhature, Biryani
                • Dessert: Rasgulla, Kaju Katli`;
            }
            return `Here are some of our popular menu categories:\n1. North Indian\n2. South Indian\n3. Chinese\n4. Continental\n5. Desserts\n\nWould you like to know more about any specific category or type of event you're planning?`;
        }
        
        // Dietary restrictions
        if (message.includes('vegetarian') || message.includes('veg')) {
            return `We have a wide range of vegetarian options including:\n• Starters: Paneer Tikka, Hara Bhara Kebab\n• Main Course: Paneer Butter Masala, Dal Makhani\n• Breads: Naan, Roti, Paratha\n• Rice: Veg Biryani, Jeera Rice\n\nWould you like more details about any of these?`;
        }
        
        if (message.includes('non-veg') || message.includes('non veg') || message.includes('nonvegetarian')) {
            return `Our non-vegetarian specialties include:\n• Starters: Chicken Tikka, Tandoori Chicken\n• Main Course: Butter Chicken, Chicken Tikka Masala, Mutton Rogan Josh\n• Biryani: Chicken Biryani, Mutton Biryani\n• Seafood: Fish Curry, Prawns Masala\n\nWould you like to know more about any of these dishes?`;
        }
        
        if (message.includes('vegan') || message.includes('plant-based')) {
            return `We offer several vegan options:\n• Starters: Veg Spring Rolls, Aloo Tikki\n• Main Course: Chana Masala, Baingan Bharta, Dal Tadka\n• Rice: Jeera Rice, Vegetable Pulao\n• Bread: Roti, Naan (without ghee)\n\nPlease let us know if you need any modifications to suit your dietary needs.`;
        }
        
        // Pricing information
        if (message.includes('price') || message.includes('cost') || message.includes('how much')) {
            return `Our pricing varies based on the menu and number of guests. Here's a general idea:\n• Basic Vegetarian: Starting at ₹500 per plate\n• Premium Vegetarian: Starting at ₹800 per plate\n• Non-Vegetarian: Starting at ₹900 per plate\n• Premium Non-Veg: Starting at ₹1200 per plate\n\nFor an exact quote, please share:\n1. Type of event\n2. Expected number of guests\n3. Preferred cuisine type`;
        }
        
        // Greetings
        if (message.includes('hi') || message.includes('hello') || message.includes('hey')) {
            return 'Hello! I\'m here to help you with menu suggestions. What type of event are you planning?';
        }
        
        // Thank you
        if (message.includes('thank') || message.includes('thanks')) {
            return 'You\'re welcome! Is there anything else I can help you with?';
        }
        
        // Default response
        return 'I\'m here to help with menu suggestions. You can ask me about:\n• Menu options for different events\n• Dietary restrictions (vegetarian, vegan, etc.)\n• Pricing information\n• Popular dishes\n\nWhat would you like to know?';
    }
});
