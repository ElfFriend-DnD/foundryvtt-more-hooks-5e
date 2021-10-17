/**
 * Returns an options object which will survive a socket
 * - Preserves modifier keys on events
 * @param {*} options 
 */
export function prepareOptions(options) {
  if (!options) {
    return options;
  }

  if (options.event) {
    const cleanedEvent = {
      ...options.event,
      altKey: options.event.altKey,
      ctrlKey: options.event.ctrlKey,
      metaKey: options.event.metaKey,
      shiftKey: options.event.shiftKey,
      clientX: options.event.clientX,
      clientY: options.event.clientY,
    }

    return { ...options, event: cleanedEvent }
  }

  return options;
}