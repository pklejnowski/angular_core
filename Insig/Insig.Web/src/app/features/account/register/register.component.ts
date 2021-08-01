import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/auth";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-register",
    templateUrl: "./register.component.html"
})
export class RegisterComponent {

    registerForm = this.fb.group({
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.minLength(6)]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", [Validators.required]]
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

    register(): void {
        if (this.registerForm.valid) {
            this.authService.register({
                email: this.registerForm.value.email,
                phoneNumber: "+48" + this.registerForm.value.phoneNumber,
                password: this.registerForm.value.password,
                redirectUrl: appConfig.clientUrl + "/login"
            }).subscribe(_ => {
                this.toastr.success("A verification link has been sent to your email account", "Thank you for registering");
                this.router.navigate(["login"]);
            }, error => {
                this.toastr.error(error.error[0].description);
            });
        }
    }
}
