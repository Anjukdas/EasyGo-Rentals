const Footer = () => {
  return (
    <footer className="w-full bg-white pt-16 pb-8 border-t border-gray-100">
      
      {/* 1. NEWSLETTER SECTION */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-20">
        <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
          Never Miss a Deal!
        </h2>
        <p className="text-gray-400 text-sm md:text-base mt-2 mb-8">
          Subscribe to get the latest offers, new collections, and exclusive discounts.
        </p>

        {/* Input & Button Box */}
        <div className="flex flex-col sm:flex-row items-center max-w-2xl mx-auto border border-gray-200 rounded-xl sm:rounded-full overflow-hidden shadow-sm focus-within:border-blue-500 transition-colors">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full px-6 py-4 text-sm text-gray-700 placeholder-gray-400 outline-none"
          />
          <button className="w-full sm:w-auto bg-[#2B6CB0] hover:bg-blue-700 text-white font-medium px-8 py-4 text-sm transition-colors whitespace-nowrap">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* 2. MAIN FOOTER LINKS CONTAINER */}
      <div  id="about-footer" className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-gray-100">
        
        {/* Left Column (Brand & Socials) */}
        <div className="md:col-span-5 space-y-4 text-left">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-sm">
              G
            </div>
            <span className="text-lg font-bold text-gray-800 tracking-tight">
              CarRental
            </span>
          </div>
          <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
            Premium car rental service with a wide selection of luxury and everyday vehicles for all your driving needs.
          </p>
          
          {/* Social Links as Plain text - Ithil ippo Oru error-um varilla! */}
          <div className="flex items-center space-x-4 pt-2 text-xs font-bold text-gray-400 tracking-wider">
            <a href="#facebook" className="hover:text-blue-600 transition-colors">FACEBOOK</a>
            <a href="#instagram" className="hover:text-pink-600 transition-colors">INSTAGRAM</a>
            <a href="#twitter" className="hover:text-blue-400 transition-colors">TWITTER</a>
          </div>
        </div>

        {/* Column 2 (Quick Links) */}
        <div className="md:col-span-2 text-left">
          <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><a href="#home" className="hover:text-gray-900 transition-colors">Home</a></li>
            <li><a href="#cars" className="hover:text-gray-900 transition-colors">Browse Cars</a></li>
            <li><a href="#list" className="hover:text-gray-900 transition-colors">List Your Car</a></li>
            <li><a href="#about" className="hover:text-gray-900 transition-colors">About Us</a></li>
          </ul>
        </div>

        {/* Column 3 (Resources) */}
        <div className="md:col-span-2 text-left">
          <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Resources</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li><a href="#help" className="hover:text-gray-900 transition-colors">Help Center</a></li>
            <li><a href="#terms" className="hover:text-gray-900 transition-colors">Terms of Service</a></li>
            <li><a href="#privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</a></li>
            <li><a href="#insurance" className="hover:text-gray-900 transition-colors">Insurance</a></li>
          </ul>
        </div>

        {/* Column 4 (Contact) */}
        <div className="md:col-span-3 text-left">
          <h4 className="text-xs font-bold text-gray-900 tracking-wider uppercase mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-gray-500 font-medium">
            <li className="text-gray-400">1234 Luxury Drive</li>
            <li className="text-gray-400">San Francisco, CA 94107</li>
            <li className="text-gray-400">+1 (555) 123-4567</li>
            <li className="text-gray-400">car@example.com</li>
          </ul>
        </div>

      </div>

      {/* 3. VERY BOTTOM COPYRIGHT BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 font-medium space-y-4 sm:space-y-0">
        <div>
          © 2026 CarRental. All rights reserved.
        </div>
        <div className="flex space-x-6">
          <a href="#terms" className="hover:text-gray-600 transition-colors">Terms</a>
          <a href="#privacy" className="hover:text-gray-600 transition-colors">Privacy</a>
          <a href="#cookies" className="hover:text-gray-600 transition-colors">Cookies</a>
        </div>
      </div>

    </footer>
  );
};

export default Footer;