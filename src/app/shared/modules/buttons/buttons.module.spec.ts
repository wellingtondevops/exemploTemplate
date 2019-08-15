import { ButtonsCustomModule } from './buttons-custom.module';

describe('ButtonsModule', () => {
    let buttonsModule: ButtonsCustomModule;

    beforeEach(() => {
        buttonsModule = new ButtonsCustomModule();
    });

    it('should create an instance', () => {
        expect(buttonsModule).toBeTruthy();
    });
});
