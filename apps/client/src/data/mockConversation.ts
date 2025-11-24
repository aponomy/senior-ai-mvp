// Mock conversation data for testing progressive summarization UI

import type { ConversationBeat, Message, ToolCall } from '../types/conversation';

/**
 * Generate mock tool calls for realistic testing
 */
const createToolCall = (
  name: string,
  category: 'search' | 'transaction' | 'scheduling' | 'generation' | 'analysis' | 'communication',
  status: 'success' | 'error' = 'success',
  duration: number = 0.5
): ToolCall => ({
  id: `tool-${Date.now()}-${Math.random()}`,
  name,
  category,
  status,
  duration,
  timestamp: new Date(),
  parameters: { example: 'param' },
  result: status === 'success' ? { data: 'Retrieved successfully' } : undefined,
  error: status === 'error' ? 'Service temporarily unavailable' : undefined,
});

/**
 * Mock conversation with 30+ messages covering various scenarios
 * This simulates a realistic conversation an elderly user might have
 */
export const mockMessages: Message[] = [
  // Very old messages (30 messages ago) - Should be in summary boxes
  {
    id: 'msg-1',
    role: 'assistant',
    content: 'Good morning! How can I help you today?',
    timestamp: new Date(Date.now() - 35 * 60 * 1000), // 35 minutes ago
  },
  {
    id: 'msg-2',
    role: 'user',
    content: 'I want to bake a cake for my granddaughter\'s birthday. Can you help me find a recipe?',
    timestamp: new Date(Date.now() - 34 * 60 * 1000),
  },
  {
    id: 'msg-3',
    role: 'assistant',
    content: 'Of course! I\'d love to help you find the perfect cake recipe. Let me search for some popular birthday cake recipes that are easy to follow.',
    timestamp: new Date(Date.now() - 33 * 60 * 1000),
    toolCalls: [createToolCall('Recipe Search', 'search', 'success', 1.2)],
  },
  {
    id: 'msg-4',
    role: 'assistant',
    content: 'I found three wonderful options:\n\n1. Classic Vanilla Birthday Cake - Simple and delicious, takes about 1 hour\n2. Chocolate Layer Cake - Rich and moist, great for chocolate lovers\n3. Strawberry Shortcake - Light and fruity, perfect for spring birthdays\n\nWhich one sounds good to you?',
    timestamp: new Date(Date.now() - 32 * 60 * 1000),
  },
  {
    id: 'msg-5',
    role: 'user',
    content: 'The vanilla one sounds nice. Can you give me the ingredients?',
    timestamp: new Date(Date.now() - 31 * 60 * 1000),
  },
  {
    id: 'msg-6',
    role: 'assistant',
    content: 'Here are the ingredients for Classic Vanilla Birthday Cake:\n\n**For the cake:**\n- 2½ cups all-purpose flour\n- 2½ teaspoons baking powder\n- ½ teaspoon salt\n- 1 cup butter, softened\n- 2 cups sugar\n- 4 large eggs\n- 2 teaspoons vanilla extract\n- 1¼ cups milk\n\n**For the frosting:**\n- 1 cup butter, softened\n- 4 cups powdered sugar\n- 2 teaspoons vanilla extract\n- 3-4 tablespoons milk\n\nWould you like the step-by-step instructions?',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 'msg-7',
    role: 'user',
    content: 'Yes please, and can you make the instructions simple? I haven\'t baked in a while.',
    timestamp: new Date(Date.now() - 29 * 60 * 1000),
  },
  {
    id: 'msg-8',
    role: 'assistant',
    content: 'Absolutely! Here are simple step-by-step instructions:\n\n**Preparation:**\n1. Preheat your oven to 350°F (175°C)\n2. Grease two 9-inch round cake pans\n\n**Making the batter:**\n1. Mix flour, baking powder, and salt in a bowl\n2. In another large bowl, beat butter and sugar until fluffy (about 3 minutes)\n3. Add eggs one at a time, beating after each\n4. Stir in vanilla extract\n5. Add flour mixture and milk alternately, mixing gently\n\n**Baking:**\n1. Pour batter evenly into both pans\n2. Bake for 25-30 minutes until golden\n3. Let cool completely (very important!)\n\n**Frosting:**\n1. Beat butter until creamy\n2. Gradually add powdered sugar\n3. Add vanilla and milk, beat until smooth\n4. Spread between layers and on top\n\nTake your time and enjoy the process!',
    timestamp: new Date(Date.now() - 28 * 60 * 1000),
  },

  // Older messages (20 minutes ago) - Should be in summary boxes
  {
    id: 'msg-9',
    role: 'user',
    content: 'Thank you! Now, what\'s the weather like today? I need to know if I should go shopping now or later.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
  },
  {
    id: 'msg-10',
    role: 'assistant',
    content: 'Let me check the weather for you.',
    timestamp: new Date(Date.now() - 19.5 * 60 * 1000),
    toolCalls: [createToolCall('Weather API', 'search', 'success', 0.8)],
  },
  {
    id: 'msg-11',
    role: 'assistant',
    content: 'The weather today is sunny with light clouds, temperature around 18°C (64°F). There\'s a gentle breeze from the west, and no rain expected until this evening. It\'s a perfect time to go shopping now - you\'ll have several hours of nice weather!',
    timestamp: new Date(Date.now() - 19 * 60 * 1000),
  },
  {
    id: 'msg-12',
    role: 'user',
    content: 'Wonderful! Should I bring a jacket?',
    timestamp: new Date(Date.now() - 18 * 60 * 1000),
  },
  {
    id: 'msg-13',
    role: 'assistant',
    content: 'Yes, I\'d recommend bringing a light jacket. While 18°C is pleasant, the breeze might make it feel a bit cooler, especially if you\'re out for a while. A light cardigan or windbreaker would be perfect!',
    timestamp: new Date(Date.now() - 17 * 60 * 1000),
  },

  // Near-recent messages (12 minutes ago) - Should be blurred boxes
  {
    id: 'msg-14',
    role: 'user',
    content: 'Can you remind me what stores I need to visit to get all the cake ingredients?',
    timestamp: new Date(Date.now() - 12 * 60 * 1000),
  },
  {
    id: 'msg-15',
    role: 'assistant',
    content: 'For the cake ingredients, you can get everything at your local supermarket. You\'ll need to visit these sections:\n\n1. Baking aisle - flour, baking powder, sugar, powdered sugar, vanilla extract\n2. Dairy section - butter, milk, eggs\n3. Spices/baking section - salt\n\nIf your supermarket has everything, you only need one stop! Would you like me to create a shopping list you can save?',
    timestamp: new Date(Date.now() - 11.5 * 60 * 1000),
  },
  {
    id: 'msg-16',
    role: 'user',
    content: 'No, that\'s okay. I can remember. What time does the grocery store close?',
    timestamp: new Date(Date.now() - 11 * 60 * 1000),
  },
  {
    id: 'msg-17',
    role: 'assistant',
    content: 'Let me check the hours for your nearby grocery store.',
    timestamp: new Date(Date.now() - 10.5 * 60 * 1000),
    toolCalls: [createToolCall('Store Hours Lookup', 'search', 'success', 0.6)],
  },
  {
    id: 'msg-18',
    role: 'assistant',
    content: 'Your local ICA supermarket is open until 9:00 PM today. You have plenty of time to shop! They\'re located on Storgatan 45, about a 10-minute walk from your location.',
    timestamp: new Date(Date.now() - 10 * 60 * 1000),
  },

  // More near-recent messages (8 minutes ago) - Should be blurred boxes
  {
    id: 'msg-19',
    role: 'user',
    content: 'Perfect. By the way, can you help me remember - when is my doctor\'s appointment again?',
    timestamp: new Date(Date.now() - 8 * 60 * 1000),
  },
  {
    id: 'msg-20',
    role: 'assistant',
    content: 'Let me check your calendar.',
    timestamp: new Date(Date.now() - 7.5 * 60 * 1000),
    toolCalls: [createToolCall('Calendar Check', 'scheduling', 'success', 0.4)],
  },
  {
    id: 'msg-21',
    role: 'assistant',
    content: 'Your doctor\'s appointment is scheduled for next Tuesday, November 26th at 2:30 PM with Dr. Andersson at Vårdcentralen. It\'s a regular checkup. Would you like me to set a reminder for the day before?',
    timestamp: new Date(Date.now() - 7 * 60 * 1000),
  },
  {
    id: 'msg-22',
    role: 'user',
    content: 'Yes, that would be helpful. Set a reminder for Monday afternoon.',
    timestamp: new Date(Date.now() - 6.5 * 60 * 1000),
  },
  {
    id: 'msg-23',
    role: 'assistant',
    content: 'Creating a reminder for you...',
    timestamp: new Date(Date.now() - 6 * 60 * 1000),
    toolCalls: [createToolCall('Set Reminder', 'scheduling', 'success', 0.3)],
  },
  {
    id: 'msg-24',
    role: 'assistant',
    content: 'Done! I\'ve set a reminder for Monday, November 25th at 3:00 PM to remind you about your doctor\'s appointment the next day. You\'ll get a notification on your device.',
    timestamp: new Date(Date.now() - 5.5 * 60 * 1000),
  },

  // Recent messages (last 5 - should be shown in full detail)
  {
    id: 'msg-25',
    role: 'user',
    content: 'Great! One more thing - can you suggest some birthday decorations for a 7-year-old?',
    timestamp: new Date(Date.now() - 4 * 60 * 1000),
  },
  {
    id: 'msg-26',
    role: 'assistant',
    content: 'Of course! Here are some fun decoration ideas for a 7-year-old\'s birthday party:\n\n**Classic decorations:**\n- Colorful balloons (mix of regular and metallic)\n- Birthday banner with "Happy Birthday"\n- Streamers in their favorite colors\n- Tablecloth and plates with a fun theme\n\n**Popular themes for 7-year-olds:**\n- Unicorns and rainbows\n- Superheroes\n- Dinosaurs\n- Princess/fairy theme\n- Space and rockets\n\n**Easy DIY touches:**\n- Paper lanterns\n- Confetti on tables\n- Photo display of the birthday child\n- Hand-made birthday crown\n\nDoes your granddaughter have a favorite theme or color?',
    timestamp: new Date(Date.now() - 3.5 * 60 * 1000),
  },
  {
    id: 'msg-27',
    role: 'user',
    content: 'She loves unicorns! Where can I buy unicorn decorations?',
    timestamp: new Date(Date.now() - 2.5 * 60 * 1000),
  },
  {
    id: 'msg-28',
    role: 'assistant',
    content: 'Perfect choice! For unicorn decorations, you can find them at:\n\n**Physical stores:**\n- Panduro (craft store) - Great selection of party supplies\n- Gekås/Rusta - Budget-friendly options\n- Normal - Good variety of birthday decorations\n- Lekia (toy store) - Often has themed party supplies\n\n**Online options:**\n- Partykungen.se - Largest party supply selection\n- Amazon.se - Quick delivery options\n\nSince you\'re going shopping today, I recommend stopping by Panduro or Normal - they\'re usually in the same shopping areas as supermarkets. Would you like me to find the nearest location?',
    timestamp: new Date(Date.now() - 2 * 60 * 1000),
  },
  {
    id: 'msg-29',
    role: 'user',
    content: 'No thank you, I know where they are. You\'ve been very helpful!',
    timestamp: new Date(Date.now() - 1 * 60 * 1000),
  },
  {
    id: 'msg-30',
    role: 'assistant',
    content: 'You\'re very welcome! I hope the birthday party is wonderful and the cake turns out delicious! If you need any help while baking or have questions about anything else, just let me know. Have a great time shopping! 🎂🦄',
    timestamp: new Date(Date.now() - 30 * 1000), // 30 seconds ago
  },
  
  // META CONVERSATION EXAMPLE - User asks about navigating the interface
  {
    id: 'msg-31',
    role: 'user',
    content: 'Wait, how do I see our previous conversations? I want to go back to the cake recipe.',
    timestamp: new Date(Date.now() - 25 * 1000),
    isMeta: true // This is a meta conversation about the interface
  },
  {
    id: 'msg-32',
    role: 'assistant',
    content: 'Great question! You can see all your previous conversations in the left column. Each conversation is shown as a card with a summary. Just click on the "🍰 Baking Tips" card to see all the key points from that conversation, including the cake recipe.',
    timestamp: new Date(Date.now() - 23 * 1000),
    isMeta: true
  },
  {
    id: 'msg-33',
    role: 'user',
    content: 'Oh, I see it now! So if I click on it, what happens?',
    timestamp: new Date(Date.now() - 20 * 1000),
    isMeta: true
  },
  {
    id: 'msg-34',
    role: 'assistant',
    content: 'When you click on any conversation card, the middle column will show the key points from that conversation. Then you can click on specific key points like "Vanilla cake ingredients list" to jump directly to those messages in this conversation area. It\'s like bookmarks for different parts of our chat!',
    timestamp: new Date(Date.now() - 18 * 1000),
    isMeta: true
  },
  {
    id: 'msg-35',
    role: 'user',
    content: 'That\'s very clever! Thank you for explaining.',
    timestamp: new Date(Date.now() - 15 * 1000),
    isMeta: true
  },
  
  // RETURN TO REGULAR CONVERSATION
  {
    id: 'msg-36',
    role: 'user',
    content: 'Now, about the party - should I make cupcakes instead of a cake? Would that be easier?',
    timestamp: new Date(Date.now() - 10 * 1000),
    isMeta: false // Back to regular conversation
  },
  {
    id: 'msg-37',
    role: 'assistant',
    content: 'Cupcakes could be a great alternative! They\'re actually easier in some ways:\n\n**Advantages:**\n- No need to frost between layers\n- Easier to decorate individually\n- Perfect portion control\n- Bake faster (15-18 minutes vs 25-30)\n- Kids love having their own cupcake\n\n**For unicorn theme:**\nYou could do rainbow swirl frosting and add edible glitter or small unicorn toppers!\n\nWould you like me to adjust the recipe for cupcakes? The batter is the same, just the baking time changes.',
    timestamp: new Date(Date.now() - 8 * 1000),
    isMeta: false
  },
  
  // FUNCTION EXECUTION - Bank Transaction
  {
    id: 'msg-38',
    role: 'user',
    content: 'Before I forget - I need to pay my electricity bill. It\'s 847 kronor to Vattenfall.',
    timestamp: new Date(Date.now() - 6 * 1000),
    isFunction: true,
    functionType: 'bank'
  },
  {
    id: 'msg-39',
    role: 'assistant',
    content: 'I can help you with that payment. Let me verify the details:\n\n**Payment Details:**\n- Recipient: Vattenfall\n- Amount: 847 SEK\n- Type: Electricity bill\n\nWould you like me to proceed with this payment from your checking account?',
    timestamp: new Date(Date.now() - 5 * 1000),
    isFunction: true,
    functionType: 'bank',
    toolCalls: [createToolCall('Verify Payment', 'transaction', 'success', 0.8)]
  },
  {
    id: 'msg-40',
    role: 'user',
    content: 'Yes please, from my regular account.',
    timestamp: new Date(Date.now() - 4 * 1000),
    isFunction: true,
    functionType: 'bank'
  },
  {
    id: 'msg-41',
    role: 'assistant',
    content: 'Processing your payment now...',
    timestamp: new Date(Date.now() - 3.5 * 1000),
    isFunction: true,
    functionType: 'bank',
    toolCalls: [createToolCall('Bank Transfer', 'transaction', 'success', 2.1)]
  },
  {
    id: 'msg-42',
    role: 'assistant',
    content: '✓ Payment completed successfully!\n\n**Receipt:**\n- From: Checking Account (****1234)\n- To: Vattenfall\n- Amount: 847 SEK\n- Transaction ID: TX-2025-1121-847\n- Date: November 21, 2025\n- New Balance: 12,453 SEK\n\nThe payment will be processed within 1 business day. You\'ll receive a confirmation email shortly.',
    timestamp: new Date(Date.now() - 3 * 1000),
    isFunction: true,
    functionType: 'bank'
  },
  
  // RETURN TO REGULAR CONVERSATION
  {
    id: 'msg-43',
    role: 'user',
    content: 'Perfect! Now back to the cupcakes - yes, please show me how to adjust the recipe.',
    timestamp: new Date(Date.now() - 2 * 1000),
    isFunction: false
  },
  {
    id: 'msg-44',
    role: 'assistant',
    content: 'Great! Here\'s how to make cupcakes instead:\n\n**Adjusted Recipe:**\n- Use the same batter recipe as before\n- Fill cupcake liners 2/3 full\n- Bake at 350°F (175°C) for 15-18 minutes\n- Makes about 24 cupcakes\n- Cool completely before frosting\n\n**Rainbow Frosting Technique:**\n1. Divide frosting into 3 bowls\n2. Add food coloring (pink, purple, blue)\n3. Put dollops of each color in piping bag\n4. Pipe swirls for rainbow effect\n\nThe kids will love them! 🧁🌈',
    timestamp: new Date(Date.now() - 1 * 1000),
    isFunction: false
  },
];

