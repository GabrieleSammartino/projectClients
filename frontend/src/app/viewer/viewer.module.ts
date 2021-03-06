import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatTableFilterModule } from 'mat-table-filter';

import { TablesRoutes } from './viewer.routing';
import {MatTableComponentOpp} from './opportunità/mattableOpp.component';
import { ExtendedTableComponent } from './extendedtable/extendedtable.component';
import { RegularTableComponent } from './regulartable/regulartable.component';
import { DataTableComponent } from './datatable.net/datatable.component';
import {MatTableComponent} from './clienti/mattable.component';
import {MatTableModule} from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {ClientComponent} from "./clientpage/client.component";
import { TagInputModule } from 'ngx-chips';
import {JwBootstrapSwitchNg2Module} from "jw-bootstrap-switch-ng2";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
    imports: [
        MatButtonModule, MatPaginatorModule, MatSelectModule,
        MatFormFieldModule, MatCheckboxModule, MatInputModule,
        CommonModule,
        RouterModule.forChild(TablesRoutes),
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatTableFilterModule,
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        NgbModule,
        TagInputModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        MatTableComponent,
        ExtendedTableComponent,
        DataTableComponent,
        RegularTableComponent,
        MatTableComponentOpp,
        ClientComponent

    ]
})

export class ViewerModule {}
