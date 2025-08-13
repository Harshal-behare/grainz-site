/**
 * Comprehensive validation utility for form fields
 */

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export interface FileValidationOptions {
  maxSizeInMB?: number;
  allowedTypes?: string[];
}

/**
 * Validates required fields
 */
export const validateRequired = (value: any, fieldName: string = 'Field'): ValidationResult => {
  if (value === null || value === undefined || value === '' || 
      (Array.isArray(value) && value.length === 0)) {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }
  
  // For numbers, check if it's a valid number and not 0
  if (typeof value === 'number' && (isNaN(value) || value === 0)) {
    return {
      isValid: false,
      error: `${fieldName} is required`
    };
  }
  
  return { isValid: true };
};

/**
 * Validates email format
 */
export const validateEmail = (email: string): ValidationResult => {
  if (!email) {
    return {
      isValid: false,
      error: 'Email is required'
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      error: 'Please enter a valid email address'
    };
  }

  return { isValid: true };
};

/**
 * Validates phone number format
 */
export const validatePhoneNumber = (phone: string): ValidationResult => {
  if (!phone) {
    return {
      isValid: false,
      error: 'Phone number is required'
    };
  }

  // Remove all non-digits
  const digitsOnly = phone.replace(/\D/g, '');
  
  // Check if it's a valid phone number (10-15 digits)
  if (digitsOnly.length < 10 || digitsOnly.length > 15) {
    return {
      isValid: false,
      error: 'Please enter a valid phone number (10-15 digits)'
    };
  }

  return { isValid: true };
};

/**
 * Validates file size and type
 */
export const validateFile = (file: File, options: FileValidationOptions = {}): ValidationResult => {
  const { maxSizeInMB = 5, allowedTypes = [] } = options;

  // Check file size
  const fileSizeInMB = file.size / (1024 * 1024);
  if (fileSizeInMB > maxSizeInMB) {
    return {
      isValid: false,
      error: `File size must be less than ${maxSizeInMB}MB. Current size: ${fileSizeInMB.toFixed(2)}MB`
    };
  }

  // Check file type
  if (allowedTypes.length > 0) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type.toLowerCase();
    
    const isValidType = allowedTypes.some(type => {
      const normalizedType = type.toLowerCase();
      return normalizedType === fileExtension || 
             normalizedType === mimeType ||
             (normalizedType === 'image/*' && mimeType.startsWith('image/')) ||
             (normalizedType === 'pdf' && (mimeType === 'application/pdf' || fileExtension === 'pdf'));
    });

    if (!isValidType) {
      return {
        isValid: false,
        error: `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
      };
    }
  }

  return { isValid: true };
};

/**
 * Validates multiple files
 */
export const validateFiles = (files: File[], options: FileValidationOptions = {}): ValidationResult => {
  for (const file of files) {
    const result = validateFile(file, options);
    if (!result.isValid) {
      return result;
    }
  }
  return { isValid: true };
};

/**
 * Validates numeric range
 */
export const validateNumberRange = (
  value: number, 
  min?: number, 
  max?: number, 
  fieldName: string = 'Value'
): ValidationResult => {
  if (min !== undefined && value < min) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${min}`
    };
  }

  if (max !== undefined && value > max) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${max}`
    };
  }

  return { isValid: true };
};

/**
 * Validates text length
 */
export const validateTextLength = (
  text: string, 
  minLength?: number, 
  maxLength?: number,
  fieldName: string = 'Text'
): ValidationResult => {
  const length = text.trim().length;

  if (minLength !== undefined && length < minLength) {
    return {
      isValid: false,
      error: `${fieldName} must be at least ${minLength} characters`
    };
  }

  if (maxLength !== undefined && length > maxLength) {
    return {
      isValid: false,
      error: `${fieldName} must be no more than ${maxLength} characters`
    };
  }

  return { isValid: true };
};

/**
 * Validates age bracket selection
 */
export const validateAgeBracket = (ageBracket: string): ValidationResult => {
  const validBrackets = ['18_29', '30_39', '40_49', '50_plus'];
  if (!validBrackets.includes(ageBracket)) {
    return {
      isValid: false,
      error: 'Please select a valid age bracket'
    };
  }
  return { isValid: true };
};

/**
 * Validates height
 */
export const validateHeight = (height: number): ValidationResult => {
  if (height < 50 || height > 300) {
    return {
      isValid: false,
      error: 'Please enter a valid height between 50cm and 300cm'
    };
  }
  return { isValid: true };
};

/**
 * Validates weight
 */
export const validateWeight = (weight: number): ValidationResult => {
  if (weight < 20 || weight > 500) {
    return {
      isValid: false,
      error: 'Please enter a valid weight between 20kg and 500kg'
    };
  }
  return { isValid: true };
};

/**
 * Batch validation for multiple fields
 */
export const validateFields = (validations: Array<{ 
  validation: () => ValidationResult, 
  stopOnError?: boolean 
}>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  for (const { validation, stopOnError } of validations) {
    const result = validation();
    if (!result.isValid && result.error) {
      errors.push(result.error);
      if (stopOnError) break;
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};
