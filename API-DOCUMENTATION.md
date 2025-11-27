# 📚 ChronoTask API - Documentação para Frontend

## 🌐 Base URL

```
http://localhost:3004/api/v1
```

**Produção**: `https://seu-dominio.com/api/v1`

---

## 🔐 Autenticação

A API usa **JWT (JSON Web Tokens)** para autenticação. Após o login, você recebe dois tokens:

- **Access Token**: Token de curta duração (15 minutos) para requisições autenticadas
- **Refresh Token**: Token de longa duração (7 dias) para renovar o access token

### Headers de Autenticação

Para rotas protegidas, inclua o header:

```javascript
Authorization: Bearer {access_token}
```

---

## 📋 Endpoints

### 1. Health Check

Verifica se a API está funcionando.

**Endpoint**: `GET /health`
**Autenticação**: Não requerida

**Resposta (200 OK)**:
```json
{
  "status": "ok"
}
```

**Exemplo (JavaScript/Fetch)**:
```javascript
const response = await fetch('http://localhost:3004/health');
const data = await response.json();
console.log(data); // { status: "ok" }
```

---

### 2. Criar Usuário (Registro)

Cria uma nova conta de usuário.

**Endpoint**: `POST /api/v1/user`
**Autenticação**: Não requerida

**Body (JSON)**:
```json
{
  "fullName": "João Silva",
  "email": "joao@example.com",
  "password": "senha123",
  "birthDate": "1990-01-15",
  "acceptTerms": true
}
```

**Validações**:
- `fullName`: mínimo 2 caracteres, máximo 100
- `email`: formato válido de email
- `password`: mínimo 6 caracteres
- `birthDate`: formato YYYY-MM-DD, usuário deve ter pelo menos 13 anos
- `acceptTerms`: deve ser `true`

**Resposta (201 Created)**:
```json
{
  "id": "uuid-do-usuario",
  "fullName": "João Silva",
  "email": "joao@example.com",
  "birthDate": "1990-01-15",
  "createdAt": "2025-11-26T10:30:00Z"
}
```

**Erros**:
```json
// 400 Bad Request
{
  "error": "validation_error",
  "message": "email already exists"
}

// 400 Bad Request
{
  "error": "validation_error",
  "message": "user must be at least 13 years old"
}
```

**Exemplo (React/Axios)**:
```javascript
import axios from 'axios';

const createUser = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3004/api/v1/user', {
      fullName: userData.fullName,
      email: userData.email,
      password: userData.password,
      birthDate: userData.birthDate, // "1990-01-15"
      acceptTerms: true
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao criar usuário:', error.response.data);
    throw error;
  }
};
```

---

### 3. Login

Autentica um usuário e retorna tokens JWT.

**Endpoint**: `POST /api/v1/login`
**Autenticação**: Não requerida

**Body (JSON)**:
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta (200 OK)**:
```json
{
  "userId": "uuid-do-usuario",
  "email": "joao@example.com",
  "fullName": "João Silva",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros**:
```json
// 401 Unauthorized
{
  "error": "authentication_failed",
  "message": "invalid email or password"
}
```

**Exemplo (React/Axios)**:
```javascript
const login = async (email, password) => {
  try {
    const response = await axios.post('http://localhost:3004/api/v1/login', {
      email,
      password
    });

    // Salvar tokens no localStorage
    localStorage.setItem('accessToken', response.data.accessToken);
    localStorage.setItem('refreshToken', response.data.refreshToken);
    localStorage.setItem('userId', response.data.userId);

    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error.response.data);
    throw error;
  }
};
```

---

### 4. Criar Personagem

Cria um novo personagem para o usuário autenticado.

**Endpoint**: `POST /api/v1/character`
**Autenticação**: **Requerida** (Bearer Token)

**Body (JSON)**:
```json
{
  "name": "Guerreiro Lendário"
}
```

**Validações**:
- `name`: mínimo 2 caracteres, máximo 50

**Resposta (201 Created)**:
```json
{
  "id": "uuid-do-personagem",
  "name": "Guerreiro Lendário",
  "level": 1,
  "currentXp": 0,
  "totalXp": 0,
  "userId": "uuid-do-usuario",
  "createdAt": "2025-11-26T10:35:00Z"
}
```

**Erros**:
```json
// 401 Unauthorized
{
  "error": "unauthorized",
  "message": "missing or invalid token"
}

