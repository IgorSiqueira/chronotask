import { z } from 'zod';

export const registerSchema = z.object({
    fullName: z.string()
        .min(2, 'Nome deve ter no mínimo 2 caracteres')
        .max(100, 'Nome deve ter no máximo 100 caracteres'),

    email: z.string()
        .email('Email inválido'),

    password: z.string()
        .min(6, 'Senha deve ter no mínimo 6 caracteres'),

    confirmPassword: z.string(),

    birthDate: z.string()
        .refine((date) => {
            const birthDate = new Date(date);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age >= 13;
        }, 'Você deve ter pelo menos 13 anos'),

    acceptTerms: z.boolean()
        .refine((val) => val === true, 'Você deve aceitar os termos')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword']
});
