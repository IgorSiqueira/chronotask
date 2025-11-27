import React from 'react';
import { Gamepad2 } from 'lucide-react';
import LoginForm from '../components/LoginForm';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-4 hover:opacity-80 transition-opacity">
                        <div className="p-2 bg-indigo-600 rounded-lg">
                            <Gamepad2 className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-white">ChronoTask</span>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        Bem-vindo de Volta!
                    </h1>
                    <p className="text-slate-400">
                        Entre para continuar sua jornada épica
                    </p>
                </div>

                {/* Card */}
                <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8">
                    <LoginForm />
                </div>
            </div>
        </div>
    );
};

export default Login;
