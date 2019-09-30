import { ButtonBackModule } from './button-back.module';

describe('ButtonsModule', () => {
    let buttonsModule: ButtonBackModule;

    beforeEach(() => {
        buttonsModule = new ButtonBackModule();
    });

    it('should create an instance', () => {
        expect(buttonsModule).toBeTruthy();
    });
});
