const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">About BookStore</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-600 mb-6">
            Welcome to BookStore, your premier destination for discovering and purchasing books across all genres. 
            Since our founding, we've been committed to connecting readers with the stories that inspire, educate, and entertain.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To make quality books accessible to everyone, fostering a love for reading and learning 
                in communities worldwide. We believe that books have the power to transform lives and 
                broaden perspectives.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To become the world's most trusted and comprehensive online bookstore, where readers 
                can discover their next favorite book and authors can reach their ideal audience.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">📚</div>
                <h3 className="font-semibold mb-2">Vast Collection</h3>
                <p className="text-sm text-gray-600">Over 10,000 books across all genres</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚚</div>
                <h3 className="font-semibold mb-2">Fast Delivery</h3>
                <p className="text-sm text-gray-600">Quick and reliable shipping</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-2">Best Prices</h3>
                <p className="text-sm text-gray-600">Competitive pricing and great deals</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Founded in 2024, BookStore began as a small passion project by book lovers who wanted 
              to create a better way for people to discover and purchase books online. What started 
              as a simple idea has grown into a comprehensive platform serving thousands of readers worldwide.
            </p>
            <p className="text-gray-600">
              Today, we continue to innovate and expand our services, always keeping our customers' 
              needs at the heart of everything we do. From fiction to non-fiction, programming to 
              self-help, we're here to help you find your next great read.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;