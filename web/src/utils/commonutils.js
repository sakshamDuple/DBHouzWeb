/**
 * Checks if a valid array
 * @param arr: array 
 */
 export const strictValidArray = arr => arr && Array.isArray(arr);

 /**
  * Checks if a valid array with minimum specified length
  * @param arr: array
  * @param minLength: integer 
  */
 export const strictValidArrayWithMinLength = (arr, minLength) => strictValidArray(arr) && arr.length >= minLength;
 
 /**
  * Checks if a valid array with length
  * @param arr: array 
  */
 export const strictValidArrayWithLength = arr => strictValidArray(arr) && !!arr.length;