// 400 Bad Request
{
  "error": "validation_error",
  "message": "character name must be between 2 and 50 characters"
}
```

**Exemplo (React/Axios)**:
```javascript
const createCharacter = async (characterName) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.post(
      'http://localhost:3004/api/v1/character',
      { name: characterName },
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      // Token expirado, redirecionar para login
      window.location.href = '/login';
    }
    console.error('Erro ao criar personagem:', error.response.data);
    throw error;
  }
};
```

---

### 5. Listar Personagens do Usuário

Lista todos os personagens do usuário autenticado.

**Endpoint**: `GET /api/v1/user/character`
**Autenticação**: **Requerida** (Bearer Token)

**Resposta (200 OK)**:
```json
{
  "characters": [
    {
      "id": "uuid-personagem-1",
      "name": "Guerreiro Lendário",
      "level": 5,
      "currentXp": 120,
      "totalXp": 620,
      "createdAt": "2025-11-26T10:35:00Z"
    },
    {
      "id": "uuid-personagem-2",
      "name": "Mago Sábio",
      "level": 3,
      "currentXp": 50,
      "totalXp": 250,
      "createdAt": "2025-11-25T15:20:00Z"
    }
  ]
}
```

**Nota**: Os personagens são ordenados por data de criação (mais recentes primeiro).

**Exemplo (React/Axios)**:
```javascript
const getUserCharacters = async () => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      'http://localhost:3004/api/v1/user/character',
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.characters;
  } catch (error) {
    console.error('Erro ao listar personagens:', error.response.data);
    throw error;
  }
};
```

---

### 6. Listar Atributos do Personagem

Lista todos os atributos de um personagem específico.

**Endpoint**: `GET /api/v1/character/:characterId/attribute`
**Autenticação**: **Requerida** (Bearer Token)

**Path Parameters**:
- `characterId`: UUID do personagem

**Resposta (200 OK)**:
```json
{
  "characterId": "uuid-do-personagem",
  "attributes": [
    {
      "id": "uuid-atributo-1",
      "attributeName": "Força",
      "value": 10
    },
    {
      "id": "uuid-atributo-2",
      "attributeName": "Inteligência",
      "value": 8
    },
    {
      "id": "uuid-atributo-3",
      "attributeName": "Destreza",
      "value": 12
    }
  ]
}
```

**Erros**:
```json
// 404 Not Found
{
  "error": "character_not_found",
  "message": "character not found or unauthorized"
}
```

**Exemplo (React/Axios)**:
```javascript
const getCharacterAttributes = async (characterId) => {
  const token = localStorage.getItem('accessToken');

  try {
    const response = await axios.get(
      `http://localhost:3004/api/v1/character/${characterId}/attribute`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    return response.data.attributes;
  } catch (error) {
    console.error('Erro ao buscar atributos:', error.response.data);
    throw error;
  }
};
```

---

## 🛠️ Configuração do Axios (Recomendado)

Crie um arquivo `api.js` para centralizar a configuração:

```javascript
// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004/api/v1',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expirado, limpar storage e redirecionar
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userId');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

**Usando o API configurado**:

```javascript
// src/services/userService.js
import api from './api';

export const createUser = async (userData) => {
  const response = await api.post('/user', userData);
  return response.data;
};

export const login = async (email, password) => {
  const response = await api.post('/login', { email, password });
  // Salvar tokens
  localStorage.setItem('accessToken', response.data.accessToken);
  localStorage.setItem('refreshToken', response.data.refreshToken);
  return response.data;
};

export const getUserCharacters = async () => {
  const response = await api.get('/user/character');
  return response.data.characters;
};

export const createCharacter = async (name) => {
  const response = await api.post('/character', { name });
  return response.data;
};

export const getCharacterAttributes = async (characterId) => {
  const response = await api.get(`/character/${characterId}/attribute`);
  return response.data.attributes;
};
```

---

## 🎯 Exemplo Completo: Hook React

```javascript
// src/hooks/useAuth.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userId');

    if (token && userId) {
      setUser({ id: userId });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', { email, password });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);
      localStorage.setItem('userId', response.data.userId);

      setUser({
        id: response.data.userId,
        email: response.data.email,
        fullName: response.data.fullName
      });

      return response.data;
    } catch (error) {
      console.error('Login failed:', error.response?.data);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userId');
    setUser(null);
  };

  const register = async (userData) => {
    try {
      const response = await api.post('/user', userData);
      return response.data;
    } catch (error) {
      console.error('Registration failed:', error.response?.data);
      throw error;
    }
  };

  return {
    user,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    register
  };
};
```

**Usando o hook**:

```javascript
// src/components/LoginForm.jsx
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      // Redirecionar para dashboard
      window.location.href = '/dashboard';
    } catch (err) {
      setError('Email ou senha inválidos');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Senha"
        required
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit">Entrar</button>
    </form>
  );
};

export default LoginForm;
```

---

## 📝 Tipos TypeScript (Opcional)

```typescript
// src/types/api.ts

export interface User {
  id: string;
  fullName: string;
  email: string;
  birthDate: string;
  createdAt: string;
}

export interface LoginResponse {
  userId: string;
  email: string;
  fullName: string;
  accessToken: string;
  refreshToken: string;
}

export interface Character {
  id: string;
  name: string;
  level: number;
  currentXp: number;
  totalXp: number;
  userId?: string;
  createdAt: string;
}

export interface CharacterAttribute {
  id: string;
  attributeName: string;
  value: number;
}

export interface CreateUserRequest {
  fullName: string;
  email: string;
  password: string;
  birthDate: string;
  acceptTerms: boolean;
}

export interface CreateCharacterRequest {
  name: string;
}

export interface ApiError {
  error: string;
  message: string;
}
```

---

## ⚠️ Tratamento de Erros

### Códigos de Status HTTP

| Código | Significado | Ação Recomendada |
|--------|-------------|------------------|
| 200 | OK | Sucesso |
| 201 | Created | Recurso criado com sucesso |
| 400 | Bad Request | Validar dados enviados |
| 401 | Unauthorized | Redirecionar para login |
| 404 | Not Found | Recurso não encontrado |
| 500 | Internal Server Error | Mostrar erro genérico ao usuário |

### Exemplo de Tratamento Global

```javascript
// src/utils/errorHandler.js

export const handleApiError = (error) => {
  if (!error.response) {
    return 'Erro de conexão. Verifique sua internet.';
  }

  switch (error.response.status) {
    case 400:
      return error.response.data.message || 'Dados inválidos';
    case 401:
      return 'Sessão expirada. Faça login novamente.';
    case 404:
      return 'Recurso não encontrado';
    case 500:
      return 'Erro no servidor. Tente novamente mais tarde.';
    default:
      return 'Ocorreu um erro inesperado';
  }
};
```

---

## 🔄 CORS

Se você encontrar erros de CORS durante o desenvolvimento, certifique-se de que a API está configurada para aceitar requisições do seu frontend.

**Solução temporária (desenvolvimento)**:
```javascript
// Usar proxy no package.json do React
{
  "proxy": "http://localhost:3004"
}
```

---

## 📌 Checklist de Integração

- [ ] Instalar axios: `npm install axios`
- [ ] Criar arquivo `api.js` com configuração base
- [ ] Configurar interceptors para token
- [ ] Implementar serviços de autenticação (login, registro)
- [ ] Implementar serviços de personagens
- [ ] Criar hook `useAuth` para gerenciar autenticação
- [ ] Adicionar tratamento de erros global
- [ ] Testar todas as rotas da API
- [ ] Implementar logout e limpeza de tokens
- [ ] Adicionar loading states nos componentes

---

## 🚀 Próximos Passos

1. Testar todos os endpoints usando Postman ou Insomnia
2. Implementar refresh token automático
3. Adicionar validações client-side antes de enviar requisições
4. Implementar cache de dados para melhor performance
5. Adicionar testes unitários para os serviços

---

## 📞 Suporte

Em caso de dúvidas ou problemas:
1. Verificar os logs da API
2. Verificar o console do navegador
3. Confirmar que o backend está rodando em `http://localhost:3004`
4. Verificar se os tokens estão sendo salvos corretamente no localStorage
