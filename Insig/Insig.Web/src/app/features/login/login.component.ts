import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@app/core/auth/auth.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent {

  hide_password = true;

  loginForm = this.fb.group({
    username: ["", [Validators.required]],
    password: ["", [Validators.required]]
  });

  constructor(private fb: FormBuilder, private authService: AuthService, private toastr: ToastrService) { }

  login(): void {
    if (this.loginForm.valid) {
      this.toastr.success("Hello world!", "Toastr fun!");
      this.authService.login(this.loginForm.value);
    } else {
      this.toastr.error("Ups!", "Form is invalid.");
    }
  }
}
