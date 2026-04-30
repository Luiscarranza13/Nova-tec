import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/admin"];
const AUTH_ROUTES = ["/login", "/recuperar-password"];

// Rutas que nunca se redirigen a mantenimiento
const MAINTENANCE_BYPASS = [
  "/admin",
  "/login",
  "/recuperar-password",
  "/mantenimiento",
  "/registro",
];

// Headers de seguridad aplicados a todas las respuestas
function applySecurityHeaders(response: NextResponse) {
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("X-DNS-Prefetch-Control", "on");
  response.headers.set(
    "Content-Security-Policy",
    "frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  );
  return response;
}

// Cache del modo mantenimiento (30s) para no hacer query a Supabase en cada request
let maintCache: { value: boolean; exp: number } | null = null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function isMaintenanceMode(supabase: any): Promise<boolean> {
  if (maintCache && Date.now() < maintCache.exp) return maintCache.value
  try {
    const { data } = await supabase
      .from('configuracion')
      .select('valor')
      .eq('clave', 'modo_mantenimiento')
      .single()
    const value = data?.valor === 'true'
    maintCache = { value, exp: Date.now() + 30_000 }
    return value
  } catch {
    return false
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Sin variables de entorno → bloquea admin
  if (!supabaseUrl || !supabaseKey) {
    if (PROTECTED_ROUTES.some((r) => pathname.startsWith(r))) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return applySecurityHeaders(NextResponse.next());
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value),
        );
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options),
        );
      },
    },
  });

  // Verifica sesión de forma segura
  let user = null;
  let authError = null;
  try {
    const { data, error } = await supabase.auth.getUser();
    user = data.user;
    authError = error;
  } catch (e: any) {
    console.error("Supabase connection error in middleware:", e);
    authError = e;
  }

  // Fix 5: modo mantenimiento cacheado (30s) — evita query a Supabase en cada request
  const isBypassRoute = MAINTENANCE_BYPASS.some((r) => pathname.startsWith(r));
  if (!isBypassRoute) {
    const inMaintenance = await isMaintenanceMode(supabase)
    if (inMaintenance) {
      return applySecurityHeaders(
        NextResponse.redirect(new URL("/mantenimiento", request.url)),
      );
    }
  }

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthPage = AUTH_ROUTES.some((r) => pathname.startsWith(r));

  // Sin sesión → bloquea rutas protegidas
  if ((!user || authError) && isProtected) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return applySecurityHeaders(NextResponse.redirect(loginUrl));
  }

  // Con sesión → no puede volver a login
  if (user && isAuthPage) {
    return applySecurityHeaders(
      NextResponse.redirect(new URL("/admin", request.url)),
    );
  }

  // Con sesión en admin → verifica rol en BD (no en JWT)
  if (user && isProtected) {
    const { data: usuario, error: roleError } = await supabase
      .from("usuarios")
      .select("rol")
      .eq("id", user.id)
      .single();

    // Error de BD → deja pasar (fail-open para no bloquear al admin)
    if (roleError || !usuario) return applySecurityHeaders(response);

    // Solo rol 'admin' puede entrar
    if (usuario.rol !== "admin") {
      return applySecurityHeaders(
        NextResponse.redirect(new URL("/", request.url)),
      );
    }
  }

  return applySecurityHeaders(response);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2)).*)",
  ],
};
