/**
 * Whether this build targets the IAB-capable consent SDK
 * (@commandersact/tcconsent-react-native) rather than the lighter
 * @commandersact/tcconsent-react-native-noiab package. The two live on
 * separate branches (`iab` / `develop`) and the swap isn't detectable at
 * runtime, so this is set by hand to match the branch's package.json.
 */
export const IAB_ENABLED = false;
