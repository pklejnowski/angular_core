import { Injectable } from "@angular/core";
import { ApiClientService } from "@app/core/services/api-client.service";

interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterCredentials {
  username: string;
  password: string;
  confirmPassword: string;
}


@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(private apiClientService: ApiClientService) { }

  login(credentials: LoginCredentials): void {
    console.log(credentials);
    this.apiClientService.post("login", credentials);
  }

  register(credentials: RegisterCredentials): void {
    console.log(credentials);
    this.apiClientService.post("register", credentials);
  }
}
