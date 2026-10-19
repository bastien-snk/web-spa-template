export abstract class EventSubscription {
    private isActive = false;

    subscribe(): void {
        if (this.isActive) return;

        this.onSubscribe();
        this.isActive = true;
    }

    unsubscribe(): void {
        if (!this.isActive) return;

        this.onUnsubscribe();
        this.isActive = false;
    }

    protected abstract onSubscribe(): void;
    protected abstract onUnsubscribe(): void;
}
