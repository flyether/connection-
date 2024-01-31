import { FormControl, ValidationErrors,  AbstractControl,  ValidatorFn } from '@angular/forms';

export function PasswordValidator(control:FormControl): ValidationErrors | null {
  const password = control.value;
  const hasUppercase = /[A-Z-А-Я]/.test(password);
  const hasLowercase = /[a-z-a-я]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  if (password.length < 8 || !hasSpecialChar || !hasNumber || !hasLowercase || !hasUppercase) {
    return {
      passwordmatcherror: true,
    };
  }
  if (password.length > 7 && hasSpecialChar && hasNumber && hasLowercase && hasUppercase) {
    return null;
  }

  return null;
}



export const validatePassword: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const { value } = control;
  const regex = {
    upLowLetters: /^(?=.*[a-z-a-я])(?=.*[A-Z-А-Я])/,
    letterAndNumber: /^(?=.*\d)(?=.*[a-z-a-я-A-Z-А-Я])/,
    specialChars: /[!@#$%^&*(),.?":{}|<>]/,
  };

  let hintMessage: string = "Your password isn't strong enough! Should contain ";

  if (value.length < 8) {
    hintMessage += 'at least 8 characters';

    return { strength: hintMessage };
  }

  if (!value.match(regex.upLowLetters)) {
    hintMessage += 'a mixture of both uppercase and lowercase letters';

    return { strength: hintMessage };
  }

  if (!value.match(regex.letterAndNumber)) {
    hintMessage += 'a mixture of letters and numbers';

    return { strength: hintMessage };
  }

  if (!value.match(regex.specialChars)) {
    hintMessage += 'inclusion of at least one special character, e.g., ! @ # ? ]';

    return { strength: hintMessage };
  }
  if (value.length  > 7 && value.match(regex.upLowLetters) && value.match(regex.letterAndNumber) && value.match(regex.specialChars)) {
   return null;
 }

  return null;
};