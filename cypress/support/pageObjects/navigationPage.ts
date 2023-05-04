class NavigationPage {
    openMenuItem(mainItem: string, subItem: string) {
        cy.contains(mainItem).then(menu => {
            cy.wrap(menu).find('.expand-state g g').invoke('attr', 'data-name').then(attr => {
                if (attr.includes('chevron-left')) {
                    cy.wrap(menu).click();
                }
            });
        });
        cy.contains(subItem).click();
    }
}

export const navigationPage = new NavigationPage();
