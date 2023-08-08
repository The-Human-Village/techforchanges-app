import mixpanel from 'mixpanel-browser'

export const trackMixpanelEvent = (eventName, eventData = {}) => {
  mixpanel.track(eventName, eventData)
}
