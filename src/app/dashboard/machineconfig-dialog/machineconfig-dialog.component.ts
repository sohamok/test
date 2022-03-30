import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
import { MachineService } from 'src/app/service/machine.service';
import { FillerMaterialService } from 'src/app/service/filler-material.service';
import { JointDesignService } from 'src/app/service/joint-design.service';
import { ShieldingGasService } from 'src/app/service/shielding-gas.service';
import { WeldingMaterialService } from 'src/app/service/welding-material.service';
import { WeldingSequenceService } from 'src/app/service/welding-sequence.service';
import { Router } from '@angular/router';

declare var $: any;

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-machineconfig-dialog',
  templateUrl: './machineconfig-dialog.component.html',
  styleUrls: ['./machineconfig-dialog.component.scss']
})

export class MachineconfigDialogComponent implements OnInit {

  @Input() childMessage: any;
  machineConfigForm: FormGroup;
  matcher: MyErrorStateMatcher;
  errorMsg: string;
  isSure = false;
  // orgid = 1;
  jointDesignVar = false;
  shieldingGasVar = false;
  weldingSequenceVar = false;
  weldingMaterialVar = false;
  fillerMaterialVar = false;
  jointDesignArray = [];
  shieldingGasArray = [];
  weldingSequenceArray = [];
  weldingMaterialArray = [];
  fillerMaterialArray = [];
  mConfigData: { [k: string]: any; };
  constructor( private fb: FormBuilder, private dialog: MatDialog, private changeDetectorRef: ChangeDetectorRef, private fillerMaterialService: FillerMaterialService, private router: Router,
               private toaster: ToastrService, private spinner: NgxSpinnerService, private machineService: MachineService, private jointDesignService: JointDesignService,
               private shieldingGasService: ShieldingGasService, private weldingMaterialService: WeldingMaterialService, private weldingSequenceService: WeldingSequenceService) {

    if (this.router.getCurrentNavigation().extras.state) {
      this.mConfigData = this.router.getCurrentNavigation().extras.state;
      if (this.mConfigData) {
        console.log(this.mConfigData);
        this.jointDesignVar = true;
        this.shieldingGasVar = true;
        this.weldingSequenceVar = true;
        this.weldingMaterialVar = true;
        this.fillerMaterialVar = true;
      }
    }

    this.machineConfigForm = new FormGroup({
    id :  new FormControl(this.mConfigData ? this.mConfigData.id : null),
    mcid :  new FormControl(this.mConfigData ? this.mConfigData.mcid : null),
    orgid :  new FormControl(this.mConfigData ? this.mConfigData.orgid : null),
    job_name:  new FormControl(this.mConfigData ? this.mConfigData.job_name : null, [Validators.required]),
    ref_standards:  new FormControl(this.mConfigData ? this.mConfigData.ref_standards : null, [Validators.required]),
    target_weld_deposit:  new FormControl(this.mConfigData ? this.mConfigData.target_weld_deposit : '4', [Validators.required]),
    temp_hs_thresold:  new FormControl(this.mConfigData ? this.mConfigData.temp_hs_thresold : '90', [Validators.required]),
    temp_amb_thresold:  new FormControl(this.mConfigData ? this.mConfigData.temp_amb_thresold : '25', [Validators.required]),
    temp_thresold_old: new FormControl(this.mConfigData ? this.mConfigData.temp_thresold_old : '75', [Validators.required]),
    high_weld_volt_threshold:  new FormControl(this.mConfigData ? this.mConfigData.high_weld_volt_threshold : '30', [Validators.required]),
    low_weld_volt_threshold: new FormControl(this.mConfigData ? this.mConfigData.low_weld_volt_threshold : '26', [Validators.required]),
    high_weld_cur_threshold:   new FormControl(this.mConfigData ? this.mConfigData.high_weld_cur_threshold : '280', [Validators.required]),
    low_weld_cur_threshold:  new FormControl(this.mConfigData ? this.mConfigData.low_weld_cur_threshold : '220', [Validators.required]),
    high_weld_gas_threshold:  new FormControl(this.mConfigData ? this.mConfigData.high_weld_gas_threshold : '20', [Validators.required]),
    low_weld_gas_threshold: new FormControl(this.mConfigData ? this.mConfigData.low_weld_gas_threshold : '15', [Validators.required]),
    high_motor_volt_threshold:  new FormControl(this.mConfigData ? this.mConfigData.high_motor_volt_threshold : null, [Validators.required]),
    low_motor_volt_threshold :  new FormControl(this.mConfigData ? this.mConfigData.low_motor_volt_threshold : null, [Validators.required]),
    high_motor_cur_threshold :  new FormControl(this.mConfigData ? this.mConfigData.high_motor_cur_threshold : null, [Validators.required]),
    low_motor_cur_threshold :  new FormControl(this.mConfigData ? this.mConfigData.low_motor_cur_threshold : null, [Validators.required]),
    target_weld_cost : new FormControl(this.mConfigData ? this.mConfigData.target_weld_cost : '400', [Validators.required]),
    event_threshold_dur : new FormControl(this.mConfigData ? this.mConfigData.event_threshold_dur : '600', [Validators.required]),
    part_threshold : new FormControl(this.mConfigData ? this.mConfigData.part_threshold : '300', [Validators.required]),
    target_arc_time :  new FormControl(this.mConfigData ? this.mConfigData.target_arc_time : '3', [Validators.required]),
    wm_id :  new FormControl(this.mConfigData ? this.mConfigData.wm_id : null , [Validators.required]),
    jd_id : new FormControl(this.mConfigData ? this.mConfigData.jd_id : null, [Validators.required]),
    ws_id : new FormControl(this.mConfigData ? this.mConfigData.ws_id : null, [Validators.required]),
    sg_id : new FormControl(this.mConfigData ? this.mConfigData.sg_id : null, [Validators.required]),
    fm_id : new FormControl(this.mConfigData ? this.mConfigData.fm_id : null, [Validators.required]),
    wire_speed_high_threshold : new FormControl(this.mConfigData ? this.mConfigData.wire_speed_high_threshold : '15', [Validators.required]),
    wire_speed_low_threshold : new FormControl(this.mConfigData ? this.mConfigData.wire_speed_low_threshold : '8', [Validators.required]),
    current_polarity : new FormControl(this.mConfigData ? this.mConfigData.current_polarity : 'DC', [Validators.required]),
    travel_speed_max : new FormControl(this.mConfigData ? this.mConfigData.travel_speed_max : '350', [Validators.required]),
    travel_speed_min : new FormControl(this.mConfigData ? this.mConfigData.travel_speed_min : '300', [Validators.required]),
    weld_heat_input_max : new FormControl(this.mConfigData ? this.mConfigData.weld_heat_input_max : '1', [Validators.required]),
    weld_heat_input_min : new FormControl(this.mConfigData ? this.mConfigData.weld_heat_input_min : '0.25', [Validators.required]),
    deleted: new FormControl(this.mConfigData ? this.mConfigData.deleted : false),
    created_by : new FormControl(this.mConfigData ? this.mConfigData.created_by : 2),
    approved_by : new FormControl(this.mConfigData ? this.mConfigData.approved_by : 3),
    set_weld_volt_threshold:  new FormControl(this.mConfigData ? this.mConfigData.set_weld_volt_threshold : '28', [Validators.required]),
    set_weld_cur_threshold: new FormControl(this.mConfigData ? this.mConfigData.set_weld_cur_threshold : '250', [Validators.required]),
    set_weld_gas_threshold:   new FormControl(this.mConfigData ? this.mConfigData.set_weld_gas_threshold : '18', [Validators.required]),
    set_motor_volt_threshold:  new FormControl(this.mConfigData ? this.mConfigData.set_motor_volt_threshold : null, [Validators.required]),
    set_motor_cur_threshold:  new FormControl(this.mConfigData ? this.mConfigData.set_motor_cur_threshold : null, [Validators.required]),
    // created_at: new FormControl(this.mConfigData ?this.mConfigData.created_at :null),
    // updated_at: new FormControl(this.mConfigData ?this.mConfigData.updated_at :null),
    });

    this.matcher = new MyErrorStateMatcher();
   }

