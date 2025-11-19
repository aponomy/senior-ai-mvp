import { differenceInDays, startOfDay, subDays } from 'date-fns';

export interface Conversation {
  id: string;
  title: string;
  date: Date;
  messages: number;
  preview: string;
}

// Mock data generator
export const generateMockConversations = (): Conversation[] => {
  const conversations: Conversation[] = [];
  const titles = [
    'Project Planning Discussion',
    'Code Review Session',
    'Architecture Design',
    'Bug Fix Strategy',
    'Feature Implementation',
    'Performance Optimization',
    'Database Schema Design',
    'API Endpoint Planning',
    'UI/UX Improvements',
    'Testing Strategy',
  ];
  
  const previews = [
    'Discussed the main objectives and timeline...',
    'Reviewed the pull request and suggested improvements...',
    'Designed the system architecture for the new feature...',
    'Identified the root cause and planned fixes...',
    'Implemented the new functionality with tests...',
  ];

  // Generate conversations for the last 90 days
  for (let i = 0; i < 150; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = subDays(new Date(), daysAgo);
    
    conversations.push({
      id: `conv-${i}`,
      title: titles[Math.floor(Math.random() * titles.length)],
      date,
      messages: Math.floor(Math.random() * 50) + 5,
      preview: previews[Math.floor(Math.random() * previews.length)],
    });
  }

  return conversations.sort((a, b) => b.date.getTime() - a.date.getTime());
};

export interface ConversationBucket {
  key: string;
  conversations: Conversation[];
  date: Date;
  startDay: number;
}

// Group conversations by time buckets based on zoom level
export const getTimeBuckets = (
  conversations: Conversation[],
  zoom: number,
  searchQuery?: string
): ConversationBucket[] => {
  const filteredConversations = searchQuery?.trim()
    ? conversations.filter(conv =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.preview.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  if (filteredConversations.length === 0) {
    return [];
  }

  const oldestDate = startOfDay(filteredConversations[filteredConversations.length - 1].date);
  const bucketSize = Math.max(1, Math.floor(30 / zoom)); // days per bucket
  const buckets = new Map<string, Conversation[]>();

  filteredConversations.forEach(conv => {
    const daysSinceOldest = differenceInDays(startOfDay(conv.date), oldestDate);
    const bucketIndex = Math.floor(daysSinceOldest / bucketSize);
    const bucketKey = `bucket-${bucketIndex}`;
    
    if (!buckets.has(bucketKey)) {
      buckets.set(bucketKey, []);
    }
    buckets.get(bucketKey)!.push(conv);
  });

  return Array.from(buckets.entries()).map(([key, convs]) => ({
    key,
    conversations: convs,
    date: convs[0].date,
    startDay: Math.floor(differenceInDays(startOfDay(convs[0].date), oldestDate) / bucketSize) * bucketSize,
  }));
};

// Filter buckets based on selected date
export const getVisibleBuckets = (
  buckets: ConversationBucket[],
  selectedDate: Date,
  zoom: number,
  conversations: Conversation[]
): ConversationBucket[] => {
  if (conversations.length === 0) {
    return [];
  }

  const oldestDate = startOfDay(conversations[conversations.length - 1].date);
  const selectedDay = differenceInDays(startOfDay(selectedDate), oldestDate);
  const visibleRange = Math.floor(30 / zoom);
  
  return buckets.filter(bucket => {
    const bucketDay = differenceInDays(startOfDay(bucket.date), oldestDate);
    return Math.abs(bucketDay - selectedDay) <= visibleRange;
  }).sort((a, b) => b.date.getTime() - a.date.getTime());
};
