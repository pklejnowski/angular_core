import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/auth/auth.service";
import { environment } from "environments/environment";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html"
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(2)]],
    email: ["", [Validators.required, Validators.email]],
    phoneNumber: ["", [Validators.required, Validators.minLength(6)]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register({
        name: this.registerForm.value["name"],
        email: this.registerForm.value["email"],
        phoneNumber: "+48" + this.registerForm.value["phoneNumber"],
        password: this.registerForm.value["password"],
        redirectUrl: environment.clientUrl + "login"
      }).subscribe(_ => {
        this.toastr.success("A verification link has been sent to your email account", "Thank you for registering");
        this.router.navigate(["login"]);
      }, error => {
        this.toastr.error(error.error[0].description);
      });
    }
  }
}
