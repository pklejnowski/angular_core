import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent {

  registerForm = this.fb.group({
    name: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    confirmPassword: ["", [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService, private router: Router) { }

  register(): void {
    if (this.registerForm.valid) {
      this.authService.register({
        name: this.registerForm.value["name"],
        email: this.registerForm.value["email"],
        password: this.registerForm.value["password"],
      }).subscribe(_ => {
        this.toastr.success("Your registration was successful");
        this.router.navigate(["login"]);
      }, error => {
        this.toastr.error(error.error[0].description);
      });
    }
  }
}
