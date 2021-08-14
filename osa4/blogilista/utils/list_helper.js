const _ = require('lodash')


const dummy = (blogs) => {
    return 1
}


const totalLikes = (blogs) => {
    const summa = blogs.reduce((sum, like) =>
    sum + like.likes, 0)
    return blogs.length === 0
    ? 0
    : summa
}

const favoriteBlog = (blogs)=> {

    let suosituin = blogs[0]
  
    for (let i = 0; i< blogs.length; i++){
      if (blogs[i].likes >suosituin.likes ){
        suosituin = blogs[i]
      }
    }
    return blogs.length === 0 ? {} : suosituin
  }


  const mostLikes = (blogs)=>{

    if (blogs.length===0){
      return null
    } else{
    
    
    
    const listaGroup =_.groupBy( blogs, 'author' )
    
    const listaCount =_.mapValues(listaGroup, totalLikes)
    
    const kirjailijaEniten = Object.entries(listaCount ).reduce((a,b) => a[1] > b[1] ?  a:b)
    
    return {'author' : kirjailijaEniten[0], 'likes' : kirjailijaEniten[1]}
    }
    
    }


  const mostBlogs = (blogs)=> {

    if (blogs.length===0){
      return null
    } else{
  
  const listaGroup =_.groupBy( blogs, 'author' )
  
  const listaCount =_.mapValues(listaGroup, p =>  p.length)
  const lista=[]
  for (const [key, value] of Object.entries(listaCount)) {
    lista.push({'author' : key, 'blogs' : value})
  }
  
  let blogitekstit = lista[0]
  
    for (let i = 0; i< lista.length; i++){
      if (lista[i].blogs >blogitekstit.blogs ){
        blogitekstit = lista[i]
      }
    }
    
  return blogitekstit
    }
  
  }
  




module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}