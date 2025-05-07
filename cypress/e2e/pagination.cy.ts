describe("Shadcn Pagination Navigation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("navigates to page 15, back to 14, then forward to 15 again", () => {
    cy.wait(200);
    cy.get("body").trigger("keydown", { key: "PageDown" });

    // Click on page 15
    cy.contains('[data-testid="pagination-link"]', "15").click();
    cy.wait(500);
    // Assert current page is 15 by checking the active class (shadcn applies a class like bg-primary or font-bold)
    cy.get('[data-testid="pagination-link"][aria-current="page"]').should(
      "contain",
      "15"
    );

    // Click Previous
    cy.get('[data-testid="pagination-prev"]').click();

    // Assert current page is 14
    cy.get('[data-testid="pagination-link"][aria-current="page"]').should(
      "contain",
      "14"
    );

    // scroll to right
    cy.get('[data-testid="pagination-scrollarea"]').trigger("keydown", {
      key: "ArrowRight",
    });

    //click next
    cy.get('[data-testid="pagination-next"]').click();
    cy.get('[data-testid="pagination-next"]').click();
    cy.get('[data-testid="pagination-next"]').click();

    // Assert we're back on page 15
    cy.get('[data-testid="pagination-link"][aria-current="page"]').should(
      "contain",
      "17"
    );
  });
});
