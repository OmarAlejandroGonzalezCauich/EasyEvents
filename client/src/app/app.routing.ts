import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import user 
import { HomeComponent } from './components/home.component';
import { UserEditComponent } from './components/user-edit.component';

// import provider

import { ProviderListComponent } from './components/provider-list.component';
import { ProviderEditComponent } from './components/provider-edit.component';
import { ProviderAddComponent } from './components/provider-add.component';
import { ProviderDetailComponent } from './components/provider-detail.component';

const appRoutes: Routes = [
	//ruta por defecto
	{path: '', component: HomeComponent},

	// rutas de proveedores
	{path: 'providers/:page', component: ProviderListComponent},
	{path: 'add-provider', component: ProviderAddComponent},
	{path: 'provider/:id', component: ProviderDetailComponent},
	{path: 'edit-provider/:id', component: ProviderEditComponent},

	// Rutas de usuarios
	{path: 'mis-datos', component: UserEditComponent},
	
	//Ruta que no esta configurada previamente
	{path: '**', component: HomeComponent}

];

export const appRountingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);