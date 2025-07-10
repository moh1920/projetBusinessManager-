import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleEntrepriseComponent } from './module-entreprise.component';

describe('ModuleEntrepriseComponent', () => {
  let component: ModuleEntrepriseComponent;
  let fixture: ComponentFixture<ModuleEntrepriseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModuleEntrepriseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuleEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
