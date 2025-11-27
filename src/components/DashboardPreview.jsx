import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const DashboardPreview = () => {
    const { scrollYProgress } = useScroll();
    const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Veja Seu Progresso em <span className="text-indigo-400">Tempo Real</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Acompanhe cada detalhe da sua jornada com um dashboard completo e intuitivo.
                    </p>
                </div>

                <motion.div
                    style={{ y }}
                    className="relative max-w-5xl mx-auto"
                >
                    {/* Main Dashboard Window */}
                    <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl overflow-hidden">
                        {/* Window Header */}
                        <div className="bg-slate-900 px-4 py-3 border-b border-slate-700 flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                        </div>

                        {/* Dashboard Content */}
                        <div className="p-6 grid grid-cols-12 gap-6">
                            {/* Sidebar */}
                            <div className="col-span-3 hidden md:block space-y-2">
                                <div className="p-3 bg-indigo-600/10 text-indigo-400 rounded-lg font-medium">Dashboard</div>
                                <div className="p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer">Personagens</div>
                                <div className="p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer">Missões</div>
                                <div className="p-3 text-slate-400 hover:bg-slate-700/50 rounded-lg cursor-pointer">Conquistas</div>
                            </div>

                            {/* Main Area */}
                            <div className="col-span-12 md:col-span-9 space-y-6">
                                {/* Stats Row */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        <p className="text-slate-400 text-sm">Nível Atual</p>
                                        <p className="text-2xl font-bold text-white">15</p>
                                        <div className="w-full h-1 bg-slate-800 rounded-full mt-2">
                                            <div className="w-[70%] h-full bg-indigo-500 rounded-full" />
                                        </div>
                                    </div>
                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        <p className="text-slate-400 text-sm">Streak</p>
                                        <p className="text-2xl font-bold text-orange-500">30 Dias 🔥</p>
                                    </div>
                                    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700">
                                        <p className="text-slate-400 text-sm">XP Hoje</p>
                                        <p className="text-2xl font-bold text-green-500">+120 XP</p>
                                    </div>
                                </div>

                                {/* Tasks List */}
                                <div className="bg-slate-900 rounded-xl border border-slate-700 p-4">
                                    <h4 className="font-bold mb-4">Missões Diárias</h4>
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50">
                                                <div className={`w-5 h-5 rounded border-2 ${i === 1 ? 'bg-indigo-500 border-indigo-500' : 'border-slate-600'}`} />
                                                <div className="flex-1">
                                                    <div className="h-2 w-32 bg-slate-700 rounded mb-1" />
                                                    <div className="h-2 w-20 bg-slate-800 rounded" />
                                                </div>
                                                <div className="text-xs text-slate-500 font-mono">+50XP</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating Elements */}
                    <motion.div
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute -right-12 top-20 hidden lg:block"
                    >
                        <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-xl">
                            <div className="text-sm text-slate-400 mb-1">Atributos</div>
                            <div className="space-y-2 w-32">
                                <div className="flex justify-between text-xs">
                                    <span>Força</span>
                                    <span className="text-red-400">45</span>
                                </div>
                                <div className="w-full h-1 bg-slate-700 rounded-full">
                                    <div className="w-[45%] h-full bg-red-500 rounded-full" />
                                </div>
                                <div className="flex justify-between text-xs">
                                    <span>Inteligência</span>
                                    <span className="text-blue-400">38</span>
                                </div>
                                <div className="w-full h-1 bg-slate-700 rounded-full">
                                    <div className="w-[38%] h-full bg-blue-500 rounded-full" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default DashboardPreview;
