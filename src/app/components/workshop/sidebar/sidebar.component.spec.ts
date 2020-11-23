/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { RestService } from '../../../services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WorkshopParticipant } from 'src/app/models/workshop-participant';
import { LoginService } from 'src/app/services/login/login.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let mockLoginService;
  const participant = new WorkshopParticipant();

  beforeEach(async(() => {

    mockLoginService = jasmine.createSpyObj(['getParticipant']);
    mockLoginService.getParticipant.and.returnValue(participant);

    TestBed.configureTestingModule({
      declarations: [
        SidebarComponent
      ],
      providers: [
        {
          provide: LoginService,
          useValue: mockLoginService
        },
        RestService
      ],
      imports: [
        HttpClientTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
