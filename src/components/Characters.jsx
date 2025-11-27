import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const characters = [
    {
        name: "Guerreiro",
        role: "Tank / DPS",
        level: 50,
        image: "🛡️",
        color: "from-orange-500 to-red-500",
        stats: { str: 90, int: 20, dex: 40 }
    },
    {
        name: "Mago",
        role: "Burst / Control",
        level: 50,
        image: "🧙‍♂️",
        color: "from-indigo-500 to-purple-500",
        stats: { str: 15, int: 95, dex: 40 }
    },
    {
        name: "Ladino",
        role: "Stealth / DPS",
        level: 50,
        image: "🥷",
        color: "from-emerald-500 to-teal-500",
        stats: { str: 40, int: 30, dex: 90 }
    }
];

const Characters = () => {
    return (
        <section className="py-24 bg-slate-900 relative">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Crie e Evolua Seu Herói</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Personalize seu personagem e veja-o evoluir conforme você conquista seus objetivos.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {characters.map((char, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-2"
                        >
                            {/* Background Gradient */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${char.color} opacity-10 group-hover:opacity-20 transition-opacity`} />

                            <div className="p-8 text-center relative z-10">
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {char.image}
                                </div>
                                <h3 className="text-2xl font-bold mb-1">{char.name}</h3>
                                <p className={`text-sm font-medium bg-gradient-to-r ${char.color} bg-clip-text text-transparent mb-6`}>
                                    {char.role}
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-8 text-left text-slate-400">STR</span>
                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-red-500 rounded-full" style={{ width: `${char.stats.str}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-8 text-left text-slate-400">INT</span>
                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${char.stats.int}%` }} />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="w-8 text-left text-slate-400">DEX</span>
                                        <div className="flex-1 h-2 bg-slate-700 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 rounded-full" style={{ width: `${char.stats.dex}%` }} />
                                        </div>
                                    </div>
                                </div>

                                <Link to="/register" className="mt-8 block w-full py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white font-medium transition-colors">
                                    Escolher Classe
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Characters;
