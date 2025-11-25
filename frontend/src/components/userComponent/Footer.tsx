const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 text-center py-6 border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4">
        <p className="mb-2">Metflix India &copy; {new Date().getFullYear()}</p>
        <div className="flex justify-center space-x-6 mb-2">
          <a href="/privacy" className="hover:text-white underline transition text-sm">Privacy</a>
          <a href="/terms" className="hover:text-white underline transition text-sm">Terms of Use</a>
          <a href="/contact" className="hover:text-white underline transition text-sm">Contact</a>
        </div>
        <p className="text-xs">Questions? Call <a href="tel:000-800-919-1694" className="underline hover:text-white transition">000-800-919-1694</a></p>
      </div>
    </footer>
  );
};

export default Footer;
