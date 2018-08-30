import { ValidatorFn, FormGroup } from "@angular/forms";

export const userNamePassword: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('username').value;
    const password  = formGroup.get('password').value;

   return userName != password ? null : {userNamePassword: true};

}