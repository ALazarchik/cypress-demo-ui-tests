class SmartTablePage {
    private editButton: string;
    private checkmarkButton: string;
    private addRecordButton: string;
    private fields: { firstName: { index: number; cellLocator: string };
        lastName: { index: number; cellLocator: string }; id: { index: number; cellLocator: string };
        email: { index: number; cellLocator: string }; age: { index: number; cellLocator: string };
        username: { index: number; cellLocator: string } };

    constructor() {
        this.editButton = '.nb-edit';
        this.checkmarkButton = '.nb-checkmark';
        this.addRecordButton = '.nb-plus';
        this.fields = {
            id: {
                index: 1,
                cellLocator: '[placeholder="ID"]',
            },
            firstName: {
                index: 2,
                cellLocator: '[placeholder="First Name"]',
            },
            lastName: {
                index: 3,
                cellLocator: '[placeholder="Last Name"]',
            },
            username: {
                index: 4,
                cellLocator: '[placeholder="Username"]',
            },
            email: {
                index: 5,
                cellLocator: '[placeholder="E-mail"]',
            },
            age: {
                index: 6,
                cellLocator: '[placeholder="Age"]',
            },
        };
    }

    updateAgeByFirstName(firstName: string, newAge: number) {
        cy.get('tbody').contains('tr', firstName).then(tableRow => {
            cy.wrap(tableRow).find(this.editButton).click();
            cy.wrap(tableRow).find(this.fields.age.cellLocator).clear().type(newAge.toString());
            cy.wrap(tableRow).find(this.checkmarkButton).click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', newAge.toString());
        });
    }

    addNewRecord(data: { id?: number, firstName?: string, lastName?: string,
        username?: string, emailAddress?: string, age?: number }) {
        cy.get('thead').find(this.addRecordButton).click();
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            if (data.id) {
                cy.wrap(tableRow).find(this.fields.id.cellLocator).type(data.id.toString());
            }
            if (data.firstName) {
                cy.wrap(tableRow).find(this.fields.firstName.cellLocator).type(data.firstName);
            }
            if (data.lastName) {
                cy.wrap(tableRow).find(this.fields.lastName.cellLocator).type(data.lastName);
            }
            if (data.username) {
                cy.wrap(tableRow).find(this.fields.username.cellLocator).type(data.username);
            }
            if (data.emailAddress) {
                cy.wrap(tableRow).find(this.fields.email.cellLocator).type(data.emailAddress);
            }
            if (data.age) {
                cy.wrap(tableRow).find(this.fields.age.cellLocator).type(data.age.toString());
            }
            cy.wrap(tableRow).find(this.checkmarkButton).click();
        });
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            if (data.id) {
                cy.wrap(tableColumns).eq(this.fields.id.index).should('contain', data.id);
            }
            if (data.firstName) {
                cy.wrap(tableColumns).eq(this.fields.firstName.index).should('contain', data.firstName);
            }
            if (data.lastName) {
                cy.wrap(tableColumns).eq(this.fields.lastName.index).should('contain', data.lastName);
            }
            if (data.username) {
                cy.wrap(tableColumns).eq(this.fields.username.index).should('contain', data.username);
            }
            if (data.emailAddress) {
                cy.wrap(tableColumns).eq(this.fields.email.index).should('contain', data.emailAddress);
            }
            if (data.age) {
                cy.wrap(tableColumns).eq(this.fields.age.index).should('contain', data.age.toString());
            }
        });
    }

    deleteRowByIndex(index: number) {
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').eq(index).find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });
    }
}

export const smartTablePage = new SmartTablePage();
