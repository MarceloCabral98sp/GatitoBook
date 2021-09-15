import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
    },
    {
        path: 'animais',
        loadChildren: () => import('./animais/animais.module').then((m)=> m.AnimaisModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }

// PathMath romove os espaços caso o usuário digite 

// técnica do lazyloading
// loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)