import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDeTarefasComponent } from './item-de-tarefas.component';

describe('ItemDeTarefasComponent', () => {
  let component: ItemDeTarefasComponent;
  let fixture: ComponentFixture<ItemDeTarefasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemDeTarefasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemDeTarefasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
