// Wait for the entire page to load
window.addEventListener('load', function() {
    // Check if we're on a page where we want the chatbot
    if (document.body) {
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
                <input type="text" id="user-message" placeholder="Ask about our menu..." autocomplete="off" />
                <button id="send-message">
                    <i class="fas fa-paper-plane"></i>
                </button>
            </div>
        `;
        
        // Add to body
        document.body.appendChild(chatbotContainer);
        
        // Add a small delay to ensure styles are applied
        setTimeout(() => {
            chatbotContainer.style.opacity = '0';
            chatbotContainer.style.transition = 'opacity 0.5s ease';
            setTimeout(() => {
                chatbotContainer.style.opacity = '1';
            }, 100);
        }, 100);

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
            
            // Dietary restrictions - Enhanced with more details
            if (message.includes('vegetarian') || message.includes('veg') || message.includes('veg only')) {
                return `🌱 VEGETARIAN MENU OPTIONS 🌱

🍢 STARTERS:
• Paneer Tikka (Cottage cheese marinated in spices and grilled) - ₹300
• Hara Bhara Kebab (Spinach and green pea patties) - ₹280
• Veg Spring Rolls (Crispy rolls with vegetables) - ₹250
• Aloo Tikki (Spiced potato patties) - ₹220

🍛 MAIN COURSE:
• Paneer Butter Masala (Cottage cheese in creamy tomato gravy) - ₹400
• Dal Makhani (Black lentils cooked with butter and cream) - ₹350
• Malai Kofta (Veggie balls in rich gravy) - ₹380
• Chana Masala (Chickpeas in spicy gravy) - ₹320

🍚 RICE & BREADS:
• Veg Biryani (Fragrant basmati rice with mixed vegetables) - ₹300
• Jeera Rice - ₹180
• Naan, Roti, Paratha - ₹40-80 each

Would you like to know about our vegetarian thali options or need help creating a complete vegetarian menu for your event?`;
            }
            
            if (message.includes('non-veg') || message.includes('non veg') || message.includes('nonvegetarian') || message.includes('chicken') || message.includes('mutton')) {
                return `🍗 NON-VEGETARIAN SPECIALTIES 🍖

🍗 STARTERS:
• Chicken Tikka (Tender chicken marinated in spices) - ₹400
• Tandoori Chicken (Whole chicken marinated in yogurt and spices) - ₹450
• Mutton Seekh Kebab (Minced mutton kebabs) - ₹500
• Fish Amritsari (Crispy fried fish) - ₹480

🍛 MAIN COURSE:
• Butter Chicken (Tender chicken in rich tomato gravy) - ₹500
• Chicken Tikka Masala (Grilled chicken in spiced curry) - ₹480
• Mutton Rogan Josh (Tender mutton in aromatic gravy) - ₹550
• Prawns Masala (Fresh prawns in spicy curry) - ₹600

🍚 BIRYANI & RICE:
• Chicken Biryani (Fragrant rice with chicken) - ₹450
• Mutton Biryani (Aromatic rice with mutton) - ₹550
• Egg Biryani (Flavorful rice with boiled eggs) - ₹380

Would you like to know about our combo meals or need help planning a complete non-vegetarian menu for your event?`;
            }
            
            if (message.includes('vegan') || message.includes('plant-based') || message.includes('strictly veg')) {
                return `🌿 VEGAN-FRIENDLY OPTIONS (No dairy, eggs, or animal products) 🌿

🥗 STARTERS:
• Veg Spring Rolls (No egg in wrap) - ₹250
• Aloo Tikki (Made with oil, no ghee) - ₹220
• Chana Chaat (Chickpea salad with spices) - ₹200
• Corn Chaat (Spiced corn kernels) - ₹180

🍛 MAIN COURSE:
• Chana Masala (Chickpeas in spicy gravy) - ₹300
• Baingan Bharta (Smoked eggplant curry) - ₹280
• Dal Tadka (Tempered lentils) - ₹250
• Aloo Gobi (Potato and cauliflower curry) - ₹260

🍚 RICE & BREADS:
• Jeera Rice - ₹180
• Vegetable Pulao (No ghee) - ₹220
• Plain Roti (No ghee) - ₹30 each

💡 TIP: All our vegan dishes are prepared with vegetable oil instead of ghee. For complete assurance, please inform our staff about your dietary requirements when placing your order.`;
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
            
            // Default response with more specific menu guidance
            return `I'm your personal menu assistant! Here's how I can help you:

🍽️ MENU ASSISTANCE:
• "Show me vegetarian/vegan options"
• "What are your best non-veg dishes?"
• "I need a complete wedding menu"
• "What's included in your party package?"

💁‍♀️ DIETARY NEEDS:
• "Gluten-free options"
• "Jain food available?"
• "Dairy-free desserts"
• "No onion no garlic options"

💰 PRICING:
• "Price for 50 people"
• "What's included in the premium package?"
• "Any discounts for large orders?"

What would you like to know about our menu options?`;
        }
    } // Close the if (document.body) condition
}); // Close the window.addEventListener
