import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPhoneFormatter]',
  standalone: true
})
export class PhoneFormatterDirective {
  private previousValue: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event'])
  onInput(event: Event): void {
    let input: string = this.el.nativeElement.value;

    if (input == null) {
      input = '';
    }

    input = input.replace(/\D/g, '');

    if (input.length > 12) {
      input = input.substring(0, 12);
    }

    const formattedInput = this.formatPhoneNumber(input);
    this.el.nativeElement.value = formattedInput;
    this.previousValue = formattedInput;
  }

  private formatPhoneNumber(value: string): string {
    if (!value.startsWith('380')) {
      value = '380' + value;
    }

    const part1 = value.substring(0, 3); 
    const part2 = value.substring(3, 5); 
    const part3 = value.substring(5, 8); 
    const part4 = value.substring(8, 10); 
    const part5 = value.substring(10, 12); 

    let formatted = '+' + part1;
    if (part2) {
      formatted += ' ' + part2;
    }
    if (part3) {
      formatted += ' ' + part3;
    }
    if (part4) {
      formatted += ' ' + part4;
    }
    if (part5) {
      formatted += ' ' + part5;
    }

    return formatted;
  }
}