  ngOnInit() {
    this.getFillerMaterial();
    this.getJointDesign();
    this.getShieldingGas();
    this.getWeldingSequence();
    this.getWeldingMaterial();
  }


  update() {
    this.machineConfigForm.markAllAsTouched();
    if (!this.machineConfigForm.invalid) {
      console.log(this.machineConfigForm);
      const config = this.machineConfigForm.value;
      this.updateMachineConfig(config);
    } else {
      this.toaster.warning('Fill The Form Properly!!');
    }
  }

  save() {
    this.machineConfigForm.markAllAsTouched();
    if (!this.machineConfigForm.invalid) {
      console.log(this.machineConfigForm);
      const config = this.machineConfigForm.value;
      this.createMachineConfig(config);
    } else {
      this.toaster.warning('Fill The Form Properly!!');
    }
  }

  createMachineConfig(config) {
    this.spinner.show();
    this.machineService.createMachineConfig(config).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'CONFIGURATION_CREATED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Configuration Created Successfully !!');
            console.log(response.data);
            this.router.navigate(['dashboard/home/listofconfig']);
           }
        }
      }
    );
  }

  updateMachineConfig(config) {
    this.spinner.show();
    this.machineService.updateMachineConfig(config).subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
          this.spinner.hide();
        } else {
          if (response.message === 'CONFIGURATION_UPDATED_SUCCESSFULLY') {
            this.errorMsg = '';
            this.spinner.hide();
            this.toaster.success('Success', 'Configuration Updated Successfully !!');
            console.log(response.data);
            this.router.navigate(['dashboard/home/listofconfig']);
           }
        }
      }
    );
  }

  get form() { return this.machineConfigForm.controls; }

  jointDesign(value) {
    console.log(value);
    const jd = this.jointDesignArray.find(x => x.jd_id === value);
    this.jointDesignVar = true;
    this.changeDetectorRef.detectChanges();
    if (this.jointDesignVar) {
      $('#joint_type').val(jd.joint_type);
      $('#product_type').val(jd.product_type);
      $('#backing').val(jd.backing);
      $('#welding_position').val(jd.welding_position);
      $('#sides').val(jd.sides);
      $('#layers').val(jd.layers);
      $('#throat_thickness').val(jd.throat_thickness);
      $('#torch_angle').val(jd.torch_angle);
      $('#stick_out_length').val(jd.stick_out_length);
      $('#technique').val(jd.technique);
      $('#joint_design_diagram').val(jd.joint_design_diagram);
    }

  }

  weldingSequence(value) {
    console.log(value);
    const wd = this.weldingSequenceArray.find(x => x.ws_id === value);
    this.weldingSequenceVar = true;
    this.changeDetectorRef.detectChanges();
    if (this.weldingSequenceVar) {
      $('#back_gouging').val(wd.back_gouging);
      $('#track_welding_proc').val(wd.track_welding_proc);
      $('#mode_of_metal_transfer').val(wd.mode_of_metal_transfer);
      $('#flux_designation').val(wd.flux_designation);
      $('#joint_preparation_and_cleaning').val(wd.joint_preparation_and_cleaning);
      $('#tungsten_electrode').val(wd.tungsten_electrode);
      $('#welding_seq_diagram').val(wd.welding_seq_diagram);
    }
  }

  weldingMaterial(value) {
    console.log(value);
    const wm = this.weldingMaterialArray.find(x => x.wm_id === value);
    this.weldingMaterialVar = true;
    this.changeDetectorRef.detectChanges();
    if (this.weldingMaterialVar) {
      $('#name').val(wm.name);
      $('#grade').val(wm.grade);
      $('#diameter').val(wm.diameter);
      $('#material_group').val(wm.material_group);
      $('#standard').val(wm.standard);
      $('#delivery_condition').val(wm.delivery_condition);
      $('#thickness').val(wm.thickness);
    }
  }

  fillerMaterial(value) {
    console.log(value);
    const fm = this.fillerMaterialArray.find(x => x.fm_id === value);
    this.fillerMaterialVar = true;
    this.changeDetectorRef.detectChanges();
    if (this.fillerMaterialVar) {
      $('#trade_name').val(fm.trade_name);
      $('#fm_group').val(fm.fm_group);
      $('#classification').val(fm.classification);
      $('#wire_dia').val(fm.wire_dia);
      $('#wire_density').val(fm.wire_density);
      $('#wire_weight_per_length').val(fm.wire_weight_per_length);
    }
  }

  shieldingGas(value) {
    console.log(value);
    const sg = this.shieldingGasArray.find(x => x.sg_id === value);
    this.shieldingGasVar = true;
    this.changeDetectorRef.detectChanges();
    if (this.shieldingGasVar) {
      $('#shielding_gas_name').val(sg.shielding_gas_name);
      $('#shielding_gas_group').val(sg.shielding_gas_group);
      $('#purging_gas_name').val(sg.purging_gas_name);
      $('#purging_gas_group').val(sg.purging_gas_group);
    }
  }

  getFillerMaterial() {
    this.fillerMaterialService.getFillerMaterial().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'FILLER_MATERIAL_LIST') {
            this.errorMsg = '';
            console.log(response.data);
            this.fillerMaterialArray = response.data;
            if (this.mConfigData) {
              console.log(this.mConfigData);
              this.fillerMaterial(this.mConfigData.fm_id);
            }

           }
        }
      }
    );
  }

  getJointDesign() {
    this.jointDesignService.getJointDesign().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'JOINT_DESIGN_LIST') {
            this.errorMsg = '';
            console.log(response.data);
            this.jointDesignArray = response.data;
            if (this.mConfigData) {
              console.log(this.mConfigData);
              this.jointDesign(this.mConfigData.jd_id);
            }
           }
        }
      }
    );
  }

  getShieldingGas() {
    this.shieldingGasService.getShieldingGas().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'SHIELDING_GAS_LIST') {
            this.errorMsg = '';
            console.log(response.data);
            this.shieldingGasArray = response.data;
            if (this.mConfigData) {
              console.log(this.mConfigData);
              this.shieldingGas(this.mConfigData.sg_id);
            }
           }
        }
      }
    );
  }

  getWeldingSequence() {
    this.weldingSequenceService.getWeldingSequence().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'WELDING_SEQUENCE_LIST') {
            this.errorMsg = '';
            console.log(response.data);
            this.weldingSequenceArray = response.data;
            if (this.mConfigData) {
              console.log(this.mConfigData);
              this.weldingSequence(this.mConfigData.ws_id);
            }
           }
        }
      }
    );
  }

  getWeldingMaterial() {
    this.weldingMaterialService.getWeldingMaterial().subscribe(
      response => {
        console.log(response);
        if (!response.status || response.satus === 401) {
          this.errorMsg = 'Unauthorized';
        } else {
          if (response.message === 'WELDING_MATERIAL_LIST') {
            this.errorMsg = '';
            console.log(response.data);
            this.weldingMaterialArray = response.data;
            if (this.mConfigData) {
              console.log(this.mConfigData);
              this.weldingMaterial(this.mConfigData.wm_id);
            }
           }
        }
      }
    );
  }

  configPressEnter(){
    this.mConfigData ? this.update() : this.save();
  }

}
