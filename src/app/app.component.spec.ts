import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';
import { HeaderComponent } from './shared/components/header/header.component';
import { FakeHeaderComponent } from '@testing/mocks/fake-feader.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({}).compileComponents();

        TestBed.overrideComponent(AppComponent, {
            remove: {
                imports: [HeaderComponent],
            },
            add: {
                imports: [FakeHeaderComponent],
            },
        });
    });

    it('deve renderizar o componente header', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const element = fixture.debugElement.query(By.css('app-header'));
        expect(element).toBeTruthy();
    });

    it('deve renderizar o router-outlet', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const element = fixture.debugElement.query(By.css('router-outlet'));
        expect(element).toBeTruthy();
    });
});
