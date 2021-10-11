import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { DriverLoadsRoutingModule } from "./driver-loads-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ArchwizardModule } from 'angular-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { MatchHeightModule } from "../shared/directives/match-height.directive";


import { DriverLoadsComponent } from './driver-loads.component';
import { PipeModule } from 'app/shared/pipes/pipe.module'; 


@NgModule({
    imports: [
        CommonModule,
        DriverLoadsRoutingModule,
        NgxDatatableModule,
        PipeModule,
		ReactiveFormsModule,
		FormsModule,
        HttpClientModule,
        ArchwizardModule,
        CustomFormsModule,
        MatchHeightModule,
        NgbModule,
        UiSwitchModule,
        QuillModule.forRoot(),
        NgSelectModule,
        TagInputModule
    ],
    declarations: [
        DriverLoadsComponent
    ]
})
export class DriverLoadsModule { }

