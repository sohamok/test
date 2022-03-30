import { Component, ElementRef, HostListener, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as io from 'socket.io-client';
import { MachineService } from 'src/app/service/machine.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog,MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';



import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexAnnotations,
  ApexDataLabels,
  ApexGrid,
  ApexStroke,
  ApexMarkers,
  ApexYAxis,
  ApexLegend
} from "ng-apexcharts";

import { ThresholdSettingComponent } from '../threshold-setting/threshold-setting.component';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  annotations: ApexAnnotations;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  markers: ApexMarkers;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  legend: ApexLegend;
  // grid: ApexGrid;
  // labels: string[];
  // title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-realtime',
  templateUrl: './realtime.component.html',
  styleUrls: ['./realtime.component.scss'],
  encapsulation : ViewEncapsulation.None

})
export class RealtimeComponent implements OnInit {

// @ViewChild('currentID', { static: true }) currentID: any;
@ViewChild('chartcurr') chartcurr: ChartComponent;
@ViewChild('chartvolt') chartvolt: ChartComponent;
@ViewChild('chartgas') chartgas: ChartComponent;

  hardware:any;
  hwForm: any;
  current: ChartOptions;
  voltage: ChartOptions;
  gasFR: ChartOptions;

  currentUcl:any;
  currentSet:any;
  currentLcl:any;
  currentValue:any;

  voltageUcl:any;
  voltageSet:any;
  voltageLcl:any;
  voltageValue:any;

  gasFRUcl:any;
  gasFRSet:any;
  gasFRLcl:any;
  gasFRValue:any;




  ambtemp: any;
  machinetemp: any;
  errorMsg: string;
  socket: io.Socket;
  socketUrl: string;


