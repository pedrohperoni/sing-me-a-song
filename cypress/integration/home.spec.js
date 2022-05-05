/// <reference types="cypress" />

const video = {
  name: `Video Title: ${Math.floor(Math.random() * 100000000)}`,
  youtubeLink: "https://www.youtube.com/watch?v=jNQXAC9IVRw",
};

describe("Home", () => {
  it("should create a recommendation with a custom title and a video from a link, vote successfully and persist the data", () => {
    cy.visit("http://localhost:3000/");

    cy.intercept("GET", "/recommendations").as("getRecommendations");

    cy.get("input[placeholder$='Name']").type(video.name);
    cy.get("input[placeholder$='https://youtu.be/...']").type(video.youtubeLink);
    cy.get("button").click();

    cy.wait("@getRecommendations");
    cy.contains(video.name).should("be.visible");

    cy.contains(video.name).parent().find("#upvote").click();
    cy.wait("@getRecommendations");
    cy.contains(video.name).parent().find("#upvote").parent().should("have.text", "1");

    cy.contains(video.name).parent().find("#downvote").click();
    cy.wait("@getRecommendations");
    cy.contains(video.name).parent().find("#upvote").parent().should("have.text", "0");
  });
});
