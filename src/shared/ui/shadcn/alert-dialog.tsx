import * as React from 'react';
import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

import { buttonVariants } from '@/shared/ui/shadcn/button';
import { cn } from '@/shared/lib/utils';

function AlertDialog(props: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
    return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogContent({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
    return (
        <AlertDialogPrimitive.Portal>
            <AlertDialogPrimitive.Overlay className="fixed inset-0 z-50 bg-foreground/20" />
            <AlertDialogPrimitive.Content
                className={cn(
                    'fixed top-1/2 left-1/2 z-50 grid w-full max-w-sm -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border bg-popover p-5 shadow-xl',
                    className,
                )}
                data-slot="alert-dialog-content"
                {...props}
            />
        </AlertDialogPrimitive.Portal>
    );
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('space-y-2', className)} data-slot="alert-dialog-header" {...props} />;
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground [&_svg]:size-5',
                className,
            )}
            data-slot="alert-dialog-media"
            {...props}
        />
    );
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
    return <div className={cn('flex justify-end gap-2', className)} data-slot="alert-dialog-footer" {...props} />;
}

function AlertDialogTitle({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
    return (
        <AlertDialogPrimitive.Title
            className={cn('text-base font-semibold', className)}
            data-slot="alert-dialog-title"
            {...props}
        />
    );
}

function AlertDialogDescription({
    className,
    ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
    return (
        <AlertDialogPrimitive.Description
            className={cn('text-sm text-muted-foreground', className)}
            data-slot="alert-dialog-description"
            {...props}
        />
    );
}

function AlertDialogAction({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
    return (
        <AlertDialogPrimitive.Action
            className={cn(buttonVariants(), className)}
            data-slot="alert-dialog-action"
            {...props}
        />
    );
}

function AlertDialogCancel({ className, ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
    return (
        <AlertDialogPrimitive.Cancel
            className={cn(buttonVariants({ variant: 'outline' }), className)}
            data-slot="alert-dialog-cancel"
            {...props}
        />
    );
}

export {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogMedia,
    AlertDialogTitle,
};
