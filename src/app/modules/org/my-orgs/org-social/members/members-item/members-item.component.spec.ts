import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersItemComponent } from './members-item.component';

describe('MembersItemComponent', () => {
  let component: MembersItemComponent;
  let fixture: ComponentFixture<MembersItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MembersItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
