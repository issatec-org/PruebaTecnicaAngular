import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  apiURL: string = 'https://demos.issatec.com/Lobby-API-ACS/api';
  customerResult: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const usuario = JSON.parse(
      localStorage.getItem('authSession') || '{}'
    ).usuario;
    const contraseña = JSON.parse(
      localStorage.getItem('authSession') || '{}'
    ).contraseña;

    this.getCustomer(contraseña).subscribe((result)=> {
      this.customerResult = result;
    });
  }

  getCustomer(personalId: string) {
    return this.http.get<any>(`${this.apiURL}/Customer/GetCustomerByIdTypeId/${personalId}/17`);
  }

  updateCustomer(
    Id: number,
    EMail: string,
    LastName: string,
    FirstName: string,
    PersonalId: string,
    TelNumber1: string
  ) {
    const body = {
      Id,
      Sex: 0,
      IdTypeId: 17,
      EMail,
      DOB: true,
      IsActive: true,
      LastName,
      FirstName,
      IdTypeName: 'CC',
      PersonalId,
      TelNumber1,
      TelNumber2: '',
      CustomerLevelId: 0,
      CustomerLevelName: '',
      ExtRef: '',
    };

    return this.http.post(
      `${this.apiURL}/Customer/UpdateCustomer`,
      body
    );
  }
}
