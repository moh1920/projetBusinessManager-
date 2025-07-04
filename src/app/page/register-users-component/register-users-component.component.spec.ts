import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUsersComponentComponent } from './register-users-component.component';

describe('RegisterUsersComponentComponent', () => {
  let component: RegisterUsersComponentComponent;
  let fixture: ComponentFixture<RegisterUsersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterUsersComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterUsersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
