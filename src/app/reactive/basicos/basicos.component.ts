import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html'
})

export class BasicosComponent implements OnInit {
  /*
  miFormulario: FormGroup = new FormGroup({
    nombre: new FormControl('Intel i7'),
    precio: new FormControl(300),
    existencias: new FormControl(10)
  })
  */

  miFormulario: FormGroup = this.fb.group({
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  })

  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
      this.miFormulario.reset({
        nombre: 'Intel i5',
        precio: 120,
        existencias: 1000
      })
  }

  campoEsValido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {

    if(this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return
    }

    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}