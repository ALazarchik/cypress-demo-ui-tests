import { navigationPage } from '../support/pageObjects/navigationPage';
import { formLayoutsPage } from '../support/pageObjects/formLayoutsPage';
import { datePickerPage } from '../support/pageObjects/datePickerPage';
import { smartTablePage } from '../support/pageObjects/smartTablePage';

describe('Test with Page Objects', () => {
    beforeEach('open application', () => {
        cy.openHomePage();
    });

    it('verify navigation across application', () => {
        navigationPage.openMenuItem('Forms', 'Form Layouts');
        navigationPage.openMenuItem('Forms', 'Datepicker');
        navigationPage.openMenuItem('Modal & Overlays', 'Toastr');
        navigationPage.openMenuItem('Tables & Data', 'Smart Table');
        navigationPage.openMenuItem('Modal & Overlays', 'Tooltip');
    });

    it('should submit Inline and Basic form', () => {
        navigationPage.openMenuItem('Forms', 'Form Layouts');
        formLayoutsPage.submitForm('Inline form',
            { fullName: 'John Connor', emailAddress: 'test@test.com', checkbox: true });
        formLayoutsPage.submitForm('Basic form',
            { emailAddress: 'test@test.com', password: 'qwerty', checkbox: true });
    });

    it('select tomorrow date in the calendar', () => {
        navigationPage.openMenuItem('Forms', 'Datepicker');
        datePickerPage.selectCommonDatepickerDateFromToday(1);
        datePickerPage.selectDatepickerWithRangeFromToday(2, 5);
    });

    it('should update, add and delete records in the table', () => {
        navigationPage.openMenuItem('Tables & Data', 'Smart Table');
        smartTablePage.updateAgeByFirstName('Larry', 25);
        smartTablePage.addNewRecord({ id: 100, firstName: 'Leonardo', lastName: 'Da Vinci',
            username: 'Neo', emailAddress: 'test@test.com', age: 250 });
        smartTablePage.deleteRowByIndex(2);
    });
});
