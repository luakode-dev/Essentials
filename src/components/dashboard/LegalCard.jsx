export default function LegalCard() {
    return (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 relative overflow-hidden h-full md:col-span-2">

            <div className="relative z-10 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center size-8 rounded-lg bg-primary/10 text-primary">
                        <span className="material-symbols-outlined text-[20px]">grid_view</span>
                    </div>
                    <h2 className="text-sm font-bold tracking-widest text-[var(--color-text-main)] font-montserrat uppercase">Essentials</h2>
                </div>

                <p className="text-[10px] text-[var(--color-text-muted)] leading-relaxed uppercase font-medium tracking-wide max-w-[450px]">
                    Herramienta informativa independiente. Los datos mostrados son obtenidos de APIs públicas. No estamos afiliados, asociados ni respaldados por Riot Games, Epic Games ni entidades bancarias oficiales.
                </p>
            </div>

            <div className="relative z-10 pt-8 flex flex-wrap items-center justify-between gap-4">
                <div className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">
                    © 2025 Dashboard
                </div>

                <div className="flex gap-4 text-[9px] font-bold text-primary tracking-widest uppercase">
                    <a href="#" className="hover:underline transition-all">[ Privacidad ]</a>
                    <a href="#" className="hover:underline transition-all">[ Términos ]</a>
                </div>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/5 rounded-tl-full -mr-16 -mb-16 pointer-events-none"></div>
        </div>
    );
}
