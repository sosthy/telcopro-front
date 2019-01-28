
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {number} from 'ng2-validation/dist/number';
export abstract class FormController {
  form: FormGroup;
  constructor() {}
  abstract initForm();
  resetForm() {
    this.form.reset();
  }
  markFormControlsAsTouched() {
      for (const controlName in this.form.controls) {
        this.form.controls[controlName].markAsTouched();
      }
  }
  arrangeClass(nameInput) {
    if (this.controlExits(nameInput)) {
      return  this.isUnValid(nameInput) ? 'is-invalid' : (this.form.controls[nameInput].touched ? 'is-valid' : '');
    }
    return '';
  }

  isUnValid(nameInput, errorType?) {
    if (this.controlExits(nameInput)) {
      if (errorType) {
        return !this.form.controls[nameInput].valid
          && this.form.controls[nameInput].touched
          && this.form.controls[nameInput].hasError(errorType);
      }
      return !this.form.controls[nameInput].valid && this.form.controls[nameInput].touched;
    } else {
      return true;
    }
  }
  defaultForm(...controls: Array<string>) {
    if (!this.formInit()) {
      this.form = new FormGroup({});
    }
    controls.forEach((item) => {
      this.form.addControl(item, new FormControl('', Validators.required));
    });
  }
  addNumberValidatorsToFormControl(minValue: number, ...controls: Array<string>) {
    if (!this.formInit()) {
      this.form = new FormGroup({});
    }
    controls.forEach((item) => {
      if (this.controlExits(item)) {
        this.form.controls[item].setValidators(Validators.compose([this.form.controls[item].validator, Validators.min(minValue)]));
      } else {
        this.form.addControl(item, new FormControl('', Validators.min(minValue)));
      }
    });
  }
  newFormControl(name: string, validators: Validators) {
    if (!this.formInit()) {
      this.form = new FormGroup({});
    }
    this.form.addControl(name, new FormControl('', validators));
  }
  formInit(): boolean {
    return !!this.form;
  }
  formUnValid() {
    return !this.form.valid;
  }
  controlExits(str) {
    for (const str2 in this.form.controls) {
        if (str === str2) {
          return true;
        }
    }
    return false;
  }
  setValueFormControl(nameInput, value) {
      this.form.controls[nameInput].setValue(value);
  }
  getValueFormControl(nameInput) {
      return this.form.controls[nameInput].value;
  }
}
