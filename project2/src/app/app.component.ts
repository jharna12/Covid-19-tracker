import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'project2';
  // constructor(private  oauthService: OAuthService){}

  // private async ConfigureAuth():Promise<void>{
  // this.oauthService.loginUrl='https://login.microsoftonline.com/9ec57533-cbc1-43fd-9e10-3579b719e953/oauth2/v2.0/authorize';
  // this.oauthService.clientId='a50f8c1d-8dbd-4c2a-b74b-e349b28755aa';
  //  this.oauthService.resource=''; 
  // this.oauthService.logoutUrl=''; 
  // this.oauthService.redirectUri= window.location.origin+'/'; 
  // this.oauthService.scope= 'openid';
  // this.oauthService.oidc=true;
  // this.oauthService.setStorage(sessionStorage);
  // }
  // async ngOnInit(){
  //   await this.ConfigureAuth();
  //   this.oauthService.tryLogin({});
  //   if(!this.oauthService.getAccessToken()){
  //     await this.oauthService.initImplicitFlow();
  //   }
  //   console.log(this.oauthService.getAccessToken());
  // }
}
