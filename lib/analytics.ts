import { createClientSupabaseClient } from './supabase'

export async function trackEvent(eventType: string, eventData: any = {}) {
  const supabase = createClientSupabaseClient()
  
  try {
    await supabase
      .from('admin_analytics')
      .insert({
        event_type: eventType,
        event_data: {
          ...eventData,
          timestamp: new Date().toISOString(),
          url: window.location.href,
          userAgent: navigator.userAgent
        }
      })
  } catch (error) {
    console.error('Analytics tracking error:', error)
  }
}

export async function trackWhatsAppClick(serviceName?: string) {
  await trackEvent('whatsapp_click', {
    service: serviceName,
    action: 'booking_attempt'
  })
}

export async function trackPageView(page: string) {
  await trackEvent('page_view', {
    page,
    referrer: document.referrer
  })
}