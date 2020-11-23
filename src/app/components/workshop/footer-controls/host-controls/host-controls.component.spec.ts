import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HostControlsComponent } from './host-controls.component';
import { RestService } from '../../../../services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('HostControlsComponent', () => {
  let component: HostControlsComponent;
  let fixture: ComponentFixture<HostControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HostControlsComponent
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
    fixture = TestBed.createComponent(HostControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
