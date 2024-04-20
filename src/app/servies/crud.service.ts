import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  base_url: string = 'https://turningbrain.in/api/'
  constructor(
    private http: HttpClient
  ) {

  }


  reg_post(data: any) {
    return this.http.post(`${this.base_url}Registration`, data);
  }

  get_profile(id: Number) {
    return this.http.get(`${this.base_url}UserProfile/${id}`)
  }

  profile_update(data: any, id: number) {
    return this.http.post(`${this.base_url}UserProfile/${id}`, data)
  }

  login(data: any) {
    return this.http.post(`${this.base_url}Login`, data)
  }

  get_user() {
    return this.http.get(`${this.base_url}StudentApi`)
  }


  get_course() {
    return this.http.get(`${this.base_url}Course`)
  }

  get_subject(id: number) {
    return this.http.get(`${this.base_url}Subject/${id}`)
  }


  get_unit(data: any) {
    return this.http.post(`${this.base_url}Unit`, data)
  }


  get_packages(data: any) {
    return this.http.post(`${this.base_url}StudentSelectSubscription`, data)
  }



  get_videos(id: number) {
    return this.http.get(`${this.base_url}VideoView?UnitId=${id}`)
  }

  get_free_Video() {
    return this.http.post(`${this.base_url}VideoView`, '')
  }

  get_Suggestionvideo(data: any) {
    return this.http.post(`${this.base_url}/suggestedVideo`, data)
  }


  send_email_otp(data: any) {
    return this.http.post(`${this.base_url}/OTPApi`, data)
  }

  get_banner() {
    return this.http.get(`${this.base_url}/Banner`)
  }

  mobileEmailVerify(id: any) {
    return this.http.get(`${this.base_url}/Login?parm=${id}`)
  }

  get_QBlist(data: any) {
    return this.http.post(`${this.base_url}AllQbank`, data)
  }

  get_mcq(data: any) {
    return this.http.post(`${this.base_url}AllMCQ`, data)
  }

  get_mix_mcq(data: any) {
    return this.http.post(`${this.base_url}/AllMixMCQ`, data)
  }

  get_suggest_mcq(data: any) {
    return this.http.post(`${this.base_url}/Suggestionvideo`, data)
  }

  //  for sign up and forget 
  // email working areaa 

  emailVerify(email: string) {
    return this.http.post(`https://turningbrain.in/api/VerifyOTP?EmailId=${email}`, email)
  }

  get_validity(user_id: any) {
    return this.http.post(`https://turningbrain.in/api/Payment_Confirmation?UserId=${user_id}`, user_id)
  }

  // email send otp
  send_otp_email(email: string) {
    return this.http.post(`${this.base_url}`, '')
  }

  // email send otp
  veryfy_otp(email: string, data: any) {
    return this.http.post(`${this.base_url}`, '')
  }

  SendOTPforgetPassword(email: any) {
    return this.http.post(`${this.base_url}/Forget?EmailId=${email}`, email)
  }
  veryfy_otpFrogetPassword(email: string, data: any) {
    return this.http.post(`${this.base_url}/VerifyOTP?EmailId=${email}`, data)
  }

  changePasswordForget(email: string, password: string) {
    return this.http.post(`${this.base_url}/changepasswordwithEmail?EmailId=${email}&Password=${password}`, '')
  }


  change_password(email: string, password: string) {
    console.log(email + "e");
    console.log(password + "p");

    return this.http.post(`${this.base_url}/changepasswordwithEmail?EmailId=${email}&Password=${password}`, '')
  }



  getValidity(id: any) {
    return this.http.get(`${this.base_url}UserProfile/${id}`)
  }

  get_suggess_mcq(id: any) {
    return this.http.post(`${this.base_url}AllMixQuestion?course=${id}`, {})
  }

  get_countery() {
    return this.http.get(`https://restcountries.com/v2/all`)
  }

  marks_mcq(data: any) {
    return this.http.post(`https://turningbrain.in/api/AllMixQuestion`, data)
  }

  get_review_mcq(id: any) {
    return this.http.post(`https://turningbrain.in/api/AllMixQuestion?UserId=${id}`, {})
  }

  mcq_delele(id: Number) {
    return this.http.post(`${this.base_url}/AllMixQuestion?UserId=${id}&UserName=Kalyan`, {})
  }

  GetACallBack(data: any) {
    return this.http.post(`${this.base_url}/RequestCallBack`, data)
  }

  DeviesIdUpdate(id: any, data: any) {
    return this.http.post(`${this.base_url}/UpdateDevice?Id=${id}`, data)
  }

  getCallageByState(state: string) {
    return this.http.get(`https://turningbrain.in/api/collegeData?StateName=${state}`)
  }

  getAppNewUpdate(){
    return  this.http.get(`https://turningbrain.in/api/AppVersion`)
  }
}
