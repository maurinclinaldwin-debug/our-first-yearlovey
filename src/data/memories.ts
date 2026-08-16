import { MemoryItem } from '../types';
import { getDriveDirectUrl, getDriveThumbnailUrl } from '../utils/drive';

export const INITIAL_MEMORIES: MemoryItem[] = [
  // 1. Initial 10 Blitz Montage Photos (8 seconds)
  {
    id: 'montage-1',
    category: 'montage',
    title: 'First Glimpse',
    subtitle: 'Where everything began',
    driveId: '10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_',
    driveUrl: getDriveDirectUrl('10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_'),
    fallbackUrl: getDriveThumbnailUrl('10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_', 1200),
    tag: 'Chapter 01'
  },
  {
    id: 'montage-2',
    category: 'montage',
    title: 'Warm Sunlight',
    subtitle: 'Walking together under the trees',
    driveId: '1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB',
    driveUrl: getDriveDirectUrl('1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB'),
    fallbackUrl: getDriveThumbnailUrl('1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB', 1200),
    tag: 'Warmth'
  },
  {
    id: 'montage-3',
    category: 'montage',
    title: 'Secret Smiles',
    subtitle: 'Stolen glances across the room',
    driveId: '1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz',
    driveUrl: getDriveDirectUrl('1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz'),
    fallbackUrl: getDriveThumbnailUrl('1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz', 1200),
    tag: 'Moments'
  },
  {
    id: 'montage-4',
    category: 'montage',
    title: 'Golden Hour Steps',
    subtitle: 'Talking until the sun goes down',
    driveId: '16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ',
    driveUrl: getDriveDirectUrl('16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ'),
    fallbackUrl: getDriveThumbnailUrl('16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ', 1200),
    tag: 'Golden Hour'
  },
  {
    id: 'montage-5',
    category: 'montage',
    title: 'Shared Laughter',
    subtitle: 'Endless jokes and sweet teasing',
    driveId: '17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK',
    driveUrl: getDriveDirectUrl('17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK'),
    fallbackUrl: getDriveThumbnailUrl('17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK', 1200),
    tag: 'Joy'
  },
  {
    id: 'montage-6',
    category: 'montage',
    title: 'Holding Hands',
    subtitle: 'Quiet comfort in the evening breeze',
    driveId: '1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8',
    driveUrl: getDriveDirectUrl('1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8'),
    fallbackUrl: getDriveThumbnailUrl('1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8', 1200),
    tag: 'Together'
  },
  {
    id: 'montage-7',
    category: 'montage',
    title: 'Mountain Skyline',
    subtitle: 'Looking at city lights together',
    driveId: '1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63',
    driveUrl: getDriveDirectUrl('1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63'),
    fallbackUrl: getDriveThumbnailUrl('1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63', 1200),
    tag: 'Adventure'
  },
  {
    id: 'montage-8',
    category: 'montage',
    title: 'Guitar Chords',
    subtitle: 'Singing softly side by side',
    driveId: '1htHOS8VrZesd5pfALYWW2sZmj4qpG766',
    driveUrl: getDriveDirectUrl('1htHOS8VrZesd5pfALYWW2sZmj4qpG766'),
    fallbackUrl: getDriveThumbnailUrl('1htHOS8VrZesd5pfALYWW2sZmj4qpG766', 1200),
    tag: 'Melody'
  },
  {
    id: 'montage-9',
    category: 'montage',
    title: 'Rain & Shelter',
    subtitle: 'Facing the sudden storms together',
    driveId: '1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S',
    driveUrl: getDriveDirectUrl('1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S'),
    fallbackUrl: getDriveThumbnailUrl('1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S', 1200),
    tag: 'Resilience'
  },
  {
    id: 'montage-10',
    category: 'montage',
    title: 'One Year of Love',
    subtitle: 'August 22 • Our continuous journey',
    driveId: '17CmnfpTyf37daQGpTJx5egsOWNBoxuYs',
    driveUrl: getDriveDirectUrl('17CmnfpTyf37daQGpTJx5egsOWNBoxuYs'),
    fallbackUrl: getDriveThumbnailUrl('17CmnfpTyf37daQGpTJx5egsOWNBoxuYs', 1200),
    tag: '365 Days'
  },

  // 2. School Group Photos (Silent Admiration)
  {
    id: 'school-1',
    category: 'school',
    title: 'School Group Gathering',
    subtitle: 'Amidst the crowd & campus halls',
    date: 'School Days',
    driveId: '1ss4_U5-wb3q5mwJDBDJ_gTox1-n9FKso',
    driveUrl: getDriveDirectUrl('1ss4_U5-wb3q5mwJDBDJ_gTox1-n9FKso'),
    fallbackUrl: getDriveThumbnailUrl('1ss4_U5-wb3q5mwJDBDJ_gTox1-n9FKso', 1200),
    caption: 'Silently living in our own worlds...',
    orientation: 'landscape'
  },
  {
    id: 'school-2',
    category: 'school',
    title: 'Classroom & Campus Hallways',
    subtitle: 'A silent admiration, nothing fancy',
    date: 'School Days',
    driveId: '1MzCPgBPsaEv0WdqwgYjTjeIoLLN9T2-3',
    driveUrl: getDriveDirectUrl('1MzCPgBPsaEv0WdqwgYjTjeIoLLN9T2-3'),
    fallbackUrl: getDriveThumbnailUrl('1MzCPgBPsaEv0WdqwgYjTjeIoLLN9T2-3', 1200),
    caption: 'Knowing that there was no chance of confession...',
    orientation: 'landscape'
  },

  // 3. Shuffle Photos (15 images fast reel after glitch - Drive CDN powered)
  {
    id: 'shuffle-1',
    category: 'shuffle',
    title: 'Spark of Wonder #1',
    driveId: '10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_',
    driveUrl: getDriveDirectUrl('10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_'),
    fallbackUrl: getDriveThumbnailUrl('10Vv9RMxrD42ZHfnfC5xvw7o-34IXNcb_', 1200),
    tag: 'Memory 1'
  },
  {
    id: 'shuffle-2',
    category: 'shuffle',
    title: 'Spark of Wonder #2',
    driveId: '1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB',
    driveUrl: getDriveDirectUrl('1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB'),
    fallbackUrl: getDriveThumbnailUrl('1smj64ajtPckAIyyWY5oqHY8RkzgKl7pB', 1200),
    tag: 'Memory 2'
  },
  {
    id: 'shuffle-3',
    category: 'shuffle',
    title: 'Spark of Wonder #3',
    driveId: '1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz',
    driveUrl: getDriveDirectUrl('1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz'),
    fallbackUrl: getDriveThumbnailUrl('1e9tm3i8Ay1Mtog8BQ9F4gucB08rFCGzz', 1200),
    tag: 'Memory 3'
  },
  {
    id: 'shuffle-4',
    category: 'shuffle',
    title: 'Spark of Wonder #4',
    driveId: '16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ',
    driveUrl: getDriveDirectUrl('16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ'),
    fallbackUrl: getDriveThumbnailUrl('16Y45AClQV-QPJFJopdeHItKZjuIiWhyQ', 1200),
    tag: 'Memory 4'
  },
  {
    id: 'shuffle-5',
    category: 'shuffle',
    title: 'Spark of Wonder #5',
    driveId: '17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK',
    driveUrl: getDriveDirectUrl('17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK'),
    fallbackUrl: getDriveThumbnailUrl('17CgSJN7s8VPcxH0SDpsgV_TNCSJRG0FK', 1200),
    tag: 'Memory 5'
  },
  {
    id: 'shuffle-6',
    category: 'shuffle',
    title: 'Spark of Wonder #6',
    driveId: '1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8',
    driveUrl: getDriveDirectUrl('1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8'),
    fallbackUrl: getDriveThumbnailUrl('1jehmZJD-ZLvCNuFxf1L1hV6yf-7PbeA8', 1200),
    tag: 'Memory 6'
  },
  {
    id: 'shuffle-7',
    category: 'shuffle',
    title: 'Spark of Wonder #7',
    driveId: '1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63',
    driveUrl: getDriveDirectUrl('1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63'),
    fallbackUrl: getDriveThumbnailUrl('1UKJWBGXqk9GJbTZQA4WkhzOvU7HbRL63', 1200),
    tag: 'Memory 7'
  },
  {
    id: 'shuffle-8',
    category: 'shuffle',
    title: 'Spark of Wonder #8',
    driveId: '1htHOS8VrZesd5pfALYWW2sZmj4qpG766',
    driveUrl: getDriveDirectUrl('1htHOS8VrZesd5pfALYWW2sZmj4qpG766'),
    fallbackUrl: getDriveThumbnailUrl('1htHOS8VrZesd5pfALYWW2sZmj4qpG766', 1200),
    tag: 'Memory 8'
  },
  {
    id: 'shuffle-9',
    category: 'shuffle',
    title: 'Spark of Wonder #9',
    driveId: '1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S',
    driveUrl: getDriveDirectUrl('1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S'),
    fallbackUrl: getDriveThumbnailUrl('1vKLad_BoPdOCs7buS7KFnOyrCD3NCg1S', 1200),
    tag: 'Memory 9'
  },
  {
    id: 'shuffle-10',
    category: 'shuffle',
    title: 'Spark of Wonder #10',
    driveId: '17CmnfpTyf37daQGpTJx5egsOWNBoxuYs',
    driveUrl: getDriveDirectUrl('17CmnfpTyf37daQGpTJx5egsOWNBoxuYs'),
    fallbackUrl: getDriveThumbnailUrl('17CmnfpTyf37daQGpTJx5egsOWNBoxuYs', 1200),
    tag: 'Memory 10'
  },
  {
    id: 'shuffle-11',
    category: 'shuffle',
    title: 'Spark of Wonder #11',
    driveId: '1c5sn5iBVzjbhWs8ezFnIgmpKMqwvlnP-',
    driveUrl: getDriveDirectUrl('1c5sn5iBVzjbhWs8ezFnIgmpKMqwvlnP-'),
    fallbackUrl: getDriveThumbnailUrl('1c5sn5iBVzjbhWs8ezFnIgmpKMqwvlnP-', 1200),
    tag: 'Memory 11'
  },
  {
    id: 'shuffle-12',
    category: 'shuffle',
    title: 'Spark of Wonder #12',
    driveId: '1Un96cJdXuQTAsDCnIm2iTeh1weT6NY_9',
    driveUrl: getDriveDirectUrl('1Un96cJdXuQTAsDCnIm2iTeh1weT6NY_9'),
    fallbackUrl: getDriveThumbnailUrl('1Un96cJdXuQTAsDCnIm2iTeh1weT6NY_9', 1200),
    tag: 'Memory 12'
  },
  {
    id: 'shuffle-13',
    category: 'shuffle',
    title: 'Spark of Wonder #13',
    driveId: '16t3xM8OfSFD9zx4wsO4ywz8ZFzXaw8AE',
    driveUrl: getDriveDirectUrl('16t3xM8OfSFD9zx4wsO4ywz8ZFzXaw8AE'),
    fallbackUrl: getDriveThumbnailUrl('16t3xM8OfSFD9zx4wsO4ywz8ZFzXaw8AE', 1200),
    tag: 'Memory 13'
  },
  {
    id: 'shuffle-14',
    category: 'shuffle',
    title: 'Spark of Wonder #14',
    driveId: '1yaUt1N-Y4YStGga10tjQTFOLFvXp6TND',
    driveUrl: getDriveDirectUrl('1yaUt1N-Y4YStGga10tjQTFOLFvXp6TND'),
    fallbackUrl: getDriveThumbnailUrl('1yaUt1N-Y4YStGga10tjQTFOLFvXp6TND', 1200),
    tag: 'Memory 14'
  },
  {
    id: 'shuffle-15',
    category: 'shuffle',
    title: 'Spark of Wonder #15',
    driveId: '1eSZssJ3-Jt4u8ziZv6nZOh_DxXC3HMzs',
    driveUrl: getDriveDirectUrl('1eSZssJ3-Jt4u8ziZv6nZOh_DxXC3HMzs'),
    fallbackUrl: getDriveThumbnailUrl('1eSZssJ3-Jt4u8ziZv6nZOh_DxXC3HMzs', 1200),
    tag: 'Memory 15'
  },

  // 4. Chat Messages & Starting the Journey (Sep 21-22 2025, Lakbay ng Sanaysay, Jamaica / Maica / Lovey)
  {
    id: 'chat-start-1',
    category: 'chat',
    title: 'First Hello',
    subtitle: 'Dito pala nag simula ang conversation',
    date: 'September 2025',
    driveId: '10Hh_4jZl6WhtBs0Z4Nq8rlbesIFJdElX',
    driveUrl: getDriveDirectUrl('10Hh_4jZl6WhtBs0Z4Nq8rlbesIFJdElX'),
    fallbackUrl: getDriveThumbnailUrl('10Hh_4jZl6WhtBs0Z4Nq8rlbesIFJdElX', 1200),
    caption: '"Uy, kamusta?..." The message that started everything.'
  },
  {
    id: 'chat-start-2',
    category: 'chat',
    title: 'Late Night Talks',
    subtitle: 'Typing non-stop with goofy smiles',
    date: 'September 2025',
    driveId: '1IhRybTtCvtfaVmjGz68JtGHdBRm9l28v',
    driveUrl: getDriveDirectUrl('1IhRybTtCvtfaVmjGz68JtGHdBRm9l28v'),
    fallbackUrl: getDriveThumbnailUrl('1IhRybTtCvtfaVmjGz68JtGHdBRm9l28v', 1200),
    caption: 'Hours flew by like minutes.'
  },
  {
    id: 'chat-start-3',
    category: 'chat',
    title: 'Inside Jokes & Laughter',
    subtitle: 'Hahahah daming tawa',
    date: 'September 2025',
    driveId: '13cKC8I8X6yw8OGqmsXpmF9YJPcNf8tcT',
    driveUrl: getDriveDirectUrl('13cKC8I8X6yw8OGqmsXpmF9YJPcNf8tcT'),
    fallbackUrl: getDriveThumbnailUrl('13cKC8I8X6yw8OGqmsXpmF9YJPcNf8tcT', 1200),
    caption: 'Finding joy in every word.'
  },
  // Fast Forward Chats
  {
    id: 'chat-ff-1',
    category: 'chat',
    title: 'Getting Closer',
    subtitle: 'As the days go on... fast forward',
    date: 'September 2025',
    driveId: '1LcZv5ZLHlAF4xJjpj7GLnnCkbL9ZOZe1',
    driveUrl: getDriveDirectUrl('1LcZv5ZLHlAF4xJjpj7GLnnCkbL9ZOZe1'),
    fallbackUrl: getDriveThumbnailUrl('1LcZv5ZLHlAF4xJjpj7GLnnCkbL9ZOZe1', 1200),
    caption: 'Daily routines started revolving around each other.'
  },
  {
    id: 'chat-ff-2',
    category: 'chat',
    title: 'Comfort in Conversations',
    subtitle: 'Sharing everything on our minds',
    date: 'September 2025',
    driveId: '1Uj-hP9qizvJJZMjnqHExH3A1CJ3ErCR8',
    driveUrl: getDriveDirectUrl('1Uj-hP9qizvJJZMjnqHExH3A1CJ3ErCR8'),
    fallbackUrl: getDriveThumbnailUrl('1Uj-hP9qizvJJZMjnqHExH3A1CJ3ErCR8', 1200),
    caption: 'From classmates to confidants.'
  },
  {
    id: 'chat-ff-3',
    category: 'chat',
    title: 'Unspoken Feelings',
    subtitle: 'Between every line of text',
    date: 'September 2025',
    driveId: '1ouno4yg3xS_LJHwp5wFAtX7H3ZqvSCvZ',
    driveUrl: getDriveDirectUrl('1ouno4yg3xS_LJHwp5wFAtX7H3ZqvSCvZ'),
    fallbackUrl: getDriveThumbnailUrl('1ouno4yg3xS_LJHwp5wFAtX7H3ZqvSCvZ', 1200),
    caption: 'Hearts beating a little faster.'
  },
  // Lakbay ng Sanaysay & Official Sep 21 / 22 2025
  {
    id: 'chat-sanaysay-1',
    category: 'chat',
    title: 'Lakbay ng Sanaysay',
    subtitle: 'Yung lakbay ng sanaysay ang rason kung bakit',
    date: 'Sep 21, 2025',
    driveId: '1K6FTMgGokgZFoHVOTxOO24FO2l66FU3X',
    driveUrl: getDriveDirectUrl('1K6FTMgGokgZFoHVOTxOO24FO2l66FU3X'),
    fallbackUrl: getDriveThumbnailUrl('1K6FTMgGokgZFoHVOTxOO24FO2l66FU3X', 1200),
    caption: 'Sep 21: Confession of Admirations.'
  },
  {
    id: 'chat-sanaysay-2',
    category: 'chat',
    title: 'The Turning Point',
    subtitle: 'Expressing the heart honestly',
    date: 'Sep 22, 2025',
    driveId: '1iIeEoZCHDegEEylstflq5zDHhfA3QDVh',
    driveUrl: getDriveDirectUrl('1iIeEoZCHDegEEylstflq5zDHhfA3QDVh'),
    fallbackUrl: getDriveThumbnailUrl('1iIeEoZCHDegEEylstflq5zDHhfA3QDVh', 1200),
    caption: 'Sep 22: The official start of expressing feelings (Double meaning of 22!)'
  },
  {
    id: 'chat-sanaysay-3',
    category: 'chat',
    title: 'Jamaica? Maica? Love? Lovey?',
    subtitle: 'The evolution of nicknames',
    date: 'Sep 22, 2025',
    driveId: '14LxCjkVoAQteqIpld69Nm0MquD5QxMG3',
    driveUrl: getDriveDirectUrl('14LxCjkVoAQteqIpld69Nm0MquD5QxMG3'),
    fallbackUrl: getDriveThumbnailUrl('14LxCjkVoAQteqIpld69Nm0MquD5QxMG3', 1200),
    caption: '"I love you lovey heheh"'
  },

  // 5. Special Early Memories: Her Solo, Reed, Singing & Guitar, Park Hangouts
  {
    id: 'special-her-1',
    category: 'special',
    title: 'Her Radiance',
    subtitle: 'Cute mo dito hahah, reed haha',
    driveId: '1wjJYm-DknD2fCe26uJf6K5qf3hu5pNWK',
    driveUrl: getDriveDirectUrl('1wjJYm-DknD2fCe26uJf6K5qf3hu5pNWK'),
    fallbackUrl: getDriveThumbnailUrl('1wjJYm-DknD2fCe26uJf6K5qf3hu5pNWK', 1200),
    caption: 'That unforgettable smile.'
  },
  {
    id: 'special-her-2',
    category: 'special',
    title: 'Playful Laughter',
    subtitle: 'Hahahahha moment',
    driveId: '18-cRpZniuYCN2liwFjXmlyA6Iyktl29I',
    driveUrl: getDriveDirectUrl('18-cRpZniuYCN2liwFjXmlyA6Iyktl29I'),
    fallbackUrl: getDriveThumbnailUrl('18-cRpZniuYCN2liwFjXmlyA6Iyktl29I', 1200),
    caption: 'Pure uninhibited laughter.'
  },
  {
    id: 'special-music-1',
    category: 'special',
    title: 'Singing & Guitar Together (I)',
    subtitle: 'Harmonizing together',
    driveId: '1EqUHzqoQPF9_G6W8FT6XpqFTE3EyA3h8',
    driveUrl: getDriveDirectUrl('1EqUHzqoQPF9_G6W8FT6XpqFTE3EyA3h8'),
    fallbackUrl: getDriveThumbnailUrl('1EqUHzqoQPF9_G6W8FT6XpqFTE3EyA3h8', 1200),
    caption: 'Strumming chords and singing Palagi.'
  },
  {
    id: 'special-music-2',
    category: 'special',
    title: 'Singing & Guitar Together (II)',
    subtitle: 'Ang ganda nito heheh',
    driveId: '1AViBTSTQY142f1_tQcBIGWRIHwRbQvoM',
    driveUrl: getDriveDirectUrl('1AViBTSTQY142f1_tQcBIGWRIHwRbQvoM'),
    fallbackUrl: getDriveThumbnailUrl('1AViBTSTQY142f1_tQcBIGWRIHwRbQvoM', 1200),
    caption: 'The melody of our shared world.'
  },
  {
    id: 'special-park-1',
    category: 'special',
    title: 'Park Hangout (I)',
    subtitle: 'Walking under the shade',
    driveId: '1NFQLAcF7lU07YkeoA3JULgzibrnp1fuV',
    driveUrl: getDriveDirectUrl('1NFQLAcF7lU07YkeoA3JULgzibrnp1fuV'),
    fallbackUrl: getDriveThumbnailUrl('1NFQLAcF7lU07YkeoA3JULgzibrnp1fuV', 1200),
    caption: 'Gentle breeze and deep talks.'
  },
  {
    id: 'special-park-2',
    category: 'special',
    title: 'Park Hangout (II)',
    subtitle: 'Resting on the green grass',
    driveId: '1h-67bSIskSl71x99-4OAoG1_viB9HRug',
    driveUrl: getDriveDirectUrl('1h-67bSIskSl71x99-4OAoG1_viB9HRug'),
    fallbackUrl: getDriveThumbnailUrl('1h-67bSIskSl71x99-4OAoG1_viB9HRug', 1200),
    caption: 'Time moving slow and peaceful.'
  },
  {
    id: 'special-park-3',
    category: 'special',
    title: 'Park Hangout (III)',
    subtitle: 'Yun na yun sa school at starting!',
    driveId: '1xCCNzzB7C2yqACzUdeHXGEo5DW_8ApzX',
    driveUrl: getDriveDirectUrl('1xCCNzzB7C2yqACzUdeHXGEo5DW_8ApzX'),
    fallbackUrl: getDriveThumbnailUrl('1xCCNzzB7C2yqACzUdeHXGEo5DW_8ApzX', 1200),
    caption: 'Ready for mountains and adventures.'
  },

  // 6. Section 2: Nature, Mountains, Peak Experiences
  // Cuanus Falls (2 photos)
  {
    id: 'nature-cuanus-1',
    category: 'nature',
    title: 'Cuanus Falls First Date (I)',
    subtitle: 'First date hahah... babalikan natin to',
    driveId: '1SGBs73H1KmwjTg4PUOOe3Wt9_Gzx9Mns',
    driveUrl: getDriveDirectUrl('1SGBs73H1KmwjTg4PUOOe3Wt9_Gzx9Mns'),
    fallbackUrl: getDriveThumbnailUrl('1SGBs73H1KmwjTg4PUOOe3Wt9_Gzx9Mns', 1200),
    caption: 'The rushing crystal waters and cold mist.'
  },
  {
    id: 'nature-cuanus-2',
    category: 'nature',
    title: 'Cuanus Falls First Date (II)',
    subtitle: 'Holding hands across the rocks',
    driveId: '1a8KNj7rRamDk5gI55nt9DYybADnM8bPl',
    driveUrl: getDriveDirectUrl('1a8KNj7rRamDk5gI55nt9DYybADnM8bPl'),
    fallbackUrl: getDriveThumbnailUrl('1a8KNj7rRamDk5gI55nt9DYybADnM8bPl', 1200),
    caption: 'An unforgettable first adventure.'
  },

  // Gullas Mountain Drive (5 photos)
  {
    id: 'nature-gullas-1',
    category: 'nature',
    title: 'Gullas Mountain Drive (I)',
    subtitle: 'Pauwi galing school overlooking city lights',
    driveId: '1QwoufGwY4pSYL8asWopfjqeb316c0JVz',
    driveUrl: getDriveDirectUrl('1QwoufGwY4pSYL8asWopfjqeb316c0JVz'),
    fallbackUrl: getDriveThumbnailUrl('1QwoufGwY4pSYL8asWopfjqeb316c0JVz', 1200),
    caption: 'Winding mountain roads with cool evening wind.'
  },
  {
    id: 'nature-gullas-2',
    category: 'nature',
    title: 'Gullas Mountain Drive (II)',
    subtitle: 'Overlooking the vast valley',
    driveId: '1Q8kaE11NJsvdhNo21DzU7cC1JAZjJLHR',
    driveUrl: getDriveDirectUrl('1Q8kaE11NJsvdhNo21DzU7cC1JAZjJLHR'),
    fallbackUrl: getDriveThumbnailUrl('1Q8kaE11NJsvdhNo21DzU7cC1JAZjJLHR', 1200),
    caption: 'Looking down at the glowing city below.'
  },
  {
    id: 'nature-gullas-3',
    category: 'nature',
    title: 'Gullas Mountain Drive (III)',
    subtitle: 'Sunset along the ridges',
    driveId: '1HOpZKzZRVJjlNWeqS7dwoAjORJ8nXsVo',
    driveUrl: getDriveDirectUrl('1HOpZKzZRVJjlNWeqS7dwoAjORJ8nXsVo'),
    fallbackUrl: getDriveThumbnailUrl('1HOpZKzZRVJjlNWeqS7dwoAjORJ8nXsVo', 1200),
    caption: 'Golden hues painting the peaks.'
  },
  {
    id: 'nature-gullas-4',
    category: 'nature',
    title: 'Gullas Mountain Drive (IV)',
    subtitle: 'Quiet stopover at the viewpoint',
    driveId: '1_FxFqYvt4FSxauKQsCvBZP-UoAH6Xg0Z',
    driveUrl: getDriveDirectUrl('1_FxFqYvt4FSxauKQsCvBZP-UoAH6Xg0Z'),
    fallbackUrl: getDriveThumbnailUrl('1_FxFqYvt4FSxauKQsCvBZP-UoAH6Xg0Z', 1200),
    caption: 'Sharing thoughts with the skyline.'
  },
  {
    id: 'nature-gullas-5',
    category: 'nature',
    title: 'Gullas Mountain Drive (V)',
    subtitle: 'Driving home together with music',
    driveId: '1Kkp_LAqrwMtYgpCuaoPBFY7ERofQ94_W',
    driveUrl: getDriveDirectUrl('1Kkp_LAqrwMtYgpCuaoPBFY7ERofQ94_W'),
    fallbackUrl: getDriveThumbnailUrl('1Kkp_LAqrwMtYgpCuaoPBFY7ERofQ94_W', 1200),
    caption: 'Every ride felt like home.'
  },

  // Breakup Message Reflection (May 30, 2025)
  {
    id: 'nature-breakup-1',
    category: 'nature',
    title: 'May 30, 2025 Reflection (I)',
    subtitle: 'The heavy night we almost lost each other',
    date: 'May 30, 2025',
    driveId: '1CGEDeh8tAxj-YkM6ZZOK2AfUvP82JmNF',
    driveUrl: getDriveDirectUrl('1CGEDeh8tAxj-YkM6ZZOK2AfUvP82JmNF'),
    fallbackUrl: getDriveThumbnailUrl('1CGEDeh8tAxj-YkM6ZZOK2AfUvP82JmNF', 1200),
    caption: 'I understand ra this lovey... hindi lang ka move on nung gabi na yun.'
  },
  {
    id: 'nature-breakup-2',
    category: 'nature',
    title: 'May 30, 2025 Reflection (II)',
    subtitle: 'Facing the storm of doubts',
    date: 'May 30, 2025',
    driveId: '1f9OAAvbYVNFm88AS7iaz6r4DmiPwaUqS',
    driveUrl: getDriveDirectUrl('1f9OAAvbYVNFm88AS7iaz6r4DmiPwaUqS'),
    fallbackUrl: getDriveThumbnailUrl('1f9OAAvbYVNFm88AS7iaz6r4DmiPwaUqS', 1200),
    caption: 'Pero... fate wasn\'t finished with our story.'
  },

  // Pangilatan Reconciliation (3 photos)
  {
    id: 'nature-pangilatan-1',
    category: 'nature',
    title: 'Pangilatan Reconciliation (I)',
    subtitle: 'Im glad nga ni say ka yes',
    driveId: '1gleN1sZluzU_GKRbTjkNsW8jDC3mNOgG',
    driveUrl: getDriveDirectUrl('1gleN1sZluzU_GKRbTjkNsW8jDC3mNOgG'),
    fallbackUrl: getDriveThumbnailUrl('1gleN1sZluzU_GKRbTjkNsW8jDC3mNOgG', 1200),
    caption: 'You allowed us to meet and talk.'
  },
  {
    id: 'nature-pangilatan-2',
    category: 'nature',
    title: 'Pangilatan Reconciliation (II)',
    subtitle: 'Wala ka ni give up hehehe',
    driveId: '1u_qxAj__UHQSKXG43JMPx6TTliAqB3eQ',
    driveUrl: getDriveDirectUrl('1u_qxAj__UHQSKXG43JMPx6TTliAqB3eQ'),
    fallbackUrl: getDriveThumbnailUrl('1u_qxAj__UHQSKXG43JMPx6TTliAqB3eQ', 1200),
    caption: 'Really glad & thankful nga ni fight back ka.'
  },
  {
    id: 'nature-pangilatan-3',
    category: 'nature',
    title: 'Pangilatan Reconciliation (III)',
    subtitle: 'Thank you lovey',
    driveId: '1cHq9Lne2xLk53LPD_DfD6MFrQHLCNKTl',
    driveUrl: getDriveDirectUrl('1cHq9Lne2xLk53LPD_DfD6MFrQHLCNKTl'),
    fallbackUrl: getDriveThumbnailUrl('1cHq9Lne2xLk53LPD_DfD6MFrQHLCNKTl', 1200),
    caption: 'Holding on tighter than ever.'
  },

  // Flood Intervention Trial (2 photos & 1 video)
  {
    id: 'nature-flood-1',
    category: 'flood',
    title: 'The Great Flood Trial (I)',
    subtitle: 'First time nga ni intervene ang nature',
    driveId: '1zlB87psN66mghBimWzH8uqTy8OXtHUF4',
    driveUrl: getDriveDirectUrl('1zlB87psN66mghBimWzH8uqTy8OXtHUF4'),
    fallbackUrl: getDriveThumbnailUrl('1zlB87psN66mghBimWzH8uqTy8OXtHUF4', 1200),
    caption: 'Pinaka kaba at pinaka maganda sa lahat ng memories.'
  },
  {
    id: 'nature-flood-2',
    category: 'flood',
    title: 'The Great Flood Trial (II)',
    subtitle: 'Overcoming it together with calm hearts',
    driveId: '1MiDp-dQn0-SfU223zPPnEtws8Xe4vPOQ',
    driveUrl: getDriveDirectUrl('1MiDp-dQn0-SfU223zPPnEtws8Xe4vPOQ'),
    fallbackUrl: getDriveThumbnailUrl('1MiDp-dQn0-SfU223zPPnEtws8Xe4vPOQ', 1200),
    caption: 'Wala tayong binlame, nag-isip ng solusyon.'
  },
  {
    id: 'nature-flood-3',
    category: 'flood',
    title: 'The Great Flood Trial (Video Clip)',
    subtitle: 'Unexpected trials... we don\'t need to overcome alone',
    driveId: '1BtPQK_OIhMflJk2pTYIgUEZDJckqH9gF',
    isVideo: true,
    videoPreviewUrl: 'https://drive.google.com/file/d/1BtPQK_OIhMflJk2pTYIgUEZDJckqH9gF/preview',
    fallbackUrl: getDriveThumbnailUrl('1BtPQK_OIhMflJk2pTYIgUEZDJckqH9gF', 1200),
    caption: 'Mag remind pud nato sa future obstacles nga dapat in-ani.'
  },

  // 7. Section 3: First Real Argument (3 photos)
  {
    id: 'argument-1',
    category: 'argument',
    title: 'First Real Argument (I)',
    subtitle: 'Cute nito hahahha, first real argument',
    driveId: '1LZflhAxY5Jc91wHzB90hXLNEOZpHefZ2',
    driveUrl: getDriveDirectUrl('1LZflhAxY5Jc91wHzB90hXLNEOZpHefZ2'),
    fallbackUrl: getDriveThumbnailUrl('1LZflhAxY5Jc91wHzB90hXLNEOZpHefZ2', 1200),
    caption: 'Misunderstandings that taught us how to communicate.'
  },
  {
    id: 'argument-2',
    category: 'argument',
    title: 'First Real Argument (II)',
    subtitle: 'Working through our differences',
    driveId: '139VyPunnN4ZdRQ9diM9H8Po-7rVjBz96',
    driveUrl: getDriveDirectUrl('139VyPunnN4ZdRQ9diM9H8Po-7rVjBz96'),
    fallbackUrl: getDriveThumbnailUrl('139VyPunnN4ZdRQ9diM9H8Po-7rVjBz96', 1200),
    caption: 'Choosing love over being right.'
  },
  {
    id: 'argument-3',
    category: 'argument',
    title: 'First Real Argument (III)',
    subtitle: 'Love you talaga lovey',
    driveId: '12qvAsHZk-RQZ0vYM3IBaRmV1l24pm-M7',
    driveUrl: getDriveDirectUrl('12qvAsHZk-RQZ0vYM3IBaRmV1l24pm-M7'),
    fallbackUrl: getDriveThumbnailUrl('12qvAsHZk-RQZ0vYM3IBaRmV1l24pm-M7', 1200),
    caption: 'Stronger and closer after every talk.'
  }
];

