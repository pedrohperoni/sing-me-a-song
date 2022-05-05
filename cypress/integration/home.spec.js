/// <reference types="cypress" />

describe("Home", () => {
  it("should add and register a video successfully", () => {
    cy.visit("http://localhost:3000/");
    const video = {
      name: "Me at the zoo",
      youtubeLink: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
    };
    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("input[placeholder=Name]").type(video.name);
    cy.get("input[placeholder=Video]").type(video.youtubeLink);
    cy.get("button").click();
    cy.wait("@getRecommendations")
    cy.contains(video.name).should("be.visible")
  });
});