/**
 * Mock conversation beats - logical groupings of the messages above
 */
export const mockBeats: ConversationBeat[] = [
  {
    id: 'beat-1',
    messages: mockMessages.slice(0, 8), // Recipe discussion
    summary: 'Birthday cake recipe discussion - selected vanilla cake with ingredients and simple instructions',
    condensedText: 'You asked for a birthday cake recipe. I suggested three options, you chose vanilla, and I provided ingredients and step-by-step baking instructions.',
    startTime: mockMessages[0].timestamp,
    endTime: mockMessages[7].timestamp,
    messageCount: 8,
    topicKeywords: ['recipe', 'cake', 'baking', 'birthday', 'vanilla'],
  },
  {
    id: 'beat-2',
    messages: mockMessages.slice(8, 13), // Weather check
    summary: 'Weather inquiry - checked current conditions for shopping trip',
    condensedText: 'You asked about today\'s weather for shopping. I checked: sunny, 18°C, light breeze. Recommended bringing a light jacket.',
    startTime: mockMessages[8].timestamp,
    endTime: mockMessages[12].timestamp,
    messageCount: 5,
    topicKeywords: ['weather', 'shopping', 'jacket', 'temperature'],
  },
  {
    id: 'beat-3',
    messages: mockMessages.slice(13, 18), // Shopping logistics
    summary: 'Shopping planning - store sections and closing hours',
    condensedText: 'You asked about shopping for cake ingredients. I listed supermarket sections and checked ICA hours: open until 9 PM.',
    startTime: mockMessages[13].timestamp,
    endTime: mockMessages[17].timestamp,
    messageCount: 5,
    topicKeywords: ['shopping', 'store', 'hours', 'ICA', 'ingredients'],
  },
  {
    id: 'beat-4',
    messages: mockMessages.slice(18, 24), // Calendar and reminder
    summary: 'Doctor appointment reminder - confirmed date and set notification',
    condensedText: 'You asked about your doctor appointment: next Tuesday, Nov 26 at 2:30 PM. Set a reminder for Monday afternoon.',
    startTime: mockMessages[18].timestamp,
    endTime: mockMessages[23].timestamp,
    messageCount: 6,
    topicKeywords: ['appointment', 'doctor', 'calendar', 'reminder'],
  },
  // Last beat (messages 24-29) - recent, won't be in a beat summary yet
];

