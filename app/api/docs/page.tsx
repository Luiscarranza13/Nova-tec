import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'API Docs — NovaTec',
  description: 'Documentación de la API pública de NovaTec',
}

export default function ApiDocsPage() {
  const specUrl = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/docs`

  return (
    <html>
      <head>
        <title>NovaTec API Docs</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
      </head>
      <body style={{ margin: 0 }}>
        <div id="swagger-ui" />
        <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js" />
        <script dangerouslySetInnerHTML={{
          __html: `
            window.onload = () => {
              SwaggerUIBundle({
                url: '${specUrl}',
                dom_id: '#swagger-ui',
                presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
                layout: 'BaseLayout',
                deepLinking: true,
              })
            }
          `,
        }} />
      </body>
    </html>
  )
}
