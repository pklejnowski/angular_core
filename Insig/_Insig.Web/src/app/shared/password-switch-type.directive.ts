import { Directive, HostListener, Input } from '@angular/core';

@Directive({
    selector: '[appPasswordSwitchType]'
})
export class PasswordSwitchTypeDirective {
    @Input() appPasswordSwitchType: any;

    @HostListener('mouseup')
    onMouseOver(): void {
        this.appPasswordSwitchType.type = 'password';
    }

    @HostListener('mouseleave')
    onMouseLeave(): void {
        this.appPasswordSwitchType.type = 'password';
    }

    @HostListener('mousedown')
    onMouseDown(): void {
        this.appPasswordSwitchType.type = 'text';
    }
}
