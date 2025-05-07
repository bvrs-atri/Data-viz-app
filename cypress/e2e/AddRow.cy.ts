describe("Data Table Page", () => {
  beforeEach(() => {
    cy.visit(""); // adjust route if needed
  });

  it("renders the table with initial data", () => {
    cy.get('[data-testid="cytable"]').should("exist");
    cy.get('[data-testid="table-row"]').should("have.length.greaterThan", 0);
  });

  it("creates a new entry and check the piechart for the records number", () => {
    cy.get('[data-testid="addbutton"]').click();
    cy.get('[data-testid="input-pipeline"]').type("abcdefg");
    cy.get('[data-testid="input-taskstatus"]').click();
    cy.get('[data-testid="input-selecttaskstatus"]').click();
    cy.get('[data-testid="input-taskduration"]').type("123");
    cy.get('[data-testid="input-datatransfervolume"]').type("123");
    cy.get('[data-testid="input-resourceutil"]').type("123");
    cy.get('[data-testid="input-executiontime"]').type("123");
    cy.get('[data-testid="AddRow"]').click();

    cy.contains("abcdefg").should("exist");

    cy.get('[data-testid="chartsbutton"]').click();
    cy.wait(1000);
    cy.get('[data-testid="totaltasks"]').should("contain", "501");
  });
});
