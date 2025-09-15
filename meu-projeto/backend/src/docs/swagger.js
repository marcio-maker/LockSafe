// src/utils/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'LockSafe API',
      version: '1.0.0',
      description: 'API para sistema de autenticação e gerenciamento de usuários LockSafe',
      contact: {
        name: 'Suporte LockSafe',
        email: 'suporte@locksafe.com'
      }
    },
    servers: [
      {
        url: process.env.NODE_ENV === 'production' 
          ? 'https://seu-dominio.com/api' 
          : `http://localhost:${process.env.PORT || 3001}/api`,
        description: process.env.NODE_ENV === 'production' ? 'Produção' : 'Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['nome', 'email', 'senha'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'ID único do usuário'
            },
            nome: {
              type: 'string',
              description: 'Nome completo do usuário',
              example: 'João Silva'
            },
            email: {
              type: 'string',
                  format: 'email',
              description: 'Email do usuário',
              example: 'joao@email.com'
            },
            senha: {
              type: 'string',
                  format: 'password',
              description: 'Senha do usuário (mínimo 6 caracteres)',
              example: 'senha123'
            },
            created_at: {
              type: 'string',
                  format: 'date-time',
              description: 'Data de criação do usuário'
            }
          }
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Usuário criado com sucesso'
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                nome: { type: 'string' },
                email: { type: 'string' }
              }
            },
            token: {
              type: 'string',
              description: 'JWT token para autenticação'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              example: 'Mensagem de erro'
            },
            errors: {
              type: 'array',
              items: { type: 'string' },
              example: ['Erro 1', 'Erro 2']
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints para registro e login de usuários'
      },
      {
        name: 'Usuários',
        description: 'Endpoints para gerenciamento de perfis de usuários'
      }
    ]
  },
  apis: [
    join(__dirname, '../routes/*.js'),
    join(__dirname, '../controllers/*.js')
  ]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;