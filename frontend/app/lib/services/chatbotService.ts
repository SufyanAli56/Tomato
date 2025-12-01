'use client';

// Complete menu data
const menuData = [
  {
    category: "salads",
    items: [
      { name: "Greek Salad", price: 12, rating: 4, description: "Fresh veggies with olives, feta & herbs" },
      { name: "Veggie Garden Salad", price: 10, rating: 5, description: "Colorful greens with lemon dressing" },
      { name: "Caesar Crunch Salad", price: 14, rating: 4, description: "Classic Caesar with crunchy toppings" },
      { name: "Avocado Fresh Salad", price: 13, rating: 5, description: "Creamy avocado mixed with veggies" }
    ]
  },
  {
    category: "rolls", 
    items: [
      { name: "Veg Spring Roll", price: 8, rating: 4, description: "Crispy fried rolls with veggies" },
      { name: "Paneer Tikka Roll", price: 11, rating: 5, description: "Paneer tikka wrapped in soft roti" },
      { name: "Chicken Shawarma Roll", price: 12, rating: 4, description: "Middle-eastern style juicy chicken roll" },
      { name: "Egg Masala Roll", price: 10, rating: 4, description: "Egg masala wrapped in rumali roti" }
    ]
  },
  {
    category: "desserts",
    items: [
      { name: "Chocolate Lava Cake", price: 9, rating: 5, description: "Hot lava cake with melting core" },
      { name: "Strawberry Cheesecake", price: 11, rating: 5, description: "Creamy cheesecake with strawberry syrup" },
      { name: "Blueberry Mousse", price: 10, rating: 4, description: "Soft mousse with blueberry flavor" },
      { name: "Vanilla Pudding Delight", price: 7, rating: 4, description: "Classic vanilla pudding served chilled" }
    ]
  },
  {
    category: "sandwiches",
    items: [
      { name: "Grilled Cheese Sandwich", price: 8, rating: 5, description: "Melty cheese between toasted bread" },
      { name: "Chicken Mayo Sandwich", price: 12, rating: 4, description: "Chicken chunks mixed with mayo" },
      { name: "Veggie Club Sandwich", price: 10, rating: 4, description: "Triple-layered sandwich loaded with veggies" },
      { name: "Paneer Cheese Grill Sandwich", price: 11, rating: 5, description: "Paneer with cheese grilled to perfection" }
    ]
  },
  {
    category: "cakes",
    items: [
      { name: "Chocolate Fudge Cake", price: 14, rating: 5, description: "Rich chocolate fudge layered cake" },
      { name: "Red Velvet Cake", price: 15, rating: 5, description: "Soft red velvet topped with cream cheese" },
      { name: "Black Forest Cake", price: 16, rating: 4, description: "Chocolate cake with cherries" },
      { name: "Pineapple Cream Cake", price: 13, rating: 4, description: "Light pineapple cake with fresh cream" }
    ]
  },
  {
    category: "pure_veg",
    items: [
      { name: "Paneer Butter Masala", price: 18, rating: 5, description: "Classic Indian curry with paneer" },
      { name: "Mix Veg Curry", price: 14, rating: 4, description: "Healthy mixed vegetable curry" },
      { name: "Dal Tadka Special", price: 12, rating: 4, description: "Authentic Indian lentil tadka" },
      { name: "Veg Kofta Curry", price: 16, rating: 5, description: "Soft veg koftas in rich gravy" }
    ]
  },
  {
    category: "pasta",
    items: [
      { name: "White Sauce Pasta", price: 13, rating: 5, description: "Creamy white sauce pasta" },
      { name: "Red Sauce Pasta", price: 12, rating: 4, description: "Tomato-rich tangy red sauce pasta" },
      { name: "Pesto Basil Pasta", price: 15, rating: 5, description: "Italian pesto with basil & olive oil" },
      { name: "Creamy Mushroom Pasta", price: 16, rating: 5, description: "Mushrooms cooked in creamy sauce" }
    ]
  },
  {
    category: "noodles",
    items: [
      { name: "Veg Hakka Noodles", price: 10, rating: 4, description: "Chinese-style stir-fried noodles" },
      { name: "Chicken Chow Mein", price: 12, rating: 5, description: "Stir-fried noodles with chicken" },
      { name: "Schezwan Spicy Noodles", price: 11, rating: 4, description: "Hot & spicy Indo-Chinese noodles" },
      { name: "Garlic Butter Noodles", price: 13, rating: 5, description: "Garlic flavored buttery noodles" }
    ]
  }
];

