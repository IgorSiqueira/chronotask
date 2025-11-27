import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { registerSchema } from '../schemas/registerSchema';
import { createUser } from '../services/api';
import { Eye, EyeOff } from 'lucide-react';

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [apiError, setApiError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(registerSchema)
    });

    const onSubmit = async (data) => {
        setIsLoading(true);
        setApiError('');

        try {
            await createUser({
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                birthDate: data.birthDate,
                acceptTerms: data.acceptTerms
            });

            // Redirect to login (or home for now since login doesn't exist)
            // In a real app, we might redirect to login with a success message
            navigate('/?registered=true');
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
            setApiError(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome Completo */}
            <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Nome Completo
                </label>
                <input
                    {...register('fullName')}
                    type="text"
                    placeholder="João Silva"
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.fullName ? 'border-red-500' : 'border-slate-700'}`}
                />
                {errors.fullName && (
                    <p className="text-red-400 text-sm mt-1">{errors.fullName.message}</p>
                )}
            </div>

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

            {/* Confirmar Senha */}
            <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Confirmar Senha
                </label>
                <div className="relative">
                    <input
                        {...register('confirmPassword')}
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="••••••••"
                        className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.confirmPassword ? 'border-red-500' : 'border-slate-700'}`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-slate-400 hover:text-slate-300"
                    >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
            </div>

            {/* Data de Nascimento */}
            <div>
                <label className="block text-sm font-medium text-slate-200 mb-2">
                    Data de Nascimento
                </label>
                <input
                    {...register('birthDate')}
                    type="date"
                    className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all ${errors.birthDate ? 'border-red-500' : 'border-slate-700'}`}
                />
                {errors.birthDate && (
                    <p className="text-red-400 text-sm mt-1">{errors.birthDate.message}</p>
                )}
            </div>

            {/* Aceitar Termos */}
            <div className="flex items-start">
                <input
                    {...register('acceptTerms')}
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-slate-700 bg-slate-800 text-indigo-600 focus:ring-indigo-500"
                />
                <label className="ml-2 text-sm text-slate-300">
                    Li e aceito os{' '}
                    <a href="#" className="text-indigo-400 hover:text-indigo-300">
                        Termos de Uso
                    </a>{' '}
                    e{' '}
                    <a href="#" className="text-indigo-400 hover:text-indigo-300">
                        Política de Privacidade
                    </a>
                </label>
            </div>
            {errors.acceptTerms && (
                <p className="text-red-400 text-sm">{errors.acceptTerms.message}</p>
            )}

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
                        <span>Criando conta...</span>
                    </div>
                ) : (
                    'Criar Conta'
                )}
            </button>

            {/* Link para Login */}
            <p className="text-center text-slate-400 text-sm">
                Já tem uma conta?{' '}
                <Link to="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">
                    Faça login
                </Link>
            </p>
        </form>
    );
};

export default RegisterForm;
