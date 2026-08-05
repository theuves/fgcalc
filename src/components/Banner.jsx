import React from 'react';

export default function Banner() {
    return (
        <section className="max-w-5xl mx-auto px-4 mt-4">
            <div className="bg-[var(--aws-surface)] border border-[var(--aws-border)] px-4 py-3 text-sm flex flex-col sm:flex-row sm:items-center justify-end sm:justify-end gap-2 sm:gap-4">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.12em]">
                    <a
                        href="https://github.com/theuves/fgcalc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--aws-ink)] hover:text-[var(--aws-accent)] border-b border-transparent hover:border-[var(--aws-accent)]"
                    >
                        Star on GitHub
                    </a>
                    <a
                        href="https://fidalgoitsolutions.com.br"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--aws-ink)] hover:text-[var(--aws-accent)] border-b border-transparent hover:border-[var(--aws-accent)]"
                    >
                        Fidalgo IT Solutions
                    </a>
                </div>
            </div>
        </section>
    );
}
