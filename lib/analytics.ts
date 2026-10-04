export type EventName = 'free_trial_click' | 'free_trial_submit' | 'whatsapp_click' | 'call_click' | 'directions_click' | 'membership_click' | 'personal_training_click';
export function track(event: EventName, source: string) {
 if (typeof window === 'undefined') return;
 const w = window as Window & { dataLayer?: unknown[] };
 w.dataLayer?.push({ event, source });
 window.dispatchEvent(new CustomEvent('mny:conversion', { detail: { event, source } }));
}
