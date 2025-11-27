import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { loginSchema } from '../schemas/loginSchema';
import { login } from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const LoginForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(loginSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError('');

        try {
            const response = await login({
                email: data.email,
                password: data.password
            });

            // Save data to localStorage
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userFullName', response.fullName);

            // Redirect to dashboard
            navigate('/dashboard');
        } catch (error) {
            const message = error.response?.data?.message || 'Email ou senha inválidos';
            setApiError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Email
                </label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder="seu@email.com"
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-slate-700'}`}
                />
                {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            {/* Senha */}
            <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Senha
                </label>
                <div className="relative">
                    <input
                        {...register('password')}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-slate-700'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                    >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            {/* Lembrar-me e Esqueceu senha */}
            <div className="flex items-center justify-between">
                <label className="flex items-center">
                    <input
                        {...register('rememberMe')}
                        type="checkbox"
                        className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-2 text-sm text-slate-300">Lembrar-me</span>
                </label>
                <a href="#" className="text-sm text-indigo-400 hover:text-indigo-300">
                    Esqueceu a senha?
                </a>
            </div>

            {/* Erro da API */}
            {apiError && (
                <div className="p-3 bg-red-900/20 border border-red-500 rounded-lg">
                    <p className="text-red-400 text-sm">{apiError}</p>
                </div>
            )}

            {/* Botão Submit */}
            <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:ring-4 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-500/20"
            >
                {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Entrando...</span>
                    </div>
                ) : (
                    'Entrar'
                )}
            </button>

            {/* Link para Registro */}
            <p className="text-center text-slate-400 text-sm">
                Não tem uma conta?{' '}
                <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Cadastre-se
                </Link>
            </p>
        </form>
    );
};

export default LoginForm;