  constructor( private machineService: MachineService,private spinner: NgxSpinnerService,private dialog: MatDialog,) {
    

    
    //this.socket = io.connect("http://localhost:3000");
    this.socketUrl = environment.socketServerUrl;

    this.socket = io.connect(this.socketUrl);


    this.hwForm = new FormGroup({
      hardware :new FormControl('', [
      ])
    })


    this.current = {
      series: [
        {
          name: "Current",
          data: [[Date.now(), Math.floor(0.0)]],
        },
      ],

      annotations: {
        yaxis: [
          {
            y: "100", //high_weld_cur_threshold,
            //strokeDashArray: 0,
            borderColor: "#ff0e0e",
            label: {
              borderColor: "#ff0e0e",
              style: {
                color: "#fff",
                background: "#ff0e0e",
              },
              text: "UCL @ 100" //+ high_weld_cur_threshold,
            },
          },
          {
            y: "80", //set_weld_cur_threshold,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "SET @ 80" //+ set_weld_cur_threshold,
            },
          },
          {
            y: "60", //low_weld_cur_threshold,
            borderColor: "#00008b",
            label: {
              borderColor: "#00008b",
              style: {
                color: "#fff",
                background: "#00008b",
              },
              text: "LCL @ 60" //+ low_weld_cur_threshold,
            },
          },
        ],
      },
      chart: {
        id: "realtime",
        height: 250,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: "Machine ID: 869247043362690",
      //   align: "right",
      // },
      markers: {
        size: 0,
      },  
      xaxis: {
        type: "datetime",
        range: 120000,
        labels: {
          datetimeUTC: false,
          format: 'hh:mm:ss TT',
        }
      },
      yaxis: {
        floating: false,
        // decimalsInFloat: false,
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: "left",
        onItemClick: {
          toggleDataSeries: false,
        },
        position: "top",
        offsetY: -28,
        offsetX: 60,
      },
    }

    this.voltage = {
      series: [
        {
          name: "voltage",
          data: [[Date.now(), Math.floor(0.0)]],
        },
      ],
      annotations: {
        yaxis: [
          {
            y: "26",    //high_weld_volt_threshold,
            borderColor: "#ff0e0e",
            label: {
              borderColor: "#ff0e0e",
              style: {
                color: "#fff",
                background: "#ff0e0e",
              },
              text: "UCL @ 26"// + high_weld_volt_threshold,
            },
          },
          {
            y: "20",  //set_weld_volt_threshold,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "SET @ 20" // + set_weld_volt_threshold,
            },
          },
          {
            y: "16", //low_weld_volt_threshold,
            borderColor: "#00008b",
            label: {
              borderColor: "#00008b",
              style: {
                color: "#fff",
                background: "#00008b",
              },
              text: "LCL @ 16" //+ low_weld_volt_threshold,
            },
          },
        ],
      },
      chart: {
        id: "realtime",
        height: 250,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
  
      xaxis: {
        type: "datetime",
        range: 120000,
        labels: {
          datetimeUTC: false,
          format: 'hh:mm:ss TT',
        }
      },
      yaxis: {
        floating: false,
        // decimalsInFloat: false,
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: "left",
        onItemClick: {
          toggleDataSeries: false,
        },
        position: "top",
        offsetY: -28,
        offsetX: 60,
      },
    }

    this.gasFR = {
      series: [
        {
          name: "gasFR",
          data: [[Date.now(), Math.floor(0.0)]],
        },
      ],
      annotations: {
        yaxis: [
          {
            y: "23", //high_weld_gas_threshold,
            borderColor: "#ff0e0e",
            label: {
              borderColor: "#ff0e0e",
              style: {
                color: "#fff",
                background: "#ff0e0e",
              },
              text: "UCL @ 23" //+ high_weld_gas_threshold,
            },
          },
          {
            y: "19", //set_weld_gas_threshold,
            borderColor: "#00E396",
            label: {
              borderColor: "#00E396",
              style: {
                color: "#fff",
                background: "#00E396",
              },
              text: "SET @ 19" //+ set_weld_gas_threshold,
            },
          },
          {
            y: "16", //low_weld_gas_threshold,
            borderColor: "#00008b",
            label: {
              borderColor: "#00008b",
              style: {
                color: "#fff",
                background: "#00008b",
              },
              text: "LCL @ 16" // + low_weld_gas_threshold,
            },
          },
        ],
      },
      chart: {
        id: "realtime",
        height: 250,
        type: "line",
        animations: {
          enabled: true,
          easing: "linear",
          dynamicAnimation: {
            speed: 1000,
          },
        },
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
        dropShadow: {
          enabled: true,
          opacity: 0.3,
          blur: 5,
          left: -7,
          top: 22,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      // title: {
      //   text: "Machine ID: 869247043362690",
      //   align: "right",
      // },
      markers: {
        size: 0,
      },
  
      xaxis: {
        type: "datetime",
        range: 120000,
        labels: {
          datetimeUTC: false,
          format: 'hh:mm:ss TT',
        }
      },
      yaxis: {
        floating: false,
        // decimalsInFloat: false,
      },
      legend: {
        show: true,
        floating: true,
        horizontalAlign: "left",
        onItemClick: {
          toggleDataSeries: false,
        },
        position: "top",
        offsetY: -28,
        offsetX: 60,
      },
    }

  }

  async ngOnInit()  {
    this.getMachineThreshold().then((value)=>{
      console.log(value)
      this.socket.emit("unsubscribe",value)
      
      this.socket.on('connection',()=>{
        console.log('works!');
      });
    })
  }


  onHwChange(ob) {

    //this.socket.removeAllListeners();
    //this.socket.off();
    //this.socket.emit("reconnect");
    console.log('Hardware changed...');
    console.log(this.hardware);
    console.log(ob.value);
    
    // const [connected, setConnected] = useState(false);
    



    let currentdata = [];
    let voltagedata = [];
    let gasFRdata = [];

    this.socket.emit("unsubscribe",this.hardware)
    let selectedhw = ob.value.hardware_id;
    console.log(selectedhw);
    //this.socket.emit("removeListeners");

    //this.socket.removeListener(`${selectedhw}`);
    //this.socket.off(`${selectedhw}`);
    //this.socket.emit("disconnect");
    //this.socket.emit("connection");

    // let hwobj=this.hardware.find(item => item.hardware_id == selectedhw)
    let hwobj = ob.value
    console.log(hwobj);

    //For Current Thresholds
    this.current.annotations.yaxis[0].y = hwobj.high_weld_cur_threshold;
    this.current.annotations.yaxis[0].label.text = "UCL @"+hwobj.high_weld_cur_threshold;

    this.current.annotations.yaxis[1].y = hwobj.set_weld_cur_threshold;
    this.current.annotations.yaxis[1].label.text = "SET @"+hwobj.set_weld_cur_threshold;

    this.current.annotations.yaxis[2].y = hwobj.low_weld_cur_threshold;
    this.current.annotations.yaxis[2].label.text = "LCL @"+hwobj.low_weld_cur_threshold;

    this.currentUcl = hwobj.high_weld_cur_threshold;
    this.currentSet = hwobj.set_weld_cur_threshold;
    this.currentLcl = hwobj.low_weld_cur_threshold;


    //For Voltage Thresholds
    this.voltage.annotations.yaxis[0].y = hwobj.high_weld_volt_threshold;
    this.voltage.annotations.yaxis[0].label.text = "UCL @"+hwobj.high_weld_volt_threshold;

    this.voltage.annotations.yaxis[1].y = hwobj.set_weld_volt_threshold;
    this.voltage.annotations.yaxis[1].label.text = "SET @"+hwobj.set_weld_volt_threshold;

    this.voltage.annotations.yaxis[2].y = hwobj.low_weld_volt_threshold;
    this.voltage.annotations.yaxis[2].label.text = "LCL @"+hwobj.low_weld_volt_threshold;

    this.voltageUcl = hwobj.high_weld_volt_threshold;
    this.voltageSet = hwobj.set_weld_volt_threshold;
    this.voltageLcl = hwobj.low_weld_volt_threshold;

    //For GasFR Thresholds
    this.gasFR.annotations.yaxis[0].y = hwobj.high_weld_gas_threshold;
    this.gasFR.annotations.yaxis[0].label.text = "UCL @"+hwobj.high_weld_gas_threshold;

    this.gasFR.annotations.yaxis[1].y = hwobj.set_weld_gas_threshold;
    this.gasFR.annotations.yaxis[1].label.text = "SET @"+hwobj.set_weld_gas_threshold;

    this.gasFR.annotations.yaxis[2].y = hwobj.low_weld_gas_threshold;
    this.gasFR.annotations.yaxis[2].label.text = "LCL @"+hwobj.low_weld_gas_threshold;

    this.gasFRUcl = hwobj.high_weld_gas_threshold;
    this.gasFRSet = hwobj.set_weld_gas_threshold;
    this.gasFRLcl = hwobj.low_weld_gas_threshold;
    

    // console.log(this.current.annotations.yaxis[0].y);
    // console.log(this.current.annotations.yaxis[0].label.text);


    
    this.socket.emit("subscribe",selectedhw)
    this.socket.on(`${selectedhw}`, (value) => {
      console.log(value);
      

      currentdata.push([ value.tm, value.cur])
      console.log(currentdata)
      //console.log(typeof currentdata)

      this.current.series = [{
        data: currentdata
      }];

      this.currentValue = value.cur;


      voltagedata.push([ value.tm, value.volt])
      //console.log(voltagedata)
      //console.log(typeof voltagedata)

      this.voltage.series = [{
        //data: [[ value.tm, value.cur]]
        data: voltagedata

      }];

      this.voltageValue = value.volt;

      gasFRdata.push([ value.tm, value.gasFR])
      //console.log(gasFRdata)
      //console.log(typeof gasFRdata)

      this.gasFR.series = [{
        //data: [[ value.tm, value.cur]]
        data: gasFRdata

      }];

      this.gasFRValue = value.gasFR;

      this.ambtemp = value.ambtemp;
      //console.log("amptemp:",this.ambtemp)

      this.machinetemp = value.hstemp;
   });
  }
  
  ngOnDestroy(): void {
    this.socket.emit('unsubscribe',this.hardware);
    this.socket.disconnect();
  }

  getMachineThreshold() {
    this.spinner.show();
    return new Promise((resolve,rejects)=>{
      this.machineService.getMachineThreshold().subscribe(
        res => {
          console.log(res);
          if (!res.status || res.status === 401) {
            this.errorMsg = 'Unauthorized';
            console.log(this.errorMsg);
            if (res.message === 'NO_MACHINE_FOUND') {
              console.log('no machine found');
              this.hardware = res.data;
              this.spinner.hide();
              rejects('');
            }
          } else {
            if (res.message === 'CONFIG_LIST_BY_MACHINE') {
              this.errorMsg = '';
              if (res.data != null) {
                console.log('------getHardwares------');
                console.log(res.data);
                this.hardware = res.data;
                this.spinner.hide();
                resolve(this.hardware);

              }
            }
          }
        }
      );
    })
    
  }

  thresholdSettings(element?){
    const dialogRef = this.dialog.open(ThresholdSettingComponent, {
      width: '94vh',
      height: '50vh',
      data: {
        element : this.hwForm.value.hardware,
      },
      disableClose: true,
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('The dialog was closed');
        // console.log(result.event);
        if (result.event === 'Update') {
          window.location.reload();
        }
      // this.getMachineThreshold();
    });
  }

}
