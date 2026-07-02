import { useState, useEffect } from 'react'

// Returns true on touch / small-screen devices, false on desktop, and null
// until we've had a chance to check on the client (avoids SSR hydration
// mismatches, since the server can't know the viewport).
export default function useIsMobile(breakpoint = 820) {
  const [ isMobile, setIsMobile ] = useState(null)

  useEffect(() => {
    const check = () => {
      const narrow = window.matchMedia(`(max-width: ${breakpoint}px)`).matches
      const coarse = window.matchMedia("(pointer: coarse)").matches
      setIsMobile(narrow || coarse)
    }

    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}
