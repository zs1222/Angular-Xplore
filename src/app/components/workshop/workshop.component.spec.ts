/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { WorkshopComponent } from './workshop.component';
import { MockFooterControlsComponent } from '../mocks/mock-footer-controls.component';
import { MockHostVideoComponent } from '../mocks/mock-host-video.component';
import { MockSidebarComponent } from '../mocks/mock-sidebar.component';
import { MockWebGlComponent } from '../mocks/mock-web-gl.component';
import { RestService } from '../../services/http/rest/rest.service';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';
import { LoginService } from 'src/app/services/login/login.service';
import { PhotonService } from 'src/app/services/photon/photon.service';

describe('WorkshopComponent', () => {
  let component: WorkshopComponent;
  let fixture: ComponentFixture<WorkshopComponent>;
  let mockLoginService;
  let mockPhotonService;
  const participant = new WorkshopParticipant();

  beforeEach(async(() => {

    mockLoginService = jasmine.createSpyObj(['getParticipant']);
    mockLoginService.getParticipant.and.returnValue(participant);
    mockPhotonService = jasmine.createSpyObj(['connectToPhotonRoom']);

    TestBed.configureTestingModule({
      declarations: [
        WorkshopComponent,
        MockFooterControlsComponent,
        MockHostVideoComponent,
        MockSidebarComponent,
        MockWebGlComponent
      ],
      imports: [
        RouterTestingModule.withRoutes([
          {
            path: 'workshop/:workshopId/:userId',
            component: WorkshopComponent,
            children: [
              {
                path: '3D',
                component: MockWebGlComponent
              }
            ]
          }
        ]),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              workshopId: '5555'
            }),
            queryParams: of({
              participantId: '1234'
            })
          }
        },
        {
          provide: LoginService,
          useValue: mockLoginService
        },
        {
          provide: PhotonService,
          useValue: mockPhotonService
        },
        RestService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopComponent);
    component = fixture.componentInstance;
    spyOn(component.router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should route to 3D component', () => {
      expect(component.router.navigate).toHaveBeenCalledWith(['3D'], { relativeTo: component.route });
    });
  });
});
