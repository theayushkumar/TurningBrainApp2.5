import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/servies/crud.service';
import { SharedService } from 'src/app/servies/shared.service';
import { Device } from '@capacitor/device';

@Component({
  selector: 'app-videoslist',
  templateUrl: './videoslist.component.html',
  styleUrls: ['./videoslist.component.css']
})
export class VideoslistComponent implements OnInit {
  video_data: any
  subject: string = ''
  unit: any
  unit_id: number = 0
  login: any
  login_data: any
  SubscriptionStatus: any
  constructor(
    private _shared: SharedService,
    private _crud: CrudService,
    private _router: Router
  ) {

    this.login = localStorage.getItem('userData')
    this.login_data = JSON.parse(this.login)
    console.log(this.login_data);
    this.SubscriptionStatus = this.login_data.SubscriptionStatus
  }

  ngOnInit(): void {
    this.unit = localStorage.getItem('unitid')
    this.unit_id = JSON.parse(this.unit)
    this.get_videoList(this.unit_id)
  }


  get_videoList(id: number) {
    this._crud.get_videos(id).subscribe(
      (res: any) => {
        console.log(res);
        this.video_data = res
        this.subject = res[0].Unit
      }
    )
  }

  onPlay(id: number, type: string) {
    if (type == 'Unpaid') {
      this._shared.video_id.next(id)
      this._router.navigate(['/plyvideo'])
    }


    if (type == 'Paid') {
      this.getValidity(this.login_data.Id)
    }
  }






  getValidity(id: any) {
    console.log(this.login_data);
    this._crud.getValidity(id).subscribe(
      (res: any) => {
        console.log(res.SubscriptionStatus);
        if (res.SubscriptionStatus == 1) {
          this.logDeviceInfo(id)
        } else {
          this._router.navigate(['/proLock2'])
        }

      }
    )
  }

  async logDeviceInfo(id: any) {
    try {
      const deviesId = await Device.getId();
      const info = await Device.getInfo();
      // this.updateDeviesId(deviesId.identifier, info.model)
      if (deviesId.identifier == this.login_data.DeviceId) {
        this._router.navigate(['/plyvideo'])
        this._shared.video_id.next(id)
      } else {
        this._shared.tostErrorTop(`You can watch paid videos only on registered devices. Please check your device's ID in your profile and contact us.`)
      }
    } catch (error) {
      console.error('Unable to get device information:', error);
    }
  }

}


