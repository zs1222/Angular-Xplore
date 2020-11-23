/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WebGlComponent } from './web-gl.component';
import { RestService } from '../../../services/http/rest/rest.service';

describe('WebGlComponent', () => {
  let component: WebGlComponent;
  let fixture: ComponentFixture<WebGlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebGlComponent ],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        RestService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebGlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
