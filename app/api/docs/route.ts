import { NextResponse } from 'next/server'

// OpenAPI / Swagger spec for NovaTec public API
const spec = {
  openapi: '3.0.0',
  info: {
    title: 'NovaTec API',
    version: '1.0.0',
    description: 'API pública de NovaTec para integraciones externas.',
    contact: { name: 'NovaTec', email: 'NovaTec.Empresarial@gmail.com', url: 'https://novatec.pe' },
  },
  servers: [{ url: process.env.NEXT_PUBLIC_SITE_URL || 'https://novatec.pe', description: 'Producción' }],
  paths: {
    '/api/contact': {
      post: {
        summary: 'Enviar mensaje de contacto',
        tags: ['Contacto'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['nombre', 'email', 'mensaje'],
                properties: {
                  nombre:  { type: 'string', minLength: 2, maxLength: 100 },
                  email:   { type: 'string', format: 'email' },
                  asunto:  { type: 'string', maxLength: 200 },
                  mensaje: { type: 'string', minLength: 10, maxLength: 2000 },
                },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Mensaje enviado correctamente' },
          '422': { description: 'Datos inválidos' },
          '429': { description: 'Demasiadas solicitudes' },
        },
      },
    },
    '/api/newsletter': {
      post: {
        summary: 'Suscribirse al newsletter',
        tags: ['Newsletter'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email'],
                properties: { email: { type: 'string', format: 'email' } },
              },
            },
          },
        },
        responses: {
          '200': { description: 'Suscripción exitosa' },
          '422': { description: 'Email inválido' },
          '429': { description: 'Demasiadas solicitudes' },
        },
      },
    },
    '/api/analytics': {
      get: {
        summary: 'Obtener estadísticas de visitas',
        tags: ['Analytics'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'days', in: 'query', schema: { type: 'integer', default: 30 }, description: 'Días a consultar' },
        ],
        responses: {
          '200': {
            description: 'Estadísticas de visitas',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    totalViews: { type: 'integer' },
                    topPages:   { type: 'array', items: { type: 'object', properties: { path: { type: 'string' }, count: { type: 'integer' } } } },
                    dailyViews: { type: 'array', items: { type: 'object', properties: { date: { type: 'string' }, count: { type: 'integer' } } } },
                  },
                },
              },
            },
          },
        },
      },
    },
    '/api/admin/export': {
      get: {
        summary: 'Exportar datos de una tabla',
        tags: ['Admin'],
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'table',  in: 'query', required: true, schema: { type: 'string', enum: ['clientes', 'proyectos', 'cotizaciones', 'mensajes', 'testimonios'] } },
          { name: 'format', in: 'query', schema: { type: 'string', enum: ['csv', 'json'], default: 'csv' } },
        ],
        responses: {
          '200': { description: 'Archivo exportado' },
          '400': { description: 'Tabla no permitida' },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
    },
  },
}

export async function GET() {
  return NextResponse.json(spec, {
    headers: { 'Access-Control-Allow-Origin': '*' },
  })
}
