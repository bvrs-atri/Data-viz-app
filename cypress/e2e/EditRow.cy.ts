describe("Data Table Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Adjust route if needed
  });

  it("edits an existing entry", () => {
    // Step 1: Click the first edit button
    cy.get('[data-testid="editbutton"]').first().click({ force: true });

    // Step 2: Get the pipelineId from the edit sheet (assuming it's in a read-only input or span)

    // Step 3: Edit a field
    cy.get('[data-testid="edit-executiontime"]').type(
      "{selectall}{backspace}9848022338"
    );

    cy.get('[data-testid="save-button"]').click();

    cy.wait(1000);

    // Step 4: Wait for edit sheet to disappear
    // cy.get('[data-testid="edit-sheet"]').should("not.exist");

    // Step 5: Verify the table row with the same pipelineId was updated
    cy.contains("9848022338").should("exist");
  });
});
