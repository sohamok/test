import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { GeolocationComponent } from './geolocation/geolocation.component';
import { ShareModule } from '../share/share.module';
import { MaterialModule } from '../material/material.module';
import { NavbarComponent } from './navbar/navbar.component';
import { MachineSetupComponent } from './machine-setup/machine-setup.component';
import { MachinesComponent } from './machines/machines.component';
import { UsersComponent } from './users/users.component';
import { NewuserComponent } from './newuser/newuser.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MachineconfigDialogComponent } from './machineconfig-dialog/machineconfig-dialog.component';
import { MachineconfigurationsComponent } from './machineconfigurations/machineconfigurations.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ShieldingGasComponent } from './shielding-gas/shielding-gas.component';
import { ShieldingGasDialogComponent } from './shielding-gas-dialog/shielding-gas-dialog.component';
import { FillerMaterialComponent } from './filler-material/filler-material.component';
import { FillerMaterialDialogComponent } from './filler-material-dialog/filler-material-dialog.component';
import { JointDesignComponent } from './joint-design/joint-design.component';
import { JointDesignDialogComponent } from './joint-design-dialog/joint-design-dialog.component';
import { WeldingSequenceComponent } from './welding-sequence/welding-sequence.component';
import { WeldingSequenceDialogComponent } from './welding-sequence-dialog/welding-sequence-dialog.component';
import { ComponentSpecificationComponent } from './component-specification/component-specification.component';
import { ComponentSpecificationDialogComponent } from './component-specification-dialog/component-specification-dialog.component';
import { WeldingMaterialComponent } from './welding-material/welding-material.component';
import { WeldingMaterialDialogComponent } from './welding-material-dialog/welding-material-dialog.component';
import { ComponentTrackingComponent } from './component-tracking/component-tracking.component';

import { PowerbiComponent } from './powerbi/powerbi.component';
import { LocationDialogComponent } from './location-dialog/location-dialog.component';
import { ShiftComponent } from './shift/shift.component';
import { ShiftDialogComponent } from './shift-dialog/shift-dialog.component';
import { ReportComponent } from './report/report.component';
import { ReportDialogComponent } from './report-dialog/report-dialog.component';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { TimeZoneServiceService } from '../service/time-zone-service.service';
import { RealtimeComponent } from './realtime/realtime.component';
import { ThresholdSettingComponent } from './threshold-setting/threshold-setting.component';
import { TimepipePipe } from './custompipe/timepipe.pipe';

// import { TimezonePickerModule } from 'ng2-timezone-selector';


@NgModule({
  declarations: [
    GeolocationComponent,
    NavbarComponent,
    MachineSetupComponent,
    MachinesComponent,
    UsersComponent,
    NewuserComponent,
    ConfirmationDialogComponent,
    MachineconfigDialogComponent,
    MachineconfigurationsComponent,
    DashboardHomeComponent,
    ShieldingGasComponent,
    ShieldingGasDialogComponent,
    FillerMaterialComponent,
    FillerMaterialDialogComponent,
    JointDesignComponent,
    JointDesignDialogComponent,
    WeldingSequenceComponent,
    WeldingSequenceDialogComponent,
    ComponentSpecificationComponent,
    ComponentSpecificationDialogComponent,
    PowerbiComponent,
    ImageDialogComponent,
    WeldingMaterialComponent,
    WeldingMaterialDialogComponent,
    ComponentTrackingComponent,
    LocationDialogComponent,
    PowerbiComponent,
    ShiftComponent,
    ShiftDialogComponent,
    ReportComponent,
    ReportDialogComponent,
    RealtimeComponent,
    ThresholdSettingComponent,
    ThresholdSettingComponent,
    TimepipePipe
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ShareModule,
    MaterialModule,
    // TimezonePickerModule
  ],
 
  entryComponents: [
    MachineSetupComponent,
    NewuserComponent,
    ConfirmationDialogComponent,
    MachineconfigDialogComponent,
    ShieldingGasDialogComponent,
    FillerMaterialDialogComponent,
    JointDesignDialogComponent,
    WeldingSequenceDialogComponent,
    ImageDialogComponent,
    LocationDialogComponent,
    ShiftDialogComponent,
    ReportDialogComponent,
    ThresholdSettingComponent,
  ],
})
export class DashboardModule { }
