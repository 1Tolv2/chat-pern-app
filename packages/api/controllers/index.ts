export const requiredFieldsCheck = ( request: any, requiredFields: string[]): string[] => {
  return requiredFields.filter((key) => !request.hasOwnProperty(key));
}
