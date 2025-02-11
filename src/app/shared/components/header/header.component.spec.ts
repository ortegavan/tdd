import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
    let fixture: ComponentFixture<HeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        fixture.detectChanges();
    });

    it('deve renderizar o título corretamente', () => {
        const elemento = fixture.debugElement.query(By.css('h1')).nativeElement;
        expect(elemento.textContent.trim()).toBe('Gerenciador de tarefas');
    });
});
