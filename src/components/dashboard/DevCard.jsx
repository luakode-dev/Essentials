export default function DevCard() {
    return (
        <div className="rounded-3xl bg-[var(--color-surface)] border border-[var(--color-border)] p-8 flex flex-col justify-between group transition-all hover:-translate-y-1 hover:shadow-xl duration-300 relative overflow-hidden h-full md:col-span-1">

            <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary text-[20px]">code</span>
                    <p className="text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-[0.2em]">Creador</p>
                </div>
                <h2 className="text-3xl font-bold text-[var(--color-text-main)] font-montserrat tracking-tight leading-none mb-1">
                    Doza
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] font-medium uppercase tracking-wider mt-2">FullStack Developer</p>
            </div>

            <div className="relative z-10 pt-8">
                <a
                    href="https://github.com/luakode-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[var(--color-background)] hover:bg-gray-100 dark:hover:bg-white/5 border border-[var(--color-border)] rounded-2xl px-4 py-3 transition-all group/btn"
                >
                    <div className="size-8 rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-main)]">
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[var(--color-text-muted)] font-bold uppercase tracking-wider">GitHub</span>
                        <span className="text-xs text-[var(--color-text-main)] font-semibold">@luakode-dev</span>
                    </div>
                    <span className="material-symbols-outlined ml-auto text-[var(--color-text-muted)] group-hover/btn:text-primary group-hover/btn:translate-x-1 transition-all">east</span>
                </a>
            </div>

            {/* Subtle background decoration */}
            <div className="absolute -bottom-6 -right-6 size-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors"></div>
        </div>
    );
}
