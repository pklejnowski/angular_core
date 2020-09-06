import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ToastrService } from "ngx-toastr";

const resultCodeDictionary: { [code: number]: string } = {
    1: "Password has been changed successfully",
    2: "Password change has been canceled"
};

@Component({
    selector: "app-home",
    templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
    constructor(private route: ActivatedRoute, private toastrService: ToastrService) { }

    ngOnInit(): void {
        const resultCode = +(this.route.snapshot.queryParamMap.get("resultCode") || "");

        switch (resultCode) {
            case 1:
                this.toastrService.success(resultCodeDictionary[resultCode]);
                break;
            case 2:
                this.toastrService.warning(resultCodeDictionary[resultCode]);
                break;
            default:
                break;
        }
    }
}
