import { Routes } from '@angular/router';

import {ClientcreateComponent} from './client/clientcreate.component';
import {OptionsComponent} from './options/options.component';

export const CreateRoutes: Routes = [{
        path: '',
        children: [{
            path: 'client',
            component: ClientcreateComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'options',
            component: OptionsComponent
        }]
    }
];
