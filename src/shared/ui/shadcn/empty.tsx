import type { ComponentProps } from 'react';

import { cn } from '@/shared/lib/utils';

function Empty({ className, ...props }: ComponentProps<'section'>) {
    return (
        <section
            className={cn(
                'flex min-h-72 flex-col items-center justify-center rounded-lg border border-dashed bg-card px-6 text-center',
                className,
            )}
            data-slot="empty"
            {...props}
        />
    );
}

function EmptyIcon({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('text-muted-foreground', className)} data-slot="empty-icon" {...props} />;
}

function EmptyTitle({ className, ...props }: ComponentProps<'h2'>) {
    return <h2 className={cn('mt-3 text-sm font-medium', className)} data-slot="empty-title" {...props} />;
}

function EmptyDescription({ className, ...props }: ComponentProps<'p'>) {
    return (
        <p
            className={cn('mt-1 max-w-sm text-sm text-muted-foreground', className)}
            data-slot="empty-description"
            {...props}
        />
    );
}

export { Empty, EmptyDescription, EmptyIcon, EmptyTitle };
