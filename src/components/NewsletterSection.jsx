export default function NewsletterSection() {
  return (
    <div className="w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] px-6 md:px-12 py-12 md:py-16 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 text-4xl opacity-20">🍕</div>
      <div className="absolute bottom-4 right-4 text-4xl opacity-20">🍔</div>
      <div className="absolute top-1/2 left-8 text-3xl opacity-15 hidden md:block">🥗</div>
      <div className="absolute top-8 right-12 text-3xl opacity-15 hidden md:block">🍰</div>
      
      <div className="relative flex flex-col items-center text-center max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Get Fresh Recipes Weekly! 🍳
        </h2>
        <p className="text-white/90 text-lg max-w-xl mb-8">
          Subscribe to our newsletter and receive delicious recipes, cooking tips, and exclusive content straight to your inbox.
        </p>
        
        {/* Email form */}
        <form className="flex flex-col sm:flex-row gap-4 w-full max-w-lg" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Enter your email address"
            className="flex-1 px-6 py-4 rounded-full text-[var(--color-font)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white shadow-lg"
            required
          />
          <button 
            type="submit"
            className="bg-white text-[var(--color-accent)] px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:bg-[var(--color-font)] hover:text-white shadow-lg hover:shadow-xl"
          >
            Subscribe
          </button>
        </form>
        
        <p className="text-white/70 text-sm mt-4">
          🔒 No spam, unsubscribe anytime. Join 10,000+ food lovers!
        </p>
      </div>
    </div>
  );
}

