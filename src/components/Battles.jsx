import React from 'react';
import { motion } from 'framer-motion';
import { Swords, Trophy, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Battles = () => {
    return (
        <section className="py-24 bg-slate-900 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px]" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto bg-slate-800/50 backdrop-blur-xl rounded-3xl border border-slate-700 p-8 md:p-12 text-center overflow-hidden relative">

                    <div className="absolute top-0 right-0 p-4">
                        <span className="px-3 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                            Em Breve
                        </span>
                    </div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        className="w-20 h-20 bg-indigo-600 rounded-2xl mx-auto flex items-center justify-center mb-6 shadow-lg shadow-indigo-500/30"
                    >
                        <Swords className="w-10 h-10 text-white" />
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Batalhas Épicas</h2>
                    <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto">
                        Prepare seus personagens para o combate. Em breve você poderá desafiar amigos,
                        enfrentar chefes mundiais e conquistar recompensas lendárias.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <Users className="w-8 h-8 text-indigo-400 mx-auto mb-3" />
                            <h3 className="font-bold mb-1">PvP Arena</h3>
                            <p className="text-sm text-slate-500">Desafie outros jogadores</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <Swords className="w-8 h-8 text-red-400 mx-auto mb-3" />
                            <h3 className="font-bold mb-1">Raids & Bosses</h3>
                            <p className="text-sm text-slate-500">Combate cooperativo PvE</p>
                        </div>
                        <div className="p-6 bg-slate-900/50 rounded-xl border border-slate-700/50">
                            <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                            <h3 className="font-bold mb-1">Rankings</h3>
                            <p className="text-sm text-slate-500">Suba no leaderboard</p>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <Link
                            to="/register"
                            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-indigo-500/20"
                        >
                            Entrar na Lista de Espera
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Battles;
