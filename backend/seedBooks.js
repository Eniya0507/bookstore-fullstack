const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Book = require('./models/Book');

dotenv.config();

// Connect to database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding ✅');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

connectDB();

const books = [
  // Fiction Books (8)
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    price: 299,
    category: "Fiction",
    description: "A classic American novel about the Jazz Age and the American Dream.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    stock: 15
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    price: 349,
    category: "Fiction",
    description: "A gripping tale of racial injustice and childhood innocence.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    stock: 8
  },
  {
    title: "1984",
    author: "George Orwell",
    price: 279,
    category: "Fiction",
    description: "A dystopian social science fiction novel about totalitarian control.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop",
    stock: 12
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    price: 329,
    category: "Fiction",
    description: "A romantic novel about manners, upbringing, and marriage.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    stock: 6
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    price: 289,
    category: "Fiction",
    description: "A controversial novel about teenage rebellion and alienation.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stock: 0
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    price: 259,
    category: "Fiction",
    description: "A novel about a group of British boys stranded on an uninhabited island.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
    stock: 20
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    price: 399,
    category: "Fiction",
    description: "A fantasy adventure about Bilbo Baggins and his unexpected journey.",
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=400&h=400&fit=crop",
    stock: 25
  },
  {
    title: "Brave New World",
    author: "Aldous Huxley",
    price: 319,
    category: "Fiction",
    description: "A dystopian novel about a futuristic World State.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop",
    stock: 10
  },

  // Finance Books (8)
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    price: 450,
    category: "Finance",
    description: "Personal finance book that advocates financial literacy and building wealth.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=400&fit=crop",
    stock: 30
  },
  {
    title: "The Intelligent Investor",
    author: "Benjamin Graham",
    price: 599,
    category: "Finance",
    description: "The definitive book on value investing and financial wisdom.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=400&fit=crop",
    stock: 18
  },
  {
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    price: 379,
    category: "Finance",
    description: "A personal development and self-help book focused on wealth building.",
    image: "https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=400&h=400&fit=crop",
    stock: 22
  },
  {
    title: "The Millionaire Next Door",
    author: "Thomas Stanley",
    price: 429,
    category: "Finance",
    description: "Research-based insights into the habits of wealthy Americans.",
    image: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=400&fit=crop",
    stock: 14
  },
  {
    title: "A Random Walk Down Wall Street",
    author: "Burton Malkiel",
    price: 549,
    category: "Finance",
    description: "A comprehensive guide to investing and portfolio management.",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=400&fit=crop",
    stock: 9
  },
  {
    title: "The Total Money Makeover",
    author: "Dave Ramsey",
    price: 399,
    category: "Finance",
    description: "A proven plan for financial fitness and debt elimination.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop",
    stock: 16
  },
  {
    title: "Your Money or Your Life",
    author: "Vicki Robin",
    price: 359,
    category: "Finance",
    description: "Transform your relationship with money and achieve financial independence.",
    image: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=400&fit=crop",
    stock: 11
  },
  {
    title: "The Richest Man in Babylon",
    author: "George Clason",
    price: 299,
    category: "Finance",
    description: "Timeless financial wisdom through parables set in ancient Babylon.",
    image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=400&fit=crop",
    stock: 28
  },

  // Programming Books (8)
  {
    title: "Clean Code",
    author: "Robert C. Martin",
    price: 1200,
    category: "Programming",
    description: "A handbook of agile software craftsmanship and clean coding practices.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop",
    stock: 35
  },
  {
    title: "JavaScript: The Good Parts",
    author: "Douglas Crockford",
    price: 899,
    category: "Programming",
    description: "Discover the elegant, lightweight, and expressive features of JavaScript.",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=400&fit=crop",
    stock: 0
  },
  {
    title: "Python Crash Course",
    author: "Eric Matthes",
    price: 1099,
    category: "Programming",
    description: "A hands-on, project-based introduction to programming with Python.",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=400&fit=crop",
    stock: 42
  },
  {
    title: "Design Patterns",
    author: "Gang of Four",
    price: 1399,
    category: "Programming",
    description: "Elements of reusable object-oriented software design.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=400&fit=crop",
    stock: 7
  },
  {
    title: "The Pragmatic Programmer",
    author: "Andrew Hunt",
    price: 1299,
    category: "Programming",
    description: "Your journey to mastery in software development.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=400&fit=crop",
    stock: 19
  },
  {
    title: "Eloquent JavaScript",
    author: "Marijn Haverbeke",
    price: 999,
    category: "Programming",
    description: "A modern introduction to programming with JavaScript.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=400&fit=crop",
    stock: 26
  },
  {
    title: "You Don't Know JS",
    author: "Kyle Simpson",
    price: 1199,
    category: "Programming",
    description: "Deep dive into the core mechanisms of the JavaScript language.",
    image: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=400&h=400&fit=crop",
    stock: 13
  },
  {
    title: "Refactoring",
    author: "Martin Fowler",
    price: 1349,
    category: "Programming",
    description: "Improving the design of existing code through systematic refactoring.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=400&fit=crop",
    stock: 8
  },

  // Self-Help Books (8)
  {
    title: "Atomic Habits",
    author: "James Clear",
    price: 499,
    category: "Self-Help",
    description: "An easy and proven way to build good habits and break bad ones.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    stock: 50
  },
  {
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    price: 549,
    category: "Self-Help",
    description: "Powerful lessons in personal change and effectiveness.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    stock: 32
  },
  {
    title: "How to Win Friends and Influence People",
    author: "Dale Carnegie",
    price: 399,
    category: "Self-Help",
    description: "Timeless advice on building relationships and influencing others.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    stock: 24
  },
  {
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 449,
    category: "Self-Help",
    description: "A guide to spiritual enlightenment and living in the present moment.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    stock: 17
  },
  {
    title: "Mindset",
    author: "Carol Dweck",
    price: 429,
    category: "Self-Help",
    description: "The new psychology of success through growth mindset.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop",
    stock: 21
  },
  {
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    price: 379,
    category: "Self-Help",
    description: "A counterintuitive approach to living a good life.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    stock: 38
  },
  {
    title: "Grit",
    author: "Angela Duckworth",
    price: 459,
    category: "Self-Help",
    description: "The power of passion and perseverance in achieving success.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
    stock: 15
  },
  {
    title: "The Four Agreements",
    author: "Don Miguel Ruiz",
    price: 329,
    category: "Self-Help",
    description: "A practical guide to personal freedom based on ancient Toltec wisdom.",
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=400&h=400&fit=crop",
    stock: 29
  },

  // Non-Fiction Books (8)
  {
    title: "Sapiens",
    author: "Yuval Noah Harari",
    price: 599,
    category: "Non-Fiction",
    description: "A brief history of humankind and how we came to dominate the world.",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
    stock: 45
  },
  {
    title: "Educated",
    author: "Tara Westover",
    price: 449,
    category: "Non-Fiction",
    description: "A memoir about education, family, and the struggle for self-invention.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
    stock: 32
  },
  {
    title: "Becoming",
    author: "Michelle Obama",
    price: 529,
    category: "Non-Fiction",
    description: "An intimate memoir by the former First Lady of the United States.",
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=400&fit=crop",
    stock: 38
  },
  {
    title: "The Immortal Life of Henrietta Lacks",
    author: "Rebecca Skloot",
    price: 399,
    category: "Non-Fiction",
    description: "The story of how one woman's cells changed medicine forever.",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=400&fit=crop",
    stock: 27
  },
  {
    title: "Into the Wild",
    author: "Jon Krakauer",
    price: 359,
    category: "Non-Fiction",
    description: "The true story of Christopher McCandless and his Alaskan adventure.",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=400&fit=crop",
    stock: 23
  },
  {
    title: "The Devil Wears Prada",
    author: "Lauren Weisberger",
    price: 319,
    category: "Non-Fiction",
    description: "A behind-the-scenes look at the fashion magazine industry.",
    image: "https://images.unsplash.com/photo-1518373714866-3f1478910cc0?w=400&h=400&fit=crop",
    stock: 19
  },
  {
    title: "Wild",
    author: "Cheryl Strayed",
    price: 379,
    category: "Non-Fiction",
    description: "A memoir of hiking the Pacific Crest Trail alone.",
    image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=400&h=400&fit=crop",
    stock: 31
  },
  {
    title: "The Glass Castle",
    author: "Jeannette Walls",
    price: 339,
    category: "Non-Fiction",
    description: "A memoir about growing up in a dysfunctional family.",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=400&fit=crop",
    stock: 26
  }
];

const seedBooks = async () => {
  try {
    // Clear existing books
    await Book.deleteMany({});
    console.log('Existing books cleared');

    // Insert new books
    await Book.insertMany(books);
    console.log('40 books seeded successfully!');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding books:', error);
    process.exit(1);
  }
};

seedBooks();