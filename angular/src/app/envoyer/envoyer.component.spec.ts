import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoyerComponent } from './envoyer.component';

describe('EnvoyerComponent', () => {
  let component: EnvoyerComponent;
  let fixture: ComponentFixture<EnvoyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvoyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
