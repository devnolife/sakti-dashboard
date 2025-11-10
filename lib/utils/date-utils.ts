import moment from 'moment'
import 'moment-hijri'

/**
 * Hijri month names in Indonesian
 */
export const hijriMonths = [
  'Muharram',
  'Safar',
  'Rabiul Awal',
  'Rabiul Akhir',
  'Jumadil Awal',
  'Jumadil Akhir',
  'Rajab',
  'Syaban',
  'Ramadan',
  'Syawal',
  'Dzul Qadah',
  'Zulhijjah'
]

/**
 * Convert Arabic numerals to Latin numerals
 * @param str - String containing Arabic numerals
 * @returns String with Latin numerals
 */
export const arabicToLatin = (str: string): string => {
  const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩']
  const latinNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  return str.replace(/[٠-٩]/g, (d) => latinNumbers[arabicNumbers.indexOf(d)])
}

/**
 * Get formatted Gregorian date
 * @returns Formatted date in Indonesian locale
 */
export const getTanggalMasehi = (): string => {
  moment.locale('id')
  return moment().format('DD MMMM YYYY') + ' M'
}

/**
 * Get Hijri date components
 * @param dateInput - Optional date input
 * @returns Object containing day, month, and year
 */
export const getTanggalHijriyah = (dateInput: string | null = null) => {
  const momentHijri = require('moment-hijri')
  let date = dateInput ? momentHijri(dateInput, 'iYYYY/iM/iD') : momentHijri()
  let hijriDate = date.format('iYYYY/iM/iD')
  hijriDate = arabicToLatin(hijriDate)
  const [year, month, day] = hijriDate.split('/')
  const monthName = hijriMonths[parseInt(month) - 1]

  return {
    day: day,
    month: monthName,
    year: year,
    monthNumber: parseInt(month),
    fullDate: `${day} ${monthName} ${year}`,
  }
}

/**
 * Get current month in Roman numerals
 * @returns Roman numeral for current month
 */
export const getBulanRomawi = (): string => {
  const bulan = new Date().getMonth() + 1
  const bulanRomawi = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']
  return bulanRomawi[bulan - 1]
}

/**
 * Get month name in Indonesian
 * @param monthNumber - Month number (1-12)
 * @returns Indonesian month name
 */
export const getBulanIndonesia = (monthNumber: number | null = null): string => {
  const currentMonth = monthNumber || (new Date().getMonth() + 1)
  const bulanIndonesia = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ]
  return bulanIndonesia[currentMonth - 1]
}

/**
 * Get current year in both Hijri and Gregorian
 * @returns Object containing both calendar years
 */
export const getCurrentYears = () => {
  const gregorianYear = new Date().getFullYear()
  const { year: hijriYear } = getTanggalHijriyah()

  return {
    gregorian: gregorianYear,
    hijri: parseInt(hijriYear),
    hijriShort: hijriYear.toString().slice(-2),
  }
}

/**
 * Format date for display
 * @param date - Date to format
 * @param format - Format string
 * @returns Formatted date string
 */
export const formatDate = (date: Date = new Date(), format: string = 'DD MMMM YYYY'): string => {
  moment.locale('id')
  return moment(date).format(format)
}

/**
 * Validate date format
 * @param dateString - Date string to validate
 * @param format - Expected format
 * @returns True if valid
 */
export const isValidDate = (dateString: string, format: string = 'YYYY-MM-DD'): boolean => {
  return moment(dateString, format, true).isValid()
}

/**
 * Generate letter number format
 * @param counter - Auto-increment counter
 * @param kodeCategory - Category code (e.g., SKA, SIP)
 * @param kodeProdi - Prodi code (e.g., IF, TE)
 * @returns Formatted letter number
 * @example
 * generateNomorSurat(1, 'SKA', 'IF')
 * // Returns: "001/SKA/IF/XI/1446/2024"
 */
export const generateNomorSurat = (
  counter: number,
  kodeCategory: string,
  kodeProdi: string
): string => {
  const bulanRomawi = getBulanRomawi()
  const { gregorian, hijri } = getCurrentYears()
  const paddedCounter = counter.toString().padStart(3, '0')

  return `${paddedCounter}/${kodeCategory}/${kodeProdi}/${bulanRomawi}/${hijri}/${gregorian}`
}

/**
 * Parse letter number into components
 * @param nomorSurat - Full letter number
 * @returns Object containing parsed components
 */
export const parseNomorSurat = (nomorSurat: string) => {
  const parts = nomorSurat.split('/')
  if (parts.length !== 6) {
    throw new Error('Invalid letter number format')
  }

  return {
    counter: parseInt(parts[0]),
    kodeCategory: parts[1],
    kodeProdi: parts[2],
    bulanRomawi: parts[3],
    tahunHijriah: parts[4],
    tahunMasehi: parts[5]
  }
}

/**
 * Get date range in Indonesian format
 * @param startDate - Start date
 * @param endDate - End date
 * @returns Formatted date range string
 */
export const getDateRangeIndonesia = (startDate: Date, endDate: Date): string => {
  moment.locale('id')
  const start = moment(startDate).format('DD MMMM YYYY')
  const end = moment(endDate).format('DD MMMM YYYY')
  return `${start} - ${end}`
}

/**
 * Get relative time in Indonesian
 * @param date - Date to compare
 * @returns Relative time string (e.g., "2 hari yang lalu")
 */
export const getRelativeTimeIndonesia = (date: Date | string): string => {
  moment.locale('id')
  return moment(date).fromNow()
}
