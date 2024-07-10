import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private sharedService: SharedService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telf: [''],
      machine: ['', Validators.required],
      content: [''],
      agree: [false, Validators.requiredTrue]
    });
  }

  ngOnInit(): void {
    this.sharedService.selectedMachine$.subscribe((machine) => {
      this.form.patchValue({ machine });
    });
  }

  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get telf() { return this.form.get('telf'); }
  get machine() { return this.form.get('machine'); }
  get content() { return this.form.get('content'); }
  get agree() { return this.form.get('agree'); }

  onSubmit(): void {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.form.valid) {
      const formData = this.form.value;
      const templateParams = {
        name: formData.name,
        email: formData.email,
        telf: formData.telf,
        machine: formData.machine,
        content: formData.content
      };

      emailjs.send('service_pfkizgm', 'template_xjydnhe', templateParams, 'OpHlKNsX9SDHeRO3n')
        .then(response => {
          this.successMessage = '¡Formulario enviado con éxito!';
          this.errorMessage = null;
          this.form.reset();
          console.log('SUCCESS!', response.status, response.text);
        }, error => {
          this.errorMessage = 'Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo más tarde.';
          console.error('FAILED...', error);
        });
    } else {
      this.form.markAllAsTouched();
      this.errorMessage = 'Por favor, complete todos los campos obligatorios correctamente.';
    }
  }
}