/**
 * Helper function to get messages by display level
 */
export function getMessagesByLevel(
  messages: Message[],
  recentCount: number = 5,
  nearRecentCount: number = 10
): {
  recent: Message[];
  nearRecent: Message[];
  older: Message[];
} {
  const totalMessages = messages.length;
  
  return {
    recent: messages.slice(Math.max(0, totalMessages - recentCount)),
    nearRecent: messages.slice(
      Math.max(0, totalMessages - recentCount - nearRecentCount),
      Math.max(0, totalMessages - recentCount)
    ),
    older: messages.slice(0, Math.max(0, totalMessages - recentCount - nearRecentCount)),
  };
}

/**
 * Helper function to get beats by age
 */
export function getBeatsByAge(
  beats: ConversationBeat[],
  olderThanMinutes: number
): {
  shouldSummarize: ConversationBeat[];
  shouldBlur: ConversationBeat[];
} {
  const now = Date.now();
  const olderThreshold = now - olderThanMinutes * 60 * 1000;
  const blurThreshold = now - (olderThanMinutes / 2) * 60 * 1000;
  
  return {
    shouldSummarize: beats.filter(beat => beat.endTime.getTime() < olderThreshold),
    shouldBlur: beats.filter(
      beat => 
        beat.endTime.getTime() >= olderThreshold && 
        beat.endTime.getTime() < blurThreshold
    ),
  };
}

