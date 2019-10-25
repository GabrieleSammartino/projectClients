import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {APP_BASE_HREF} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {ApiService} from "../api.service.ts";

import {SidebarModule} from './sidebar/sidebar.module';
import {FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AppRoutes} from './app.routing';
import {MatTableModule} from '@angular/material/table';
import {MatDialog} from '@angular/material';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatDialogModule} from '@angular/material';
import {
    MatButtonModule, MatPaginatorModule, MatSelectModule,
    MatFormFieldModule, MatCheckboxModule, MatInputModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule, MatPaginatorModule, MatSelectModule,
        MatFormFieldModule, MatCheckboxModule, MatInputModule,
        MatTableModule,
        BrowserAnimationsModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes, {
            useHash: true
        }),
        NgbModule.forRoot(),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule,
        FixedPluginModule,
        HttpClientModule,
        OverlayModule,
        MatDialogModule

    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    bootstrap: [AppComponent],
    providers: [ApiService, MatDialog]
})

export class AppModule {
}