export const STORY_CHAPTERS = [
  { id: 'INTRO', name: 'Our First Year', iconName: 'Sparkles', description: 'Nature, canopy light & beginning', timestampHint: '0:00' },
  { id: 'MONTAGE_8S', name: 'Look Back Flash', iconName: 'Zap', description: '8s rapid flash of 10 memories', timestampHint: '0:08' },
  { id: 'SIMULATION_BLACK', name: 'Simulated Matrix', iconName: 'Terminal', description: 'Deep cinematic terminal boot', timestampHint: '0:16' },
  { id: 'GOLDEN_HOUR_INTRO', name: 'Golden Hour', iconName: 'Sun', description: 'Warm twilight & Walk with me', timestampHint: '0:22' },
  { id: 'WALK_INTRO_22', name: 'Meet 22', iconName: 'Smile', description: 'Soul star guide & Palagi music', timestampHint: '0:30' },
  { id: 'SCENE_1_SCHOOL_MOODY', name: 'School & City', iconName: 'GraduationCap', description: 'Silent admiration in crowds', timestampHint: '0:45' },
  { id: 'SCENE_1_FATE_REVEAL', name: 'Fate Has Purpose', iconName: 'Heart', description: 'The unexpected plan of destiny', timestampHint: '1:15' },
  { id: 'STATIC_GLITCH', name: 'Glitch in Reality', iconName: 'Tv', description: 'Shift to bright hopeful wonder', timestampHint: '1:30' },
  { id: 'SCENE_1_CHATS_JOURNEY', name: 'First Chats & 22nd', iconName: 'MessageCircle', description: 'Sep 21-22, Lovey nicknames, Guitar', timestampHint: '1:45' },
  { id: 'SCENE_2_NATURE_PEAK', name: 'Peaks & Resilience', iconName: 'Mountain', description: 'Cuanus, Gullas, Pangilatan & Flood', timestampHint: '3:00' },
  { id: 'SCENE_3_ARGUMENTS', name: 'Real Arguments', iconName: 'Coffee', description: 'First misunderstanding & real love', timestampHint: '4:15' },
  { id: 'SCENE_FINAL_MUSIC_VIDEO', name: 'Dedicated MV & Portal', iconName: 'Film', description: 'Music video & Portal to Ating Universe', timestampHint: '4:45' }
] as const;
