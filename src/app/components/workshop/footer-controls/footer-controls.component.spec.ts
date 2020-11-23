/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterControlsComponent } from './footer-controls.component';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';

describe('FooterControlsComponent', () => {
  let component: FooterControlsComponent;
  let fixture: ComponentFixture<FooterControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterControlsComponent);
    component = fixture.componentInstance;
    component.loggedInUser = new WorkshopParticipant();
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
