import errorMessages from "../constants/firebaseErrors.json";

export function getErrorMessage(code: string): string {
  return errorMessages[code as keyof typeof errorMessages] || errorMessages.default;
}