/**
 * CONVERSATION ATLAS MOCK DATA
 * 
 * Mock data for testing the Conversation Atlas multi-resolution interface
 */

import type { Summary } from '../types/conversation';

/**
 * Mock summaries for testing the Conversation Atlas layout
 * Simulates a conversation history with multiple topics
 */
export const mockSummaries: Summary[] = [
  // Summary 1: Baking conversation (oldest)
  {
    id: 1,
    title: 'Baking Tips',
    icon: '🍰',
    relativeTime: '35 minutes ago',
    bulletPoints: [
      'Found vanilla birthday cake recipe',
      'Listed ingredients and equipment',
      'Provided simple step-by-step instructions'
    ],
    keyPoints: [
      {
        id: 1,
        text: 'Recipe search for granddaughter\'s cake',
        messageIds: ['msg-2', 'msg-3', 'msg-4']
      },
      {
        id: 2,
        text: 'Vanilla cake ingredients list',
        messageIds: ['msg-5', 'msg-6']
      },
      {
        id: 3,
        text: 'Simple baking instructions',
        messageIds: ['msg-7', 'msg-8']
      }
    ],
    messageIds: ['msg-1', 'msg-2', 'msg-3', 'msg-4', 'msg-5', 'msg-6', 'msg-7', 'msg-8'],
    timestamp: new Date(Date.now() - 35 * 60 * 1000)
  },
  
  // Summary 2: Weather and shopping
  {
    id: 2,
    title: 'Shopping Plans',
    icon: '🛒',
    relativeTime: '20 minutes ago',
    bulletPoints: [
      'Checked today\'s weather - sunny and mild',
      'Discussed shopping timing',
      'Listed supermarket sections for ingredients'
    ],
    keyPoints: [
      {
        id: 4,
        text: 'Weather check for shopping',
        messageIds: ['msg-9', 'msg-10', 'msg-11']
      },
      {
        id: 5,
        text: 'Store sections and hours',
        messageIds: ['msg-12', 'msg-13', 'msg-14']
      }
    ],
    messageIds: ['msg-9', 'msg-10', 'msg-11', 'msg-12', 'msg-13', 'msg-14', 'msg-15', 'msg-16', 'msg-17'],
    timestamp: new Date(Date.now() - 20 * 60 * 1000)
  },
  
  // Summary 3: Doctor appointment (building - current)
  {
    id: 3,
    title: 'Appointments',
    icon: '📅',
    relativeTime: 'Just now',
    bulletPoints: [], // Empty because it's building
    keyPoints: [
      {
        id: 6,
        text: 'Doctor appointment details',
        messageIds: ['msg-18', 'msg-19', 'msg-20']
      },
      {
        id: 7,
        text: 'Set reminder notification',
        messageIds: ['msg-21', 'msg-22', 'msg-23']
      }
    ],
    messageIds: ['msg-18', 'msg-19', 'msg-20', 'msg-21', 'msg-22', 'msg-23'],
    isBuilding: true, // This is the current conversation
    timestamp: new Date()
  },
  
  // META SUMMARY: Navigation help (appears below separator)
  {
    id: 4,
    title: 'Using the Interface',
    icon: '🧭',
    relativeTime: '15 seconds ago',
    bulletPoints: [
      'Explained how to navigate previous conversations',
      'Showed how to click cards to see key points',
      'Described how to jump to specific topics'
    ],
    keyPoints: [
      {
        id: 8,
        text: 'How to view previous conversations',
        messageIds: ['msg-31', 'msg-32']
      },
      {
        id: 9,
        text: 'Understanding key points navigation',
        messageIds: ['msg-33', 'msg-34', 'msg-35']
      }
    ],
    messageIds: ['msg-31', 'msg-32', 'msg-33', 'msg-34', 'msg-35'],
    isMeta: true, // This is a meta conversation about the interface
    timestamp: new Date(Date.now() - 15 * 1000)
  },
  
  // FUNCTION SUMMARY: Bank payment (appears in Functions section)
  {
    id: 5,
    title: 'Bank Payment',
    icon: '💳',
    relativeTime: '3 seconds ago',
    bulletPoints: [
      'Paid electricity bill to Vattenfall',
      'Amount: 847 SEK',
      'Completed successfully from checking account'
    ],
    keyPoints: [
      {
        id: 10,
        text: 'Payment verification and details',
        messageIds: ['msg-38', 'msg-39', 'msg-40']
      },
      {
        id: 11,
        text: 'Transaction processing and receipt',
        messageIds: ['msg-41', 'msg-42']
      }
    ],
    messageIds: ['msg-38', 'msg-39', 'msg-40', 'msg-41', 'msg-42'],
    isFunction: true, // This is a function execution
    functionType: 'bank',
    timestamp: new Date(Date.now() - 3 * 1000)
  }
];

/**
 * Helper function to get messages for a specific key point
 */
export function getMessagesForKeyPoint(keyPointId: number): string[] {
  for (const summary of mockSummaries) {
    const keyPoint = summary.keyPoints.find(kp => kp.id === keyPointId);
    if (keyPoint) {
      return keyPoint.messageIds;
    }
  }
  return [];
}

/**
 * Helper function to get messages for a specific summary
 */
export function getMessagesForSummary(summaryId: number): string[] {
  const summary = mockSummaries.find(s => s.id === summaryId);
  return summary ? summary.messageIds : [];
}

