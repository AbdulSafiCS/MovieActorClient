// import { ComponentFixture, TestBed } from '@angular/core/testing';

// import { CityComponent } from './actors.component';

// describe('CityComponent', () => {
//   let component: CityComponent;
//   let fixture: ComponentFixture<CityComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [CityComponent],
//     }).compileComponents();

//     fixture = TestBed.createComponent(CityComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActorsComponent } from './actors.component'; // Updated to reflect the ActorComponent

describe('ActorComponent', () => {
  let component: ActorsComponent;
  let fixture: ComponentFixture<ActorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActorsComponent], // Updated import to ActorComponent
    }).compileComponents();

    fixture = TestBed.createComponent(ActorsComponent); // Updated to create ActorComponent
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
