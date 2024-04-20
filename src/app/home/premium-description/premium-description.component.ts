import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/servies/crud.service';
import { RazorpayService } from 'src/app/servies/razorpay.service';
import { SharedService } from 'src/app/servies/shared.service';
import { Checkout } from 'capacitor-razorpay';
import { Device } from '@capacitor/device';


@Component({
  selector: 'app-premium-description',
  templateUrl: './premium-description.component.html',
  styleUrls: ['./premium-description.component.css']
})
export class PremiumDescriptionComponent implements OnInit {
  premium_data: any
  data: any
  plan_name: string = ''
  course_id: number = 0
  login_data: any
  user_data: any
  sub_id: any
  orderId: any
  subscription_data: any
  payData: any
  constructor(
    private _shared: SharedService,
    private _crud: CrudService,
    private _formBuilder: FormBuilder,
    private razorpayService: RazorpayService,
    private _router: Router

  ) {
    this.login_data = localStorage.getItem('userData')
    const data = JSON.parse(this.login_data)
    this.user_data = data
  }

  toppings = this._formBuilder.group({
    condations: false,
  });

  ngOnInit(): void {


    this.data = localStorage.getItem('PayDesc')
    this.premium_data = JSON.parse(this.data)

    console.log(this.premium_data);

  }
  payNow(data: any) {
    console.log(this.toppings.get('condations')?.value);
    if (this.toppings.get('condations')?.value == false) {
      this._shared.tostErrorTop('Plz.. Mark Checkbox')
      return
    }
    console.log(data);
    this.subscription_data = data
    const amount = data.Price1months
    this.createOrderL(amount)



  }


  // for live data base .net 
  createOrderL(amount: string): void {
    this.razorpayService.createOrderLive(amount)
      .subscribe(
        (response) => {
          console.log(response.Attributes);
          this.orderId = response.Attributes.id;
          this.payWithLive(response.Attributes.id, response.Attributes.amount)
          // this.payWithLocal(response.Attributes.id, response.Attributes.amount)
        },
        (error) => {
          console.error(error);
        }
      );
  }

  async payWithLive(order_id: string, amount: string) {
    const options = {
      // key: 'rzp_test_YGORtbwcCRzFxD', //test
      key: 'rzp_live_nrumEje16i8mje', //live
      amount: amount,
      description: 'Turning Brain',
      image: 'https://turningbrain.in/website/assets/images/logo.png',
      order_id: order_id,
      currency: 'INR',
      name: 'Turning Brain',
      prefill: {
        name: this.user_data.Name,
        email: this.user_data.EmailId,
        contact: this.user_data.MobileNo
      },
      theme: {
        color: '#f49004'
      }
    }


    try {
      let data = (await Checkout.open(options));
      console.log(data.response);
      this.payData = data.response
      this.verifyPaymentLive(data.response)
    } catch (error) {
      console.log(error);
      this.PaymentFaildInsert(error)

    }
  }


  verifyPaymentLive(data: any) {
    console.log(data);

    const order_id = data.razorpay_order_id;
    const payment_id = data.razorpay_payment_id;
    const razorpay_signature = data.razorpay_signature;

    this.razorpayService.verifyOrderLive(order_id, payment_id, razorpay_signature)
      .subscribe(
        (response) => {
          console.log(response);

          if (response === 'Success') {
            this.PaymentSuccess()
          }
        },

        (error) => {
          console.error(error);
          alert('Payment Faild Try again')

        }
      );
  }



  PaymentFaildInsert(res: any) {
    const data = {
      UserId: this.user_data.Id,
      CourseId: this.subscription_data.Course,
      SubjectId: this.subscription_data.Subject,
      OrderId: res.metadata.order_id,
      PaymentId: res.metadata.payment_id,
      Price: this.subscription_data.Price1months,
      TimeDuration: parseInt(this.subscription_data.OneMonths.match(/\d+/)[0]),
      Status: "Failed",
      PayFailedReason: res.reason,
      PaymentMode: "through UPI",
    }


    console.log(data);

    this.razorpayService.PaymentFaildInsert(data).subscribe(
      (res: any) => {
        console.log(res);
        this._shared.tostErrorTop(res)

      }
    )
  }



  PaymentSuccess() {
    console.log(`this.user_data.Id${this.user_data.Id}`);
    console.log(`Course${this.subscription_data.Course}`);
    console.log(`Subject${this.subscription_data.Subject}`);
    console.log(`razorpay_order_id${this.payData.razorpay_order_id}`);
    console.log(`razorpay_payment_id${this.payData.razorpay_payment_id}`);
    console.log(`razorpay_signature${this.payData.razorpay_signature}`);
    console.log(`Price1months${this.subscription_data.Price1months}`);
    console.log(`OneMonths${this.subscription_data.OneMonths}`);


    const data = {
      UserId: this.user_data.Id,
      CourseId: this.subscription_data.Course,
      SubjectId: this.subscription_data.Subject,
      OrderId: this.payData.razorpay_order_id,
      PaymentId: this.payData.razorpay_payment_id,
      SignatureId: this.payData.razorpay_signature,
      Price: this.subscription_data.Price1months,
      TimeDuration: parseInt(this.subscription_data.OneMonths.match(/\d+/)[0]),

      Status: "Success",
    }

    console.log(data)
    this.razorpayService.PaymentSuccessInsert(data).subscribe(
      (res: any) => {
        console.log(res);
        // alert(res)
        this._shared.tostSuccessTop('Payment Success')
        this.logDeviceInfo()
      }
    )

  }


  RequstCall() {
    const data = JSON.parse(this.login_data)
    console.log(data);
    console.log(data.Name);
    console.log(data.MobileNo);
    console.log(data.EmailId);

    const fbData = new FormData()
    fbData.append('Name', data.Name)
    fbData.append('Email', data.EmailId)
    fbData.append('Mobile', data.MobileNo)
    this.send_mail(fbData)
  }
  send_mail(data: any) {
    this._crud.GetACallBack(data).subscribe(
      (res: any) => {
        console.log(res);
        if (res == 'Success') {
          this._shared.tostSuccessTop('Callback request successful. We will contact you shortly.')
        }
      }
    )
  }




  async logDeviceInfo() {
    try {
      const deviesId = await Device.getId();
      const info = await Device.getInfo();
      this.updateDeviesId(deviesId.identifier, info.model)
    } catch (error) {
      console.error('Unable to get device information:', error);
    }
  }

  updateDeviesId(deviid: string, model: string) {
    console.log("deviesid", deviid);
    console.log("model", model);
    console.log("userid", this.user_data.Id);

    const formData = new FormData()
    formData.append('Deviceid', deviid)
    formData.append('ModelNo', model)
    this._crud.DeviesIdUpdate(this.user_data.Id, formData).subscribe(
      (res: any) => {
        console.log(res);
        this._router.navigate(['/home'])
      }
    )
  }


}
