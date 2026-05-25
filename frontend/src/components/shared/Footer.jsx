const Footer = () => {
  return (
    <footer className="mt-20 bg-gradient-to-t from-[#04010d] to-[#0c0521] border-t border-purple-950/45 text-white">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center font-black text-brand-cyan text-lg shadow-md uppercase">
              JP
            </div>
            <h3 className="text-2xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent tracking-wider">
              Job-Portal
            </h3>
          </div>
          <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm">
            India's #1 AI-powered job portal connecting top talent with leading
            companies. Find your dream career today.
          </p>
          <div className="flex gap-3 mt-6">
            <button className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-xl flex items-center justify-center hover:bg-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs">
              GH
            </button>
            <button className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-xl flex items-center justify-center hover:bg-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs">
              IN
            </button>
            <button className="w-10 h-10 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded-xl flex items-center justify-center hover:bg-purple-500/25 hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs">
              TW
            </button>
          </div>
        </div>

        <div>
          <h4 className="font-extrabold text-sm tracking-wider uppercase text-brand-cyan mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-gray-400 font-medium">
            <li className="hover:text-white transition-colors cursor-pointer">Home</li>
            <li className="hover:text-white transition-colors cursor-pointer">Browse Jobs</li>
            <li className="hover:text-white transition-colors cursor-pointer">Search</li>
            <li className="hover:text-white transition-colors cursor-pointer">My Profile</li>
            <li className="hover:text-white transition-colors cursor-pointer">CV Maker</li>
          </ul>
        </div>

        <div>
          <h4 className="font-extrabold text-sm tracking-wider uppercase text-brand-cyan mb-4">Contact Us</h4>
          <p className="text-sm text-gray-400 leading-relaxed">
            Noida Sector 63, H-112, near Electronic City Metro Station, Uttar
            Pradesh, India - 201301
          </p>
          <p className="mt-3 text-sm text-gray-400">✉️ info@recruweb.com</p>
          <p className="mt-1 text-sm text-gray-400">📞 +91 9336532636</p>
          <button className="mt-5 inline-block px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wide uppercase transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_15px_rgba(124,58,237,0.3)]">
            Get in Touch
          </button>
        </div>
      </div>
      <div className="border-t border-purple-950/50 py-6 text-center text-xs text-gray-500 font-semibold tracking-wider bg-[#04010a]">
        © {new Date().getFullYear()} Job-Portal. Made With ❤️ By Manish.
      </div>
    </footer>
  );
};

export default Footer;
