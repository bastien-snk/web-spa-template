import { CircleCheck, CircleX, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import { cn } from '@/shared/lib/utils';
import { Button } from '@/shared/ui/shadcn/button';

export type NotificationToastContentProps = {
    description?: string;
    onDismiss: () => void;
    title: string;
    variant: 'error' | 'success';
};

export function NotificationToastContent(props: NotificationToastContentProps) {
    const i18n = useTranslation();
    const Icon = props.variant === 'success' ? CircleCheck : CircleX;

    return (
        <div
            className="flex w-[22rem] items-start gap-3 rounded-lg border bg-popover p-4 text-popover-foreground shadow-lg"
            role={props.variant === 'error' ? 'alert' : 'status'}
        >
            <span
                className={cn(
                    'flex size-8 shrink-0 items-center justify-center rounded-full',
                    props.variant === 'success'
                        ? 'bg-emerald-500/15 text-emerald-600'
                        : 'bg-destructive/15 text-destructive',
                )}
            >
                <Icon aria-hidden="true" className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{props.title}</p>
                {props.description ? <p className="mt-1 text-sm text-muted-foreground">{props.description}</p> : null}
            </div>
            <Button className="-mr-2 -mt-2 shrink-0" onClick={props.onDismiss} size="icon-sm" variant="ghost">
                <X aria-label={i18n.t('shared/toast:actions.dismiss')} />
            </Button>
        </div>
    );
}
