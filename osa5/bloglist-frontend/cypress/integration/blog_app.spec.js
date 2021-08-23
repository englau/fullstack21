describe('Blog app', function() {
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.visit('http://localhost:3000')
    })
  
    it('Login form is shown', function() {
      cy.contains('Login')
      cy.contains('username')
      cy.contains('Password')
      cy.contains('login')
    })
  })

  describe('Blog app', function() {
      const tuser = {
        name: 'Testuri',
        username: 'Testi222',
        password: 'oikealla'
      }
    beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      cy.request('POST', 'http://localhost:3003/api/users', tuser)
      cy.visit('http://localhost:3000')
    })
  
      it('Login form is shown', function() {
        cy.contains('Login')
        cy.contains('username')
        cy.contains('Password')
        cy.contains('login')
    })
  
  describe('Login',function() {
      it('succeeds with correct credentials', function() {
        cy.contains('Login')
        cy.get('#username').type('Testi222')
        cy.get('#password').type('oikealla')
        cy.get('#loginbutton').click()
        cy.contains('logout').click()
      })
  
      it('login fails with wrong credentials', function() {
        cy.contains('Login')
        cy.get('#username').type('Testi222')
        cy.get('#password').type('väärä')
        cy.get('#loginbutton').click()
        cy.contains('wrong credentials')
      })
    })

    describe('after user has logged in..',function(){
      beforeEach(function() {
        cy.userLogin({ username:'Testi222',password:'oikealla' })
      })
  
      it('A blog creation', function() {
        cy.get('#showblogadd').click()
        cy.get('#title').type('Jokilaiva')
        cy.get('#author').type('Vilho')
        cy.get('#url').type('www.laivat.fi')
        cy.contains('submit').click()
        cy.contains('Jokilaiva Vilho')
      })

    it('Blog can be liked', function() {
      cy.createBlog({
        title: 'Hammaslääkäri',
        author: 'Teurastaja',
        url: 'wwww.lääkärit.fi',
        likes: 7 })
      cy.contains('view').click()
      cy.contains('like').click()

    })
    it('Blog can be deleted', function() {
      cy.createBlog({
        title: 'Hammaslääkäri',
        author: 'Teurastaja',
        url: 'wwww.lääkärit.fi',
        likes: 7 })
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.on('window:confirm',() => true)

    })

    beforeEach(function() {
      cy.createBlog({ title: 'Hammaslääkäri',
        author: 'Teurastaja',
        url: 'wwww.lääkärit.fi',
        likes: 1 })

      cy.createBlog({ title: 'Meikitön',
        author: 'Heikki',
        url: 'wwww.fi',
        likes: 89 })

      cy.createBlog({ title: 'Koirakuiskaaja',
        author: 'Hyttynen',
        url: 'wwww.www',
        likes: 12 })
    })


    it('Sort likes', function() {

      cy.contains('view').click()
      cy.contains('view').click()
      cy.contains('view').click()



      cy.get('.blog').find('#parid').then(blogs => {
      cy.wrap(blogs[0])
        expect(blogs[0]).to.contain('89')

      })

    })
  })

})

