/**
 * Formats a price number into a human-readable string with proper currency formatting
 * @param price - The price number to format
 * @param currency - The currency symbol (default: '$')
 * @returns Formatted price string
 */
export function formatPrice(price: number, currency: string = '$'): string {
  if (price === 0) return `${currency}0.00`;
  
  // For very small prices (less than 0.01)
  if (price < 0.01) {
    // Show up to 8 significant decimal places for very small numbers
    return `${currency}${price.toFixed(8).replace(/\.?0+$/, '')}`;
  }
  
  // For prices less than 1
  if (price < 1) {
    return `${currency}${price.toFixed(4).replace(/\.?0+$/, '')}`;
  }
  
  // For prices between 1 and 1000
  if (price < 1000) {
    return `${currency}${price.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  
  // For larger prices
  return `${currency}${price.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
