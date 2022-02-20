import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadohumorComponent } from './estadohumor.component';
import {HttpClientModule} from '@angular/common/http';

describe('EstadohumorComponent', () => {
  let component: EstadohumorComponent;
  let fixture: ComponentFixture<EstadohumorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadohumorComponent ],
      imports:[HttpClientModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadohumorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
