import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerX } from '../../../shared/validators/validaciones';
import { ValidatorsService } from '../../../shared/validators/validators.service';
import { EmailValidatorService } from '../../../shared/validators/email-validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html'
})

export class RegistroComponent implements OnInit{

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(this.vs.nombreApellidoPattern)]],
    email: ['', [Validators.required, Validators.pattern(this.vs.emailPattern)], [this.emailValidator]],
    username: ['', [Validators.required, this.vs.noPuedeSerX]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  },
  {
    validators: [this.vs.camposIguales('password', 'password2')]
  })

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.required) {
      return 'El email es obligatorio';
    } else if(errors?.pattern) {
      return 'El email no tiene formato correcto'
    } else if(errors?.emailTomado) {
      return 'El email está en uso'
    }
    
    return '';
  }

  constructor(private fb: FormBuilder,
              private vs: ValidatorsService,
              private emailValidator: EmailValidatorService) {

  }

  ngOnInit() {
    this.miFormulario.reset({
      nombre: 'Carlos Gomez',
      email: 'test1@test.com',
      username: 'test1',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    this.miFormulario.markAllAsTouched();
  }
}