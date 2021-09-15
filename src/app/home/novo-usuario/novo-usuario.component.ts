import { Component, OnInit } from '@angular/core';
import { minusculoValidator } from './validators/minusculo.validator';
import { NovoUsuario } from './novo-usuario';
import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './validators/usuario-senha-iguais-validator';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {
  novoUsuarioForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private novoUsuarioService: NovoUsuarioService,
    private usuarioExistenteService: UsuarioExisteService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.novoUsuarioForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      fullName: new FormControl('', [Validators.required, Validators.minLength(4)]),
      userName: new FormControl('', [minusculoValidator, this.usuarioExistenteService.usuarioJaExiste]),
      password: new FormControl('')
    }, {
      validators: [usuarioSenhaIguaisValidator]
    });
  }

  cadastrar() {
    if(this.novoUsuarioForm.valid) {

      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario;
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => 
        this.router.navigate(['']),
        (error) => { console.log(error); }
      );
    }
  }
}
