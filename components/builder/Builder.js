import DesktopBuilder from './DesktopBuilder'
import MobileBuilder from './MobileBuilder'
import useIsMobile from '../../lib/useIsMobile'

// Picks the touch-friendly mobile builder or the desktop builder based on the
// device. Both share the same tree-building/searching logic via useTreeBuilder;
// only the UI differs. Rendering waits until we've detected the device on the
// client to avoid a hydration mismatch and to keep only one builder mounted.
export default function Builder(props) {
  const isMobile = useIsMobile()

  if (isMobile === null)
    return null

  return isMobile ? <MobileBuilder {...props} /> : <DesktopBuilder {...props} />
}
