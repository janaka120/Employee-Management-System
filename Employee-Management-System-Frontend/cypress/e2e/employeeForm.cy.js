describe("Employee from", () => {
  it("should navigate to Add Employee page and submit the form and navigate to listing page", () => {
    cy.visit("/");

    cy.contains("Add Employee").click();
    cy.url().should("include", "/employee/add");

    cy.get('input[name="firstName"]').type("FirstName");
    cy.get('input[name="lastName"]').type("LastName");
    cy.get('input[name="email"]').type("FirstName@example.com");
    cy.get('input[name="phone"]').type("91444444");

    cy.get('input[name="dob"]').type("1990-01-01");
    cy.get('input[name="joinedDate"]').type("2023-01-01");

    cy.get('input[type="radio"][value="Male"]').check({ force: true });

    cy.get("form").submit();

    cy.contains("Form data saved successfully!").should("exist");

    cy.contains("Cancel").click();
  });
});
