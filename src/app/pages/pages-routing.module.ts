import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ECommerceComponent } from './e-commerce/e-commerce.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { RasHomeComponent } from './ras.home-page/ras-home.component';
import { AuthGuard } from '../auth.guard';
import { RasHealthParaclinicResultComponent } from './ras.health.paraclinic-result/ras-health-paraclinic-result.component';
import { OrganizationChartComponent } from '../ras-paraclinic-send-result/ras-paraclinic-send-result.component';
import { RasParaclinicSendMyResultComponent } from './ras-paraclinic-send-my-result/ras-paraclinic-send-my-result.component';
import { RasParaclinicListOfMyResultComponent } from './ras-paraclinic-list-of-my-result/ras-paraclinic-list-of-my-result.component';
import { SigninRedirectCallbackComponent } from '../signin-redirect-callback/signin-redirect-callback.component';
import { SignoutRedirectCallbackComponent } from '../signout-redirect-callback/signout-redirect-callback.component';
import { RasParaclinicRegisterComponent } from './ras-paraclinic-register/ras-paraclinic-register.component';
import { VendorListComponent } from '../vendor-list/vendor-list.component';
import { EquipmentsListComponent } from '../Equipments-list/equipments-list.component';
import { OrgChartAndEquipmentsComponent } from '../OrgChartAndEquipments/orgchartandequipments.component';
const routes: Routes = [{
  path: '',
  component: PagesComponent,
  
  children: [
    
    // {
    //   path: 'ras-health-register',
    //   component: RasParaclinicRegisterComponent,
    // },
    // {
    //   path: 'ras-health-list-of-my-result',
    //   component: RasParaclinicListOfMyResultComponent,
    //   canActivate: [AuthGuard]
    // },
    // {
    //   path: 'ras-health-send-my-result',
    //   component: RasParaclinicSendMyResultComponent,
    //   canActivate: [AuthGuard]
    // },
    {
      path: 'org-chart',
      component: OrganizationChartComponent,
      //canActivate: [AuthGuard]
    },
    {
      path: 'vendor-list',
      component: VendorListComponent,
      //canActivate: [AuthGuard]
    },
    {
      path: 'equipments-list',
      component: EquipmentsListComponent,
      //canActivate: [AuthGuard]
    },
    {
      path: 'OrgChartAndEquipments',
      component: OrgChartAndEquipmentsComponent,
      //canActivate: [AuthGuard]
    },

    
    {
      path: 'dms-home',
      component: RasHomeComponent,
    },
    {
      path: 'dashboard',
      component: ECommerceComponent,
     // canActivate: [AuthGuard]
    },
    {
      path: 'iot-dashboard',
      component: DashboardComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'layout',
      loadChildren: () => import('./layout/layout.module')
        .then(m => m.LayoutModule),
    },
    {
      path: 'forms',
      loadChildren: () => import('./forms/forms.module')
        .then(m => m.FormsModule),
    },
    {
      path: 'ui-features',
      loadChildren: () => import('./ui-features/ui-features.module')
        .then(m => m.UiFeaturesModule),
    },
    {
      path: 'modal-overlays',
      loadChildren: () => import('./modal-overlays/modal-overlays.module')
        .then(m => m.ModalOverlaysModule),
    },
    {
      path: 'extra-components',
      loadChildren: () => import('./extra-components/extra-components.module')
        .then(m => m.ExtraComponentsModule),
    },
    {
      path: 'maps',
      loadChildren: () => import('./maps/maps.module')
        .then(m => m.MapsModule),
    },
    {
      path: 'charts',
      loadChildren: () => import('./charts/charts.module')
        .then(m => m.ChartsModule),
    },
    {
      path: 'editors',
      loadChildren: () => import('./editors/editors.module')
        .then(m => m.EditorsModule),
    },
    {
      path: 'tables',
      loadChildren: () => import('./tables/tables.module')
        .then(m => m.TablesModule),
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'dms-home',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
