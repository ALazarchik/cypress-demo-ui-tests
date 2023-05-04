describe('First suite', () => {
    it('first test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('input');
        cy.get('#inputEmail1');
        cy.get('.input-full-width');
        cy.get('[placeholder]');
        cy.get('[placeholder="Email"]');
        cy.get('[class="input-full-width size-medium shape-rectangle"]');
        cy.get('input[placeholder="Email"]');
        cy.get('[placeholder="Email"][type="Email"]');
        cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');
        cy.get('[data-cy="imputEmail1"]');
    });

    it('second test', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.get('[data-cy="signInButton"]');

        cy.contains('Sign in');

        cy.contains('[status="warning"]', 'Sign in');

        cy.get('#inputEmail3')
            .parents('form')
            .find('button')
            .should('contain.text', 'Sign in')
            .parents('form')
            .find('nb-checkbox')
            .click();

        cy.contains('nb-card', 'Horizontal form')
            .find('[type="email"]');
    });

    it('then and wrap methods', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[for="inputEmail1"]').should('contain', 'Email');
        cy.contains('nb-card', 'Using the Grid').find('[for="inputPassword2"]').should('contain', 'Password');
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputEmail1"]').should('contain', 'Email address');
        cy.contains('nb-card', 'Basic form').find('[for="exampleInputPassword1"]').should('contain', 'Password');

        cy.contains('nb-card', 'Using the Grid').then(firstForm => {
            const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
            expect(emailLabelFirst).to.equal('Email');
            const passwordLabelFirst = firstForm.find('[for="inputPassword2"]').text();
            expect(passwordLabelFirst).to.equal('Password');

            cy.contains('nb-card', 'Basic form').then(secondForm => {
                const passwordLabelSecond = secondForm.find('[for="exampleInputPassword1"]').text();
                expect(passwordLabelFirst).to.equal(passwordLabelSecond);

                cy.wrap(secondForm).find('[for="exampleInputEmail1"]').should('contain', 'Email address');
            });
        });
    });

    it('invoke command', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        // 1
        cy.get('[for="inputEmail1"]')
            .should('contain', 'Email')
            .should('have.class', 'label')
            .and('have.text', 'Email');

        // 2
        cy.get('[for="inputEmail1"]').then(label => {
            expect(label.text()).to.equal('Email');
            expect(label).to.have.class('label');
        });

        // 3.1
        cy.get('[for="inputEmail1"]').invoke('text').then(text => {
            expect(text).to.equal('Email');
        });

        // 3.2
        cy.contains('nb-card', 'Basic form')
            .find('nb-checkbox')
            .click()
            .find('.custom-checkbox')
            .invoke('attr', 'class')
            // .should('contain', 'checked');
            .then(classValue => {
                expect(classValue).to.contain('checked');
            });
    });

    it('assert property and date picker', () => {

        function selectDayFromCurrent(numberOfDays: number) {
            const date = new Date();
            date.setDate(date.getDate() + numberOfDays);
            const futureDay = date.getDate();
            const futureMonth = date.toLocaleString('En', {month: 'short'});

            cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
                if (!dateAttribute.includes(futureMonth)) {
                    cy.get('[data-name="chevron-right"]').click();
                    selectDayFromCurrent(numberOfDays);
                } else {
                    cy.get('nb-calendar-day-picker [class="day-cell ng-star-inserted"]').contains(futureDay).click();
                }
            });
            return `${futureMonth} ${futureDay}, ${date.getFullYear()}`;
        }

        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Datepicker').click();

        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateAssert = selectDayFromCurrent(70);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(input).should('have.value', dateAssert);
        });
    });

    it('radio button', () => {
        cy.visit('/');
        cy.contains('Forms').click();
        cy.contains('Form Layouts').click();

        cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(radioButtons => {
            cy.wrap(radioButtons)
                .first()
                .check({force: true})
                .should('be.checked');

            cy.wrap(radioButtons)
                .eq(1)
                .check({force: true})
                .should('be.checked');

            cy.wrap(radioButtons)
                .first()
                .should('not.be.checked');

            cy.wrap(radioButtons)
                .eq(2)
                .should('be.disabled');
        });
    });

    it('checkboxes', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Toastr').click();

        cy.get('[type="checkbox"]').check({force: true});
        cy.get('[type="checkbox"]').first().click({force: true});
        cy.get('[type="checkbox"]').eq(2).uncheck({force: true});
    });

    it('lists and dropdowns', () => {
        cy.visit('/');

        // 1
        cy.get('nav nb-select').click();
        cy.get('.options-list').contains('Dark').click();
        cy.get('nav nb-select').should('contain', 'Dark');
        cy.get('nb-layout-header nav').should('have.css', 'background-color', 'rgb(34, 43, 69)');

        // 2
        cy.get('nav nb-select').then(dropdown => {
            cy.wrap(dropdown).click();
            cy.get('.options-list nb-option').each((listItem, index) => {
                const itemText = listItem.text().trim();

                const colors = {
                    'Light': 'rgb(255, 255, 255)',
                    'Dark': 'rgb(34, 43, 69)',
                    'Cosmic': 'rgb(50, 50, 89)',
                    'Corporate': 'rgb(255, 255, 255)',
                };

                cy.wrap(listItem).click();
                cy.wrap(dropdown).should('contain', itemText);
                cy.get('nb-layout-header nav').should('have.css', 'background-color', colors[itemText]);
                if (index < Object.keys(colors).length - 1) {
                    cy.wrap(dropdown).click();
                }
            });
        });
    });

    it('web tables', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // 1
        cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
            cy.wrap(tableRow).find('.nb-edit').click();
            cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('25');
            cy.wrap(tableRow).find('.nb-checkmark').click();
            cy.wrap(tableRow).find('td').eq(6).should('contain', '25');
        });

        // 2
        cy.get('thead').find('.nb-plus').click();
        cy.get('thead').find('tr').eq(2).then(tableRow => {
            cy.wrap(tableRow).find('[placeholder="First Name"]').type('Leonardo');
            cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Da Vinci');
            cy.wrap(tableRow).find('.nb-checkmark').click();
        });
        cy.get('tbody tr').first().find('td').then(tableColumns => {
            cy.wrap(tableColumns).eq(2).should('contain', 'Leonardo');
            cy.wrap(tableColumns).eq(3).should('contain', 'Da Vinci');
        });

        // 3
        const ages: number[] = [20, 30, 40, 200];

        cy.wrap(ages).each(age => {
            cy.get('thead [placeholder="Age"]').clear().type(`${age}`);
            cy.wait(400);
            cy.get('tbody tr').each(tableRow => {
                Number(age) === 200 ?
                    cy.wrap(tableRow).should('contain', 'No data found') :
                    cy.wrap(tableRow).find('td').eq(6).should('contain', age);
            });
        });
    });

    it('tooltips', () => {
        cy.visit('/');
        cy.contains('Modal & Overlays').click();
        cy.contains('Tooltip').click();

        cy.contains('nb-card', 'Colored Tooltips').contains('Default').click();
        cy.get('nb-tooltip').should('contain', 'This is a tooltip');
    });

    it('dialog box', () => {
        cy.visit('/');
        cy.contains('Tables & Data').click();
        cy.contains('Smart Table').click();

        // 1
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', (confirm) => {
            expect(confirm).to.equal('Are you sure you want to delete?');
        });

        // 2
        const stub = cy.stub();
        cy.on('window:confirm', stub);
        cy.get('tbody tr').first().find('.nb-trash').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Are you sure you want to delete?');
        });

        // 3
        cy.get('tbody tr').first().find('.nb-trash').click();
        cy.on('window:confirm', () => false);
    });
});
