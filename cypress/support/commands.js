//Login to App
Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3003/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedUserBlogsApp", JSON.stringify(body));
    cy.visit("http://localhost:5175");
  });
});

//Create a blog
Cypress.Commands.add("createBlog", ({ title,author,url,likes }) => {
  cy.request({
    url: "http://localhost:3003/api/blogs",
    method: "POST",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUserBlogsApp")).token
      }`,
    },
  }).then(res=>{
    return res
  })
  // cy.visit("http://localhost:5175");
});

//delete a blog
Cypress.Commands.add("deleteBlog", ({id}) => {
  cy.request({
    url:`http://localhost:3003/api/blogs/${id}`,
    method:'DELETE',
    headers:{
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUserBlogsApp")).token
      }`,
    }
  })
  cy.visit("http://localhost:5175");
});

//update blog likes
Cypress.Commands.add('updateLike', ({id, obj})=>{
  cy.request({
    url:`http://localhost:3003/api/blogs/${id}`,
    method:"PUT",
    headers: { 
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUserBlogsApp")).token
      }`,
    },
    body:obj
  })
  // cy.visit("http://localhost:5175");
})

//getting blogs
Cypress.Commands.add('gettingBlogs', ()=>{
  cy.request({
    url:'http://localhost:3003/api/blogs',
    method:'GET',
    headers: { 
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem("loggedUserBlogsApp")).token
      }`,
    },
  }).then(response=>{
    return response;
  })
})




// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })