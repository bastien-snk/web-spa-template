import { createElement } from 'react';
import { toast } from 'sonner';

import {
    NotificationToastContent,
    type NotificationToastContentProps,
} from '@/shared/ui/app/toast/NotificationToastContent';

type ShowNotificationToastInput = Omit<NotificationToastContentProps, 'onDismiss'>;

export function showNotificationToast(input: ShowNotificationToastInput) {
    toast.custom((toastId) =>
        createElement(NotificationToastContent, { ...input, onDismiss: () => toast.dismiss(toastId) }),
    );
}
