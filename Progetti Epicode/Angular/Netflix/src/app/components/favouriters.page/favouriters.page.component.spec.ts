import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouritersPageComponent } from './favouriters.page.component';

describe('FavouritersPageComponent', () => {
  let component: FavouritersPageComponent;
  let fixture: ComponentFixture<FavouritersPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavouritersPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavouritersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
