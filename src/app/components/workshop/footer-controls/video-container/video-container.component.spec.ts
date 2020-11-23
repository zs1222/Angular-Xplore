import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VideoContainerComponent } from './video-container.component';
import { RestService } from '../../../../services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VideoContainerComponent', () => {
  let component: VideoContainerComponent;
  let fixture: ComponentFixture<VideoContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VideoContainerComponent
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
    fixture = TestBed.createComponent(VideoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
