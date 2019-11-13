import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableFilterModule } from 'mat-table-filter';

import {CreateRoutes} from './create.routing';


import {MatTableModule} from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';

import {ClientcreateComponent} from './client/clientcreate.component';
import {OptionsComponent} from './options/options.component';
import {TagInputModule} from "ngx-chips";
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
    imports: [
        MatButtonModule, MatPaginatorModule, MatSelectModule,
        MatFormFieldModule, MatCheckboxModule, MatInputModule,
        CommonModule,
        RouterModule.forChild(CreateRoutes),
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTableFilterModule,
        FormsModule,
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        NgbModule,
        FormsModule
    ],
    declarations: [
        ClientcreateComponent,
        OptionsComponent

    ]
})

export class CreateModule {}
