import { __decorate } from "tslib";
import { Directive, HostListener, Input } from '@angular/core';
let PasswordSwitchTypeDirective = class PasswordSwitchTypeDirective {
    onMouseOver() {
        this.appPasswordSwitchType.type = 'password';
    }
    onMouseLeave() {
        this.appPasswordSwitchType.type = 'password';
    }
    onMouseDown() {
        this.appPasswordSwitchType.type = 'text';
    }
};
__decorate([
    Input()
], PasswordSwitchTypeDirective.prototype, "appPasswordSwitchType", void 0);
__decorate([
    HostListener('mouseup')
], PasswordSwitchTypeDirective.prototype, "onMouseOver", null);
__decorate([
    HostListener('mouseleave')
], PasswordSwitchTypeDirective.prototype, "onMouseLeave", null);
__decorate([
    HostListener('mousedown')
], PasswordSwitchTypeDirective.prototype, "onMouseDown", null);
PasswordSwitchTypeDirective = __decorate([
    Directive({
        selector: '[appPasswordSwitchType]'
    })
], PasswordSwitchTypeDirective);
export { PasswordSwitchTypeDirective };
//# sourceMappingURL=password-switch-type.directive.js.map