import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { loweCaseValidators } from '../../shared/validators/lower-case.validators';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './new-user';
import { SignupService } from './signup.service';

@Component({
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit{
    
    signupForm: FormGroup;
    
    constructor(
        private formBuilder: FormBuilder,
        private userNotTakenValidatorService: UserNotTakenValidatorService,
        private signupService : SignupService,
        private router: Router) {}
    
    ngOnInit(): void {
        
        this.signupForm = this.formBuilder.group({
            email: ['', [ 
                Validators.required, 
                Validators.email]
            ],
            fullName: ['', [ 
                Validators.required, 
                Validators.minLength(2), 
                Validators.maxLength(40)]
            ],
            userName: ['', [ 
                Validators.required, 
                loweCaseValidators,
                Validators.minLength(2), 
                Validators.maxLength(30),
            ],
                this.userNotTakenValidatorService.checkUserNameTaken()
            ],
            password: ['', [ 
                Validators.required, 
                Validators.minLength(8), 
                Validators.maxLength(14)]]
        })

    } 

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser;
        this.signupService
            .signup(newUser)
            .subscribe(
                () => this.router.navigate(['']),
                err => console.log(err)
            );
    }

}