import { PAGE_CREATE, PAGE_LIBRARY, PAGE_MAIN, PAGE_REDACT } from './constants'

export function normalizePageHash() {
    const hash = window.location.hash.slice(1)
    if (Object.keys(PAGE_CREATE, PAGE_LIBRARY, PAGE_MAIN, PAGE_REDACT).includes(hash)) {
      return hash
    }
    window.location.hash = PAGE_MAIN
    return PAGE_MAIN
}