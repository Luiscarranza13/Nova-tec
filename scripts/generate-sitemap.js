/**
 * Script para generar sitemap.xml optimizado
 * Ejecutar: node scripts/generate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://www.novatec.ink';
const NOW = new Date().toISOString();

// Páginas estáticas con prioridad y frecuencia
const pages = [
  { url: '', priority: 1.0, changefreq: 'weekly', lastmod: NOW },
  { url: '/servicios', priority: 0.9, changefreq: 'monthly', lastmod: NOW },
  { url: '/contacto', priority: 0.9, changefreq: 'monthly', lastmod: NOW },
  { url: '/planes', priority: 0.8, changefreq: 'monthly', lastmod: NOW },
  { url: '/portafolio', priority: 0.8, changefreq: 'weekly', lastmod: NOW },
  { url: '/nosotros', priority: 0.7, changefreq: 'monthly', lastmod: NOW },
  { url: '/testimonios', priority: 0.7, changefreq: 'monthly', lastmod: NOW },
  { url: '/blog', priority: 0.8, changefreq: 'weekly', lastmod: NOW },
  { url: '/terminos', priority: 0.3, changefreq: 'yearly', lastmod: NOW },
  { url: '/politicas', priority: 0.3, changefreq: 'yearly', lastmod: NOW },
];

// Servicios
const services = [
  'desarrollo-web',
  'aplicaciones-moviles',
  'software-a-medida',
  'diseno-ui-ux',
  'soluciones-cloud',
  'consultoria-tecnologica',
];

services.forEach(service => {
  pages.push({
    url: `/servicios/${service}`,
    priority: 0.7,
    changefreq: 'monthly',
    lastmod: NOW,
  });
});

// Generar XML
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n';
xml += '        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"\n';
xml += '        xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
xml += '        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"\n';
xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"\n';
xml += '        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">\n';

pages.forEach(page => {
  xml += '  <url>\n';
  xml += `    <loc>${SITE_URL}${page.url}</loc>\n`;
  xml += `    <lastmod>${page.lastmod}</lastmod>\n`;
  xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
  xml += `    <priority>${page.priority}</priority>\n`;
  xml += '  </url>\n';
});

xml += '</urlset>';

// Guardar archivo
const outputPath = path.join(__dirname, '..', 'public', 'sitemap-static.xml');
fs.writeFileSync(outputPath, xml, 'utf8');

console.log('✅ Sitemap generado exitosamente en:', outputPath);
console.log(`📊 Total de URLs: ${pages.length}`);
console.log('🔗 URL del sitemap:', `${SITE_URL}/sitemap.xml`);
