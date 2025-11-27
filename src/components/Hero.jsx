import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-900" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6"
                        >
                            <Sparkles className="w-4 h-4" />
                            <span>Gamifique sua vida agora</span>
                        </motion.div>

                        <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
                            Transforme Seus <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient">
                                Hábitos em Poder
                            </span>
                        </h1>

                        <p className="text-xl text-slate-400 mb-8 max-w-lg">
                            Complete tarefas da vida real, evolua seu personagem e batalhe contra outros jogadores.
                            Sua rotina nunca mais será a mesma.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/register" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-2">
                                Começar Grátis
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="#how-it-works" className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-bold text-lg transition-all hover:scale-105 border border-slate-700 flex items-center justify-center">
                                Ver Como Funciona
                            </a>
                        </div>
                        <div className="mt-12 flex items-center gap-4 text-sm text-slate-500">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-700 border-2 border-slate-900" />
                                ))}
                            </div>
                            <p>Junte-se a <span className="text-white font-bold">1.2K+</span> heróis</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative z-10 bg-slate-800/50 backdrop-blur-xl rounded-2xl border border-slate-700 p-6 shadow-2xl">
                            {/* Mockup Content */}
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-indigo-600 rounded-xl flex items-center justify-center text-2xl">🧙‍♂️</div>
                                    <div>
                                        <h3 className="font-bold text-xl">Mago Supremo</h3>
                                        <p className="text-indigo-400">Nível 15</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-slate-400">XP Total</p>
                                    <p className="font-bold text-xl">12,450</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-green-500 bg-green-500/20 flex items-center justify-center text-green-500 text-xs">✓</div>
                                    <div className="flex-1">
                                        <p className="font-medium">Ler 30 páginas</p>
                                        <p className="text-xs text-slate-500">+50 XP • Inteligência</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center"></div>
                                    <div className="flex-1">
                                        <p className="font-medium">Treino de Força</p>
                                        <p className="text-xs text-slate-500">+100 XP • Força</p>
                                    </div>
                                </div>
                                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-700/50 flex items-center gap-4">
                                    <div className="w-6 h-6 rounded-full border-2 border-slate-600 flex items-center justify-center"></div>
                                    <div className="flex-1">
                                        <p className="font-medium">Beber 2L de água</p>
                                        <p className="text-xs text-slate-500">+20 XP • Vitalidade</p>
                                    </div>
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -top-6 -right-6 bg-yellow-500 text-yellow-950 px-4 py-2 rounded-lg font-bold shadow-lg rotate-12"
                            >
                                Level Up! 🎉
                            </motion.div>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl -z-10 rounded-3xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
