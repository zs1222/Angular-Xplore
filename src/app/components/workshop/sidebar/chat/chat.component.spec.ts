import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChatComponent } from './chat.component';
import { WorkshopParticipant } from '../../../../models/workshop-participant';
import { LoginService } from '../../../../../../src/app/services/login/login.service';
import { RestService } from '../../../../services/http/rest/rest.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let mockLoginService;
  const participant = new WorkshopParticipant();

  beforeEach(async(() => {

    mockLoginService = jasmine.createSpyObj(['getParticipant']);
    mockLoginService.getParticipant.and.returnValue(participant);

    TestBed.configureTestingModule({
      declarations: [
        ChatComponent
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
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
