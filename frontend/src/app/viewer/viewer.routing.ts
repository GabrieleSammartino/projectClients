import { Routes } from '@angular/router';

import { ExtendedTableComponent } from './extendedtable/extendedtable.component';
import { RegularTableComponent } from './regulartable/regulartable.component';
import { DataTableComponent } from './datatable.net/datatable.component';
import {MatTableComponent} from './clienti/mattable.component';
import {MatTableComponentOpp} from './opportunità/mattableOpp.component';
import {ClientComponent} from "./clientpage/client.component";

export const TablesRoutes: Routes = [{
        path: '',
        children: [{
            path: 'regular',
            component: RegularTableComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'extended',
            component: ExtendedTableComponent
        }]
    }, {
        path: '',
        children: [ {
            path: 'datatables.net',
            component: DataTableComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'clienti',
            component: MatTableComponent
        }]
    },
    {
        path: '',
        children: [ {
            path: 'opportunità',
            component: MatTableComponentOpp
        }]
    },
    {
        path: '',
        children: [ {
            path: 'client',
            component: ClientComponent
        }]
    }
];
