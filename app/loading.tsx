import Image from 'next/image'

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative flex flex-col items-center gap-5">
        {/* Logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
          <div className="relative w-14 h-14 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-sm flex items-center justify-center shadow-xl">
            <Image src="/logo.svg" alt="NovaTec" width={36} height={36} />
          </div>
        </div>

        {/* Spinner ring */}
        <div className="relative w-10 h-10">
          <div className="absolute inset-0 rounded-full border-2 border-border/30" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>

        {/* Dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-primary/60 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>

        <p className="text-xs text-muted-foreground/50 tracking-widest uppercase">Cargando</p>
      </div>
    </div>
  )
}
