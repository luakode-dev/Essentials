export default function AddNew() {
    return (
        <div className="rounded-3xl bg-[var(--color-surface)] border-2 border-dashed border-[var(--color-border)] flex flex-col items-center justify-center gap-4 text-gray-400 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/5 hover:border-primary/30 transition-all group h-full min-h-[200px] duration-300">
            <div className="size-12 rounded-full bg-[var(--color-background)] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined">question_mark</span>
            </div>
            <div className="flex flex-col items-center gap-1">
                <span className="text-xs font-bold uppercase tracking-wider text-center px-2 font-montserrat text-[var(--color-text-muted)]">Próximamente</span>
                <span className="text-[10px] text-[var(--color-text-muted)]/70 font-medium lowercase">a petición de pinchiri</span>
            </div>
        </div>
    );
}
