import React from 'react';
import { Gamepad2, Twitter, Github, Disc } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-slate-950 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold text-white">ChronoTask</span>
                    </div>

                    <div className="flex items-center gap-8 text-slate-400">
                        <a href="#" className="hover:text-white transition-colors">Sobre</a>
                        <a href="#" className="hover:text-white transition-colors">Termos</a>
                        <a href="#" className="hover:text-white transition-colors">Privacidade</a>
                        <a href="#" className="hover:text-white transition-colors">Contato</a>
                    </div>

                    <div className="flex items-center gap-4">
                        <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                            <Twitter className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                            <Disc className="w-5 h-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-900 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                            <Github className="w-5 h-5" />
                        </a>
                    </div>
                </div>

                <div className="mt-12 text-center text-slate-600 text-sm">
                    <p>© 2025 ChronoTask. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
