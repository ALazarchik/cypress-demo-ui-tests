class DatePickerPage {
    private readonly dayPickerElement: string;
    private readonly rangeDatePickerStartElement: string;
    private readonly rangeDatePickerEndElement: string;
    constructor() {
        this.dayPickerElement = 'nb-calendar-day-picker [class="day-cell ng-star-inserted"]';
        this.rangeDatePickerStartElement = 'nb-calendar-range-day-cell .start';
        this.rangeDatePickerEndElement = 'nb-calendar-range-day-cell .end';
    }

    selectDayFromCurrent(numberOfDays: number) {
        const date = new Date();
        date.setDate(date.getDate() + numberOfDays);
        const futureDay = date.getDate();
        const futureMonth = date.toLocaleString('En', { month: 'short' });

        cy.get('nb-calendar-navigation').invoke('attr', 'ng-reflect-date').then(dateAttribute => {
            if (!dateAttribute.includes(futureMonth)) {
                cy.get('[data-name="chevron-right"]').click();
                this.selectDayFromCurrent(numberOfDays);
            } else {
                cy.get('.day-cell').not('.bounding-month').contains(futureDay).click();
            }
        });
        return `${futureMonth} ${futureDay}, ${date.getFullYear()}`;
    }

    selectCommonDatepickerDateFromToday(numberOfDays: number) {
        cy.contains('nb-card', 'Common Datepicker').find('input').then(input => {
            cy.wrap(input).click();
            const dateAssert = this.selectDayFromCurrent(numberOfDays);
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(input).should('have.value', dateAssert);
        });
    }

    selectDatepickerWithRangeFromToday(firstDate: number, secondDate: number) {
        cy.contains('nb-card', 'Datepicker With Range').find('input').then(input => {
            cy.wrap(input).click();
            const firstDateAssert = this.selectDayFromCurrent(firstDate);
            const secondDateAssert = this.selectDayFromCurrent(secondDate);
            const dateAssert = `${firstDateAssert} - ${secondDateAssert}`;
            cy.wrap(input).invoke('prop', 'value').should('contain', dateAssert);
            cy.wrap(input).should('have.value', dateAssert);
        });
    }
}

export const datePickerPage = new DatePickerPage();
