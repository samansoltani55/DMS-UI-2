import { NgModule } from '@angular/core';
import { BrowserModule }  
    from '@angular/platform-browser'; 
import { BrowserAnimationsModule }  
    from '@angular/platform-browser/animations'; 
  
import { HttpClientModule } 
    from '@angular/common/http'; 
    import {
      NbAccordionModule,
      NbListModule,
      NbRouteTabsetModule,
      NbStepperModule,
    } from '@nebular/theme';
import {
      NbActionsModule,
      NbButtonModule,
      NbCardModule,
      NbCheckboxModule,
      NbDatepickerModule, NbIconModule,
      NbInputModule,
      NbRadioModule,
      NbSelectModule,
      NbUserModule,
    } from '@nebular/theme';
    
    import { ThemeModule } from '../../@theme/theme.module';
    import { FormsRoutingModule } from '../forms/forms-routing.module';
    import { FormsComponent } from '../forms/forms.component';
    import { FormInputsComponent } from '../forms/form-inputs/form-inputs.component';
    import { FormLayoutsComponent } from '../forms/form-layouts/form-layouts.component';
    import { DatepickerComponent } from '../forms/datepicker/datepicker.component';
    import { ButtonsComponent } from '../forms/buttons/buttons.component';
    import { FormsModule as ngFormsModule } from '@angular/forms';
import { RasHealthParaclinicResultComponent } from './ras-health-paraclinic-result.component';

@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    FormsRoutingModule,
    NbSelectModule,
    NbIconModule,
    ngFormsModule,
    NbStepperModule,
    NbAccordionModule
  ],
  declarations: [
    ],
})
export class RasHealthParaclinicResultModule {

}
