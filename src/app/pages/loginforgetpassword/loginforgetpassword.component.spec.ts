import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginforgetpasswordComponent } from './loginforgetpassword.component';

describe('LoginforgetpasswordComponent', () => {
  let component: LoginforgetpasswordComponent;
  let fixture: ComponentFixture<LoginforgetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginforgetpasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginforgetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
