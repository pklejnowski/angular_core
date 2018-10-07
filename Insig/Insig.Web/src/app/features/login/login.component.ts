import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { AuthService } from "@app/core/auth/auth.service";

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

  constructor(private fb: FormBuilder, private authService: AuthService) { }

  login(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
