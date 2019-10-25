import { Routes } from '@angular/router';

import {ClientComponent} from './client/client.component';
import {OptionsComponent} from './options/options.component';

export const CreateRoutes: Routes = [{
        path: '',
        children: [{
            path: 'client',
            component: ClientComponent
        }]
    }, {
        path: '',
        children: [{
            path: 'options',
            component: OptionsComponent
        }]
    }
];
