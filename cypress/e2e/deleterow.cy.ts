describe("Data Table Page", () => {
  beforeEach(() => {
    cy.visit("/"); // Adjust route if needed
  });

  it("deletes a row and confirms it's removed", () => {
    let pipelineId = "";

    // Step 1: Get the first row and store its pipelineId
    cy.get('[data-testid="table-row"]')
      .first()
      .within(() => {
        cy.get("td")
          .first()
          .invoke("text")
          .then((text) => {
            pipelineId = text.trim();
            // Step 2: Click the Delete button inside the same row
            cy.get('[data-testid="deletebutton"]').click({ force: true });
            // Step 3: confirm the pipelineId no longer exists
            cy.contains(pipelineId).should("not.exist");
          });
      });

    cy.get('[data-testid="chartsbutton"]').click();
    cy.wait(1000);
    cy.get('[data-testid="totaltasks"]').should("contain", "499");
  });
});
