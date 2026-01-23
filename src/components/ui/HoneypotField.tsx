/**
 * HONEYPOT FIELD COMPONENT
 * 
 * Security measure to catch spam bots
 * - Hidden from real users
 * - Attractive to bots (they fill all fields)
 * - If filled, form is rejected
 * 
 * Usage:
 * <form onSubmit={handleSubmit}>
 *   <input name="name" />
 *   <input name="email" />
 *   <HoneypotField onBotDetected={() => console.log('Bot!')} />
 *   <button type="submit">Submit</button>
 * </form>
 */

import { useState } from 'react';

interface HoneypotFieldProps {
  onBotDetected?: () => void;
  fieldName?: string;
}

export function HoneypotField({ 
  onBotDetected,
  fieldName = 'website' // Common honeypot field name
}: HoneypotFieldProps) {
  const [value, setValue] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    // If filled, it's likely a bot
    if (newValue && onBotDetected) {
      onBotDetected();
    }
  };

  return (
    <>
      {/* Method 1: CSS hidden (most bots will still fill it) */}
      <input
        type="text"
        name={fieldName}
        id={fieldName}
        value={value}
        onChange={handleChange}
        autoComplete="off"
        tabIndex={-1}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          opacity: 0,
          pointerEvents: 'none'
        }}
      />

      {/* Method 2: Disguised field (even smarter bots might fill it) */}
      <div
        style={{
          position: 'absolute',
          left: '-9999px',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
        aria-hidden="true"
      >
        <label htmlFor={`${fieldName}_backup`}>
          Leave this field blank (anti-spam)
        </label>
        <input
          type="text"
          name={`${fieldName}_backup`}
          id={`${fieldName}_backup`}
          autoComplete="off"
          tabIndex={-1}
        />
      </div>
    </>
  );
}

/**
 * Check if honeypot was triggered
 */
export function checkHoneypot(formData: FormData, fieldName: string = 'website'): boolean {
  const value = formData.get(fieldName);
  const backupValue = formData.get(`${fieldName}_backup`);
  
  // If either field has a value, it's a bot
  return !!(value || backupValue);
}

/**
 * React hook for honeypot validation
 */
export function useHoneypot(fieldName: string = 'website') {
  const [isBot, setIsBot] = useState(false);

  const handleBotDetected = () => {
    setIsBot(true);
    console.warn('🚫 Bot detected - Honeypot triggered');
  };

  const validateForm = (formData: FormData): boolean => {
    const botDetected = checkHoneypot(formData, fieldName);
    if (botDetected) {
      setIsBot(true);
      return false;
    }
    return true;
  };

  const reset = () => {
    setIsBot(false);
  };

  return {
    isBot,
    handleBotDetected,
    validateForm,
    reset,
    HoneypotField: () => <HoneypotField onBotDetected={handleBotDetected} fieldName={fieldName} />
  };
}

export default HoneypotField;
