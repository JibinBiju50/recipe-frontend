import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Footer Content */}
      <div className="w-full bg-[var(--color-font)] text-white px-6 md:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            
            {/* Brand Section */}
            <div className="md:col-span-1">
              <div>
                <img src={logo} alt="Logo" className="w-20 h-12" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Discover delicious recipes from around the world. Cook, share, and enjoy amazing meals with your loved ones.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Home</a></li>
                <li><a href="#recipe-list" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Recipes</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">About Us</a></li>
                <li><Link to="/add-recipe" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Add Recipe</Link></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Categories</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Breakfast</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Lunch</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Dinner</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Desserts</a></li>
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h4 className="text-lg font-semibold mb-4 text-[var(--color-primary)]">Connect With Us</h4>
              <div className="flex gap-4 mb-4">
                <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <FontAwesomeIcon icon={faFacebook} className="text-white text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <FontAwesomeIcon icon={faInstagram} className="text-white text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <FontAwesomeIcon icon={faTwitter} className="text-white text-lg" />
                </a>
                <a href="#" className="w-10 h-10 bg-[var(--color-primary)] rounded-full flex items-center justify-center hover:bg-[var(--color-accent)] transition-colors">
                  <FontAwesomeIcon icon={faYoutube} className="text-white text-lg" />
                </a>
              </div>
              <p className="text-gray-400 text-sm">
                Follow us for daily recipes and cooking inspiration!
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2025 Spoonfull. All rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-[var(--color-accent)] transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}