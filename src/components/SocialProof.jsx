import React from 'react';
import { motion } from 'framer-motion';

const stats = [
    { value: "1.2K+", label: "Heróis Criados" },
    { value: "50K+", label: "Hábitos Completados" },
    { value: "15K+", label: "Níveis Ganhos" }
];

const SocialProof = () => {
    return (
        <section className="py-24 bg-slate-900 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                        >
                            <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-indigo-400 font-medium">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center">
                    <h2 className="text-3xl font-bold mb-12">O que dizem nossos heróis</h2>
                    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-left">
                            <p className="text-slate-300 mb-6 italic">"Nunca pensei que ia conseguir manter uma rotina de exercícios. Com o ChronoTask, meu personagem já está level 20 e eu perdi 5kg!"</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-700 rounded-full" />
                                <div>
                                    <p className="font-bold text-white">João Silva</p>
                                    <p className="text-sm text-indigo-400">Guerreiro Lvl 20</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 text-left">
                            <p className="text-slate-300 mb-6 italic">"A gamificação transformou minha produtividade no trabalho. Agora cada tarefa concluída é uma vitória épica."</p>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-700 rounded-full" />
                                <div>
                                    <p className="font-bold text-white">Maria Santos</p>
                                    <p className="text-sm text-indigo-400">Maga Lvl 18</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SocialProof;
