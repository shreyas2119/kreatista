export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 py-6 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-zinc-500">
        <span className="font-bold text-foreground">
          Creati<span className="text-violet-500">Social</span>
        </span>
        <span>© 2026 CreatiSocial</span>
        <div className="flex gap-5">
          {["Services", "Contact", "Instagram"].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-violet-300 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
