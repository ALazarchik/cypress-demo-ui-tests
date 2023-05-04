class FormLayoutsPage {
    private formFullNameInput: string;
    private formEmailInput: string;
    private formPasswordInput: string;
    private formCheckbox: string;

    constructor() {
        this.formFullNameInput = '[placeholder="Jane Doe"]';
        this.formEmailInput = '[placeholder="Email"]';
        this.formCheckbox = '[type="checkbox"]';
        this.formPasswordInput = '[placeholder="Password"]';
    }

    submitForm(formName: string, data:
        { fullName?: string, emailAddress?: string, password?: string, checkbox?: boolean }) {
        cy.contains(formName).parent('nb-card').find('form').then(rootElement => {
            if (data.fullName) {
                cy.wrap(rootElement).find(this.formFullNameInput).type(data.fullName);
            }
            if (data.emailAddress) {
                cy.wrap(rootElement).find(this.formEmailInput).type(data.emailAddress);
            }
            if (data.password) {
                cy.wrap(rootElement).find(this.formPasswordInput).type(data.password);
            }
            if (data.checkbox) {
                cy.wrap(rootElement).find(this.formCheckbox).check({force: true});
            }
            cy.wrap(rootElement).submit();
        });
    }
}

export const formLayoutsPage = new FormLayoutsPage();
