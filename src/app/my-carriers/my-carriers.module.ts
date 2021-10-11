import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MyCarriersRoutingModule } from "./my-carriers-routing.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ArchwizardModule } from 'angular-archwizard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgSelectModule } from '@ng-select/ng-select';
import { TagInputModule } from 'ngx-chips';
import { QuillModule } from 'ngx-quill'
import { MatchHeightModule } from "../shared/directives/match-height.directive";

import { MyCarriersComponent } from './my-carriers.component';
import { PipeModule } from 'app/shared/pipes/pipe.module'; 


@NgModule({
    imports: [
        CommonModule,
        MyCarriersRoutingModule,
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
        MyCarriersComponent
    ]
})
export class MyCarriersModule { }

