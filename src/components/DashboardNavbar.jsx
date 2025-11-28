import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Gamepad2, ChevronDown } from 'lucide-react';

const DashboardNavbar = () => {
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fullName = localStorage.getItem('userFullName');
        const email = localStorage.getItem('userEmail');

        if (fullName && email) {
            setUser({ fullName, email });
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userFullName');
        navigate('/');
    };

    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    if (!user) return null;

    return (
        <nav className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo e Brand */}
                    <div className="flex items-center space-x-8">
                        <Link to="/dashboard" className="flex items-center gap-2">
                            <div className="p-2 bg-indigo-600 rounded-lg">
                                <Gamepad2 className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">ChronoTask</span>
                        </Link>

                        {/* Menu de Navegação */}
                        <div className="hidden md:flex space-x-4">
                            <Link
                                to="/dashboard"
                                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 font-medium transition-colors"
                            >
                                Dashboard
                            </Link>
                            <button
                                disabled
                                className="px-3 py-2 rounded-lg text-slate-500 cursor-not-allowed"
                                title="Em desenvolvimento"
                            >
                                Hábitos
                            </button>
                            <Link
                                to="/character"
                                className="px-3 py-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700/50 font-medium transition-colors"
                            >
                                Personagem
                            </Link>
                            <button
                                disabled
                                className="px-3 py-2 rounded-lg text-slate-500 cursor-not-allowed"
                                title="Em desenvolvimento"
                            >
                                Batalhas
                            </button>
                        </div>
                    </div>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-700/50 transition-colors"
                        >
                            {/* Avatar */}
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold">
                                {getInitials(user.fullName)}
                            </div>
                            {/* Nome e Email */}
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-white">{user.fullName}</p>
                                <p className="text-xs text-slate-400">{user.email}</p>
                            </div>
                            {/* Ícone dropdown */}
                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
                        </button>

                        {/* Dropdown Menu */}
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-lg py-2 z-50">
                                <button
                                    disabled
                                    className="w-full px-4 py-2 text-left text-slate-500 hover:bg-slate-700/50 transition-colors cursor-not-allowed"
                                    title="Em desenvolvimento"
                                >
                                    Perfil
                                </button>
                                <button
                                    disabled
                                    className="w-full px-4 py-2 text-left text-slate-500 hover:bg-slate-700/50 transition-colors cursor-not-allowed"
                                    title="Em desenvolvimento"
                                >
                                    Configurações
                                </button>
                                <hr className="border-slate-700 my-2" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 text-left text-red-400 hover:bg-slate-700/50 transition-colors"
                                >
                                    Sair
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default DashboardNavbar;
