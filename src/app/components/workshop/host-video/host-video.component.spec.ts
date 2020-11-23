/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostVideoComponent } from './host-video.component';
import { RestService } from 'src/app/services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HostVideoComponent', () => {
  let component: HostVideoComponent;
  let fixture: ComponentFixture<HostVideoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostVideoComponent
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
    fixture = TestBed.createComponent(HostVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
