import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDettagliateComponent } from './info-dettagliate.component';

describe('InfoDettagliateComponent', () => {
  let component: InfoDettagliateComponent;
  let fixture: ComponentFixture<InfoDettagliateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDettagliateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDettagliateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
