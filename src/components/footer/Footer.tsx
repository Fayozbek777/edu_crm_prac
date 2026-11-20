// src/components/footer/Footer.tsx
import { Github, Globe, Mail } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-200 bg-white mt-auto">
      <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-gray-500">
        <p className="text-center sm:text-left">
          © {year} <span className="font-semibold text-gray-700">EduCRM</span>
          <span className="hidden sm:inline"> · Все права защищены</span>
        </p>
        <div className="flex items-center gap-1">
          <a
            href="mailto:support@educrm.uz"
            aria-label="Email"
            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://educrm.uz"
            target="_blank"
            rel="noreferrer"
            aria-label="Сайт"
            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
