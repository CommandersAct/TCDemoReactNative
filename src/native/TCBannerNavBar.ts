/**
 * JS wrapper around the app-local native "TCBannerNavBar" module (android only).
 * Works around a gap in CommandersAct's Consent SDK: the BOTTOM banner doesn't extend
 * into the Android system navigation bar inset, leaving it uncovered on edge-to-edge
 * devices. This paints a same-colour strip behind that inset for as long as the banner
 * is on screen — see TCBannerNavBarModule.kt for how it detects the banner's dismissal.
 * No-op on iOS, where there's no equivalent system navigation bar to cover.
 */
import { NativeModules } from 'react-native';

const { TCBannerNavBar: NativeTCBannerNavBar } = NativeModules;

/**
 * Call right before showing a BOTTOM CommandersAct banner, with the same background
 * colour passed as its colorScheme, so the navigation bar inset matches the banner.
 */
function showBehindNavigationBar(hexColor: string): void {
  NativeTCBannerNavBar?.showBehindNavigationBar(hexColor);
}

export const TCBannerNavBar = { showBehindNavigationBar };
