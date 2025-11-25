export interface IOtpGenerate {
  createOtpDigit(length?: number): Promise<string>;
}