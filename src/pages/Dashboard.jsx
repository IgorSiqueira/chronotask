import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import DashboardNavbar from '../components/DashboardNavbar';
import ProtectedRoute from '../components/ProtectedRoute';

const Dashboard = () => {
    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('userEmail');
        if (email) {
            setUserEmail(email);
        }
    }, []);

    return (
        <ProtectedRoute>
            <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-slate-950">
                <DashboardNavbar />

                <main className="max-w-4xl mx-auto px-4 py-12">
                    {/* Card Principal - Whitelist */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8 mb-8"
                    >
                        {/* Badge Early Access */}
                        <div className="flex justify-center mb-6">
                            <span className="px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-sm font-bold rounded-full shadow-lg">
                                🌟 EARLY ACCESS
                            </span>
                        </div>

                        {/* Título */}
                        <h1 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
                            🎉 Você está na Whitelist!
                        </h1>

                        {/* Ícone de Construção */}
                        <div className="flex justify-center my-8">
                            <div className="text-8xl">🚧</div>
                        </div>

                        {/* Mensagem Principal */}
                        <p className="text-xl text-slate-300 text-center mb-8">
                            O ChronoTask está em desenvolvimento ativo
                        </p>

                        <p className="text-slate-400 text-center mb-8 max-w-2xl mx-auto">
                            Estamos trabalhando duro para trazer a melhor experiência de gamificação
                            de hábitos para você! Como membro da whitelist, você terá acesso
                            antecipado assim que lançarmos as primeiras features.
                        </p>

                        {/* Features em Desenvolvimento */}
                        <div className="bg-slate-900/50 rounded-xl p-6 mb-8">
                            <h2 className="text-lg font-semibold text-white mb-4 text-center">
                                📋 Features em Desenvolvimento
                            </h2>
                            <div className="grid md:grid-cols-2 gap-3">
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Sistema de Hábitos Diários</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Evolução de Personagens</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Sistema de XP e Níveis</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Batalhas PvP e PvE</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Rankings e Conquistas</span>
                                </div>
                                <div className="flex items-center space-x-2 text-slate-300">
                                    <span className="text-green-400">✓</span>
                                    <span>Sistema de Recompensas</span>
                                </div>
                            </div>
                        </div>

                        {/* Garantia Early Access */}
                        <div className="bg-purple-900/20 border border-purple-500/50 rounded-xl p-4">
                            <p className="text-purple-300 text-center text-sm">
                                ⚡ <strong>Garantia Early Access:</strong> Você terá acesso antecipado
                                a todas as features assim que estiverem prontas!
                            </p>
                        </div>
                    </motion.div>

                    {/* Card Secundário - Atualizações */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-slate-800/50 backdrop-blur-xl border border-slate-700 rounded-2xl shadow-2xl p-8"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4 text-center">
                            📧 Mantenha-se Atualizado
                        </h2>

                        <p className="text-slate-400 text-center mb-6">
                            Enviaremos atualizações sobre o desenvolvimento para:
                        </p>

                        <div className="bg-slate-900/50 rounded-lg p-4 mb-6 text-center">
                            <p className="text-indigo-400 font-mono">{userEmail}</p>
                        </div>

                        {/* Botões de Social */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2">
                                <span>💬</span>
                                <span>Entrar no Discord</span>
                            </button>
                            <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center space-x-2">
                                <span>🐦</span>
                                <span>Seguir no Twitter</span>
                            </button>
                        </div>
                    </motion.div>

                    {/* Timeline */}
                    <div className="mt-12 text-center">
                        <p className="text-slate-500 text-sm">
                            Previsão de lançamento da versão Alpha: <strong className="text-slate-400">Q1 2026</strong>
                        </p>
                    </div>
                </main>
            </div>
        </ProtectedRoute>
    );
};

export default Dashboard;
