describe("Download CSV File", () => {
  beforeEach(() => {
    cy.visit("/"); // Adjust the URL if needed
  });

  it("should download the CSV file", () => {
    // scroll to bottom to see the download button
    cy.wait(200);
    cy.get("body").trigger("keydown", { key: "PageDown" });

    // Click on page 15
    cy.contains('[data-testid="pagination-link"]', "15").click();
    cy.wait(500);
    // Assert current page is 1 by checking the active class (shadcn applies a class like bg-primary or font-bold)
    cy.get('[data-testid="pagination-link"][aria-current="page"]').should(
      "contain",
      "15"
    );
    // Step 1: Click the download button
    cy.get('[data-testid="downloadbutton"]').click();

    // Step 2: Wait for the download to complete
    cy.wait(1000); // Optional, adjust as needed

    // Step 3: Check if the file exists in the download folder
    cy.readFile("cypress/downloads/full-table-data.csv").should("exist");
  });
});
