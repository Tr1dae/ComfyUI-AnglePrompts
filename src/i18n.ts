// Internationalization module for the camera widget
import { app } from '../../../scripts/app.js'

export type Locale = 'en' | 'zh'

export interface Translations {
  // Dropdown labels
  horizontal: string
  vertical: string
  zoom: string
  // Info panel labels
  horizontalFull: string
  verticalFull: string
  zoomFull: string
  // Reset button
  resetToDefaults: string
  // Azimuth options
  frontView: string
  frontRightQuarterView: string
  rightSideView: string
  backRightQuarterView: string
  backView: string
  backLeftQuarterView: string
  leftSideView: string
  frontLeftQuarterView: string
  // Elevation options
  lowAngleShot: string
  eyeLevelShot: string
  elevatedShot: string
  highAngleShot: string
  // Distance options
  wideShot: string
  mediumShot: string
  closeUp: string
}

const translations: Record<Locale, Translations> = {
  en: {
    // Dropdown labels
    horizontal: 'H',
    vertical: 'V',
    zoom: 'Z',
    // Info panel labels
    horizontalFull: 'Horizontal',
    verticalFull: 'Vertical',
    zoomFull: 'Zoom',
    // Reset button
    resetToDefaults: 'Reset to defaults',
    // Azimuth options
    frontView: 'front view',
    frontRightQuarterView: 'front-right quarter view',
    rightSideView: 'right side view',
    backRightQuarterView: 'back-right quarter view',
    backView: 'back view',
    backLeftQuarterView: 'back-left quarter view',
    leftSideView: 'left side view',
    frontLeftQuarterView: 'front-left quarter view',
    // Elevation options
    lowAngleShot: 'low-angle shot',
    eyeLevelShot: 'eye-level shot',
    elevatedShot: 'elevated shot',
    highAngleShot: 'high-angle shot',
    // Distance options
    wideShot: 'wide shot',
    mediumShot: 'medium shot',
    closeUp: 'close-up'
  },
  zh: {
    // Dropdown labels
    horizontal: '水平',
    vertical: '垂直',
    zoom: '距离',
    // Info panel labels
    horizontalFull: '水平角度',
    verticalFull: '垂直角度',
    zoomFull: '距离',
    // Reset button
    resetToDefaults: '重置为默认值',
    // Azimuth options
    frontView: '正面视角',
    frontRightQuarterView: '右前方视角',
    rightSideView: '右侧视角',
    backRightQuarterView: '右后方视角',
    backView: '背面视角',
    backLeftQuarterView: '左后方视角',
    leftSideView: '左侧视角',
    frontLeftQuarterView: '左前方视角',
    // Elevation options
    lowAngleShot: '仰拍',
    eyeLevelShot: '平视',
    elevatedShot: '高角度',
    highAngleShot: '俯拍',
    // Distance options
    wideShot: '远景',
    mediumShot: '中景',
    closeUp: '特写'
  }
}

let currentLocale: Locale = 'en'

/**
 * Detect locale from ComfyUI settings or browser
 */
export function detectLocale(): Locale {
  console.log('[QwenMultiangle i18n] Detecting locale...')

  // Try to get locale from ComfyUI settings API
  try {
    const comfyLocale = app.ui?.settings?.getSettingValue?.('Comfy.Locale')
    console.log('[QwenMultiangle i18n] ComfyUI locale from app.ui.settings:', comfyLocale)

    if (comfyLocale) {
      const localeStr = String(comfyLocale).toLowerCase()
      // If ComfyUI has a locale setting, use it (don't fall back to browser)
      if (localeStr.startsWith('zh')) {
        console.log('[QwenMultiangle i18n] Using Chinese (from ComfyUI setting)')
        return 'zh'
      }
      // Any other locale (en, fr, de, etc.) defaults to English
      console.log('[QwenMultiangle i18n] Using English (from ComfyUI setting)')
      return 'en'
    }
  } catch (e) {
    console.log('[QwenMultiangle i18n] Error getting ComfyUI locale:', e)
  }

  // Only fall back to browser language if ComfyUI locale is not set
  const browserLang = navigator.language || (navigator as unknown as { userLanguage?: string }).userLanguage || 'en'
  console.log('[QwenMultiangle i18n] Browser language:', browserLang)

  if (browserLang.startsWith('zh')) {
    console.log('[QwenMultiangle i18n] Using Chinese (from browser)')
    return 'zh'
  }

  console.log('[QwenMultiangle i18n] Using English (default)')
  return 'en'
}

/**
 * Initialize i18n with auto-detected locale
 */
export function initI18n(): void {
  currentLocale = detectLocale()
}

/**
 * Get current locale
 */
export function getLocale(): Locale {
  return currentLocale
}

/**
 * Set locale manually
 */
export function setLocale(locale: Locale): void {
  currentLocale = locale
}

/**
 * Get translation for a key
 */
export function t(key: keyof Translations): string {
  return translations[currentLocale][key] || translations.en[key] || key
}

/**
 * Get all translations for current locale
 */
export function getTranslations(): Translations {
  return translations[currentLocale]
}

// Initialize on module load
initI18n()
