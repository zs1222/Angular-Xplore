import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoControlsComponent } from './video-controls.component';
import { RestService } from 'src/app/services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';

describe('VideoControlsComponent', () => {
  let component: VideoControlsComponent;
  let fixture: ComponentFixture<VideoControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VideoControlsComponent ],
      providers: [ RestService ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoControlsComponent);
    component = fixture.componentInstance;
    component.workshopParticipant = new WorkshopParticipant();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
