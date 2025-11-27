import React from 'react';
import { motion } from 'framer-motion';
import { CheckSquare, Zap, Swords } from 'lucide-react';

const steps = [
    {
        icon: <CheckSquare className="w-8 h-8 text-indigo-400" />,
        title: "1. Complete Tarefas",
        description: "Marque seus hábitos diários, semanais e objetivos. Cada conquista vale XP.",
        delay: 0
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-400" />,
        title: "2. Ganhe XP e Evolua",
        description: "Seu personagem sobe de nível automaticamente. Atributos aumentam a cada conquista.",
        delay: 0.2
    },
    {
        icon: <Swords className="w-8 h-8 text-red-400" />,
        title: "3. Batalhe e Domine",
        description: "Use seus personagens para batalhas PvP e PvE. Mostre quem é o mestre dos hábitos!",
        delay: 0.4
    }
];

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 bg-slate-900 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Como Funciona</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        Gamifique sua rotina em três passos simples e comece a ver progresso real na sua vida.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: step.delay }}
                            className="group p-8 rounded-2xl bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 transition-all hover:-translate-y-2"
                        >
                            <div className="w-16 h-16 rounded-2xl bg-slate-900 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;
