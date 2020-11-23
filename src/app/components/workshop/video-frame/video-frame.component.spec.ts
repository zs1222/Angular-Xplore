import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoFrameComponent } from './video-frame.component';
import { WorkshopParticipant } from '../../../models/workshop-participant';
import { RestService } from '../../../services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoFrameComponent', () => {
  let component: VideoFrameComponent;
  let fixture: ComponentFixture<VideoFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoFrameComponent
      ],
      providers: [
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoFrameComponent);
    component = fixture.componentInstance;
    component.participant = new WorkshopParticipant();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
