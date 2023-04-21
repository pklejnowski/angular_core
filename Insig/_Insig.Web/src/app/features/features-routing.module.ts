import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/core/guards/auth.guard';

import { SampleComponent } from './sample/sample.component';

const routes: Routes = [
    {
        path: 'sample',
        component: SampleComponent,
        canActivate: [AuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeaturesRoutingModule { }
