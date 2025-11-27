import React from 'react';
import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800"
        >
            <div className="flex items-center gap-2">
                <div className="p-2 bg-indigo-600 rounded-lg">
                    <Gamepad2 className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                    ChronoTask
                </span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-slate-300">
                <a href="#how-it-works" className="hover:text-white transition-colors">Como Funciona</a>
                <a href="#features" className="hover:text-white transition-colors">Features</a>
                <a href="#community" className="hover:text-white transition-colors">Comunidade</a>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login" className="hidden md:block text-slate-300 hover:text-white transition-colors">
                    Login
                </Link>
                <Link to="/register" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-indigo-500/20">
                    Começar Agora
                </Link>
            </div>
        </motion.nav>
    );
};

export default Navbar;