class ChatbotService {
  private isInitialized: boolean = false;

  // Add the initialize method that was missing
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      console.log('🍅 Initializing Tamato Restaurant Chatbot...');
      
      // Simulate any async initialization tasks
      await new Promise(resolve => setTimeout(resolve, 500));
      
      this.isInitialized = true;
      console.log('✅ Tamato Restaurant Chatbot initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize chatbot:', error);
      throw error;
    }
  }

  private findCategory(query: string): string | null {
    const lowerQuery = query.toLowerCase();
    
    const categoryKeywords: { [key: string]: string[] } = {
      salads: ['salad', 'green', 'fresh', 'healthy', 'veggie', 'lettuce'],
      rolls: ['roll', 'wrap', 'spring roll', 'shawarma', 'tikka'],
      desserts: ['dessert', 'sweet', 'cake', 'chocolate', 'cheesecake', 'pudding', 'mousse'],
      sandwiches: ['sandwich', 'bread', 'toast', 'club', 'grill'],
      cakes: ['cake', 'fudge', 'velvet', 'forest', 'pineapple'],
      pure_veg: ['pure veg', 'vegetarian', 'veg', 'paneer', 'curry', 'dal', 'kofta'],
      pasta: ['pasta', 'spaghetti', 'noodle', 'italian', 'white sauce', 'red sauce', 'pesto'],
      noodles: ['noodle', 'hakka', 'chow mein', 'schezwan', 'chinese', 'stir fry']
    };

    for (const [category, keywords] of Object.entries(categoryKeywords)) {
      if (keywords.some(keyword => lowerQuery.includes(keyword))) {
        return category;
      }
    }
    
    return null;
  }

  private getCategoryResponse(category: string): string {
    const categoryData = menuData.find(cat => cat.category === category);
    if (!categoryData) return "I'm not sure about that category. We have salads, rolls, desserts, sandwiches, and more!";
    
    const items = categoryData.items.map(item => 
      `• ${item.name} - $${item.price} ⭐${item.rating}/5\n  ${item.description}`
    ).join('\n\n');
    
    const categoryNames: { [key: string]: string } = {
      salads: "🥗 Salads",
      rolls: "🌯 Rolls", 
      desserts: "🍰 Desserts",
      sandwiches: "🥪 Sandwiches",
      cakes: "🎂 Cakes",
      pure_veg: "🌱 Pure Veg Dishes",
      pasta: "🍝 Pasta",
      noodles: "🍜 Noodles"
    };
    
    return `${categoryNames[category]}:\n\n${items}\n\nWhich one catches your eye? 👀`;
  }

  async query(question: string): Promise<string> {
    // Ensure service is initialized
    if (!this.isInitialized) {
      await this.initialize();
    }

    const lowerQuestion = question.toLowerCase().trim();

    // Greetings
    if (/(hello|hi|hey|greetings|good morning|good afternoon)/.test(lowerQuestion)) {
      return "Hello! 👋 Welcome to Tamato Restaurant! 🍅 I'm here to help you with our menu, delivery info, and recommendations. What would you like to know?";
    }

    // Thank you
    if (/(thanks|thank you|thankyou|ty)/.test(lowerQuestion)) {
      return "You're welcome! 😊 Happy to help! Is there anything else you'd like to know about our menu or services?";
    }

    // Menu inquiry
    if (/(menu|what.*you.*have|offer|serve|available)/.test(lowerQuestion)) {
      return `We have a delicious variety of dishes across 8 categories! 🍽️

🥗 **Salads** - Fresh and healthy options
🌯 **Rolls** - Perfect quick bites  
🍰 **Desserts** - Sweet treats to end your meal
🥪 **Sandwiches** - Hearty and satisfying
🎂 **Cakes** - Special occasion treats
🌱 **Pure Veg** - Vegetarian delights
🍝 **Pasta** - Italian favorites
🍜 **Noodles** - Asian-inspired dishes

Which category would you like to explore?`;
    }

    // Find specific category
    const category = this.findCategory(lowerQuestion);
    if (category) {
      return this.getCategoryResponse(category);
    }

    // Delivery questions
    if (/(delivery|deliver|time.*delivery|how long.*delivery)/.test(lowerQuestion)) {
      return `🚚 **Delivery Information:**\n• 30-minute delivery guarantee on first orders!\n• Regular delivery: 30-45 minutes\n• Free delivery on orders above $15\n• $3 delivery fee for orders below $15\n• Contactless delivery available`;
    }

    // Hours
    if (/(hour|open|close|time|when.*open)/.test(lowerQuestion)) {
      return `🕒 **Operating Hours:**\n• Open daily from 10:00 AM to 11:00 PM\n• Kitchen closes at 10:30 PM\n• Perfect for lunch, dinner, or late-night cravings!`;
    }

    // Contact
    if (/(contact|phone|number|email|call|reach)/.test(lowerQuestion)) {
      return `📞 **Contact Us:**\n• Phone: +1-555-TAMATO\n• Email: support@tamato.com\n• We're here to help with any questions!`;
    }

    // Payment
    if (/(payment|pay|card|cash|money|credit|debit)/.test(lowerQuestion)) {
      return `💳 **Payment Options:**\n• Credit/Debit cards\n• Digital wallets (Google Pay, Apple Pay)\n• Cash on delivery\n• Secure payment processing!`;
    }

    // Vegetarian
    if (/(vegetarian|veg|veggie|meatless|no meat)/.test(lowerQuestion)) {
      return `🌱 **Vegetarian Options:**\nWe have plenty of delicious vegetarian dishes! All our salads, veg rolls, Pure Veg curries, veg sandwiches, pastas, and many desserts are completely vegetarian. Looking for something specific?`;
    }

    // Recommendations
    if (/(recommend|suggest|popular|best|favorite|what.*good)/.test(lowerQuestion)) {
      return `⭐ **Customer Favorites:**\nBased on ratings, our most popular dishes are:\n\n• Greek Salad ⭐4.5/5 - $12\n• Paneer Tikka Roll ⭐5/5 - $11\n• Chocolate Lava Cake ⭐5/5 - $9\n• Grilled Cheese Sandwich ⭐5/5 - $8\n\nWhich one sounds good to you?`;
    }

    // Price range
    if (/(price|cost|expensive|cheap|affordable|how much)/.test(lowerQuestion)) {
      return `💰 **Price Range:**\nOur dishes range from $7 for desserts to $18 for main courses. Most popular items are between $10-$15. Great quality at reasonable prices!`;
    }

    // Order process
    if (/(order|buy|purchase|checkout|how.*order)/.test(lowerQuestion)) {
      return `📱 **How to Order:**\n1. Browse our menu and add items to your cart\n2. Proceed to checkout\n3. Choose delivery time\n4. Select payment method\n5. Confirm your order!\n\nWe'll send you real-time updates on your order status!`;
    }

    // Spicy food
    if (/(spicy|hot|spice|chili)/.test(lowerQuestion)) {
      return `🌶️ **Spicy Options:**\nIf you like spicy food, try our:\n• Schezwan Spicy Noodles\n• Chicken Shawarma Roll (medium spice)\n• Paneer Tikka Roll\n• You can also request extra spice in any dish!`;
    }

    // Healthy options
    if (/(healthy|diet|low calorie|light|fit)/.test(lowerQuestion)) {
      return `🥗 **Healthy Choices:**\nFor healthier options, we recommend:\n• All our fresh salads\n• Veggie Garden Salad (low-calorie dressing)\n• Grilled options instead of fried\n• Steamed vegetables\n• Fresh fruit desserts`;
    }

    // Ingredients
    if (/(ingredient|fresh|quality|source|organic)/.test(lowerQuestion)) {
      return `🌿 **Ingredient Quality:**\nWe use only the freshest ingredients! All meats are from certified suppliers, vegetables are locally sourced when possible, and we prepare everything daily. Quality you can taste!`;
    }

    // Goodbye
    if (/(bye|goodbye|see you|later|exit|quit)/.test(lowerQuestion)) {
      return "Thanks for visiting Tamato Restaurant! 🍅 Hope to serve you soon. Have a great day! 👋";
    }

    // Default response for unknown questions
    return `I'd love to help you with that! 🍅 At Tamato Restaurant, we specialize in delicious food with fast delivery. You can ask me about:\n\n• Our menu categories\n• Specific dishes\n• Delivery information\n• Prices\n• Vegetarian options\n• Recommendations\n• Operating hours\n\nWhat would you like to know?`;
  }

  // Optional: Method to check if service is ready
  isReady(): boolean {
    return this.isInitialized;
  }
}

export const chatbotService = new ChatbotService();