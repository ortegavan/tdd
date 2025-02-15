import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoItemsComponent } from './no-items.component';
import { By } from '@angular/platform-browser';

describe('NoItemsComponent', () => {
    let fixture: ComponentFixture<NoItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoItemsComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(NoItemsComponent);
        fixture.detectChanges();
    });

    it('deve renderizar mensagem de empty state', () => {
        const element = fixture.debugElement.query(
            By.css('[data-testid="message"]')
        );
        const message = element.nativeElement.textContent;

        expect(message).toBe('Nenhuma tarefa encontrada');
    });
});
