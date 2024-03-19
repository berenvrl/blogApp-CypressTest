describe('Repeating tests with bypassing UI', ()=>{
  beforeEach(()=>{
  //emptying db
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    cy.visit("");  
  });
    
    it('Login form is shown', ()=>{
    cy.contains('Log In')
    cy.contains('Log In').click()
  })
    
    describe('Login', ()=>{
    beforeEach(()=>{
      const user={
        name:'Beren Varol',
        username:'berenvrll',
        password:'berenvrll123,'
      }

    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    })

      it('succeeds with correct credentials',()=>{
         cy.login({username:'berenvrll', password:'berenvrll123,'})
         
         cy.createBlog({title:'TITLE', author:'author', url:'url', likes:100}).then(res=>{
           const blogId=res.body.id;
           const blogObj=res.body;
           cy.updateLike({id:blogId,obj:{...blogObj, likes:blogObj.likes+1}})
         })
         .then(()=>{
            cy.visit("");
           cy.contains('View').click()
           cy.contains('101')
         })
      })


      it('fails with wrong credentials', ()=>{
        cy.contains('Log In').click()
        cy.get('#username').type('bbbrnnvrl')
        cy.get('#password').type('wrongpassword')
        cy.get('#login-button').click()
    
        //check error message
        cy.get('.error').contains('Wrong Credentials')
        // cy.get('.error').should('contain','wrong credentials')
        cy.get('.error').should('have.css','color','rgb(179, 20, 20)')
        cy.get('.error').should('have.css','border-style', 'solid')
        cy.get('html').should('not.contain','Beren Varol logged in')
        cy.contains('Beren Varol logged in').should('not.exist')
        
      })
  })
})

describe('only creator can see delete button for a blog',()=>{

  it("user2 creation", () => {
    
    const user2={
      name:'Jon Snow',
      username:'jonsnow',
      password:'jonsnow123,'
    }
    
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user2)
  })
  it('another user cant see blog created by the creator',()=>{
      const creatorUsername = "berenvrll"; 

      cy.login({ username: creatorUsername, password: "berenvrll123," }).then(() => {
        cy.createBlog({ title: "Test Blog", author: "Test Author", url: "testurl.com", likes: 0 }).then(
          () => {
    
            cy.visit("");
    
            cy.get("li")
              .contains("Test Blog Test Author")
              .within(() => {
                cy.contains("Remove").should("be.visible");
              });

            cy.clearLocalStorage();

            cy.login({username:'jonsnow', password:'jonsnow123,'}).then(()=>{
              cy.visit('')

              cy.createBlog({title:'new title', author:'new author', url:'new url', likes:11}).then(()=>{
                cy.visit("");

                cy.get('li').should('not.contain','Test Blog Test Author')
              })
            })
          }
        );
      });

    })

  });

describe('sorted likes', () => {
    beforeEach(() => {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
  
      const user = {
        name: 'Beren Varol',
        username: 'berenvrll',
        password: 'berenvrll123,'
      };
  
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
     

      cy.login({ username: 'berenvrll', password: 'berenvrll123,' }).then(()=>{
  
        cy.createBlog({ title: 'blabla2', author: 'author2', url: 'url2', likes: 50 });
        cy.createBlog({ title: 'blabla1', author: 'author1', url: 'url1', likes: 100 });
       
        cy.visit('');
      })
      
    });
  
    it('Blogs can be sorted by likes', () => {

  
      cy.contains('Sort By Likes').click();
      cy.contains('See normal order').click()

      cy.get("li").eq(0).should('contain',50)
      cy.get('li').eq(1).should('contain',100)

      cy.contains('Sort By Likes').click();
      cy.get("li").eq(0).should('contain',100)
      cy.get('li').eq(1).should('contain',50)
  
    
    });
   
  });