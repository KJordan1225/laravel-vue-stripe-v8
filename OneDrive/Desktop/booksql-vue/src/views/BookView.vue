<template>
  <div class="book container ml-10">
    <ApolloQuery :query="bookQuery" :variables="{ id: $route.params.id }">
        <template v-slot="{ result: { error, data }, isLoading }">
          <div v-if="isLoading" class="loading apollo">Loading...</div>       
          <div v-else-if="error" class="error apollo">An error occurred</div>        
          <div v-else-if="data" class="flex mt-16 flex-col lg:flex-row">
            <div>
              <img :src="`${data.book.image}`" alt="cover image" />
            </div>
            <div class="w-full lg:w-2/3 ml-0 mt-8 lg:ml-16 lg:mt-0">              
              <div class="text-4xl font-bold">{{ data.book.title }}</div>
              <div class="text-2xl text-gray-800 mb-8">{{ data.book.author }}</div>
              <div class="text-lg text-gray-800 leading-normal">{{ data.book.description }}</div>
              <div class="my-12">
                <a :href="data.book.link" target="_blank" 
                  class="border border-purple-800 border-solid text-purple-800 rounded px-4 py-4
                  hover:bg-purple-800 hover:text-white">View Link</a>
              </div>
              <router-link :to="`/books/${data.book.id}/edit`" href="#" class="link-margin">Edit</router-link>
            
              <a href="#" class="link-margin" @click.prevent="deleteBook">Delete</a>
            </div>   
          </div>        
          <div v-else class="no-result apollo">No result :( </div>
        </template>
      </ApolloQuery>
  </div>
</template>

<script>
// @ is an alias to /src
import gql from 'graphql-tag'

const categoryQuery = gql`
        query ($id: ID!) {
          category (id: $id) {
            id
            name
            books {
              id
              title
              author
              image
            }
          }
      }`       

  const booksQuery = gql`
        query {
          books {
            id
            title
            author
            image
          }
      }`

  const bookQuery = gql`
       query($id: ID!) {
            book(id: $id) {
                id
                title
                author
                image
                description
                link
                featured
                category{
                id
                name
                } 
            }
        }`  

    const deleteThisBook = gql`
       mutation($id: ID!) {
        deleteBook(id: $id) {
          id
          title
        }
      }`    

export default {
  name: 'HomeView',
  data() {
    return {
      categoryQuery,
      booksQuery,
      bookQuery, 
      deleteThisBook,     
      query: categoryQuery,
      selectedCategory: 'all',
      categories: []
    }
  },   

  methods: {
    selectCategory(category) {
      if (category === 'all') {
        this.query = booksQuery
        this.selectedCategory = 'all'
      } else {
        this.query = categoryQuery
        this.selectedCategory = category
      }    
    },

    deleteBook() {
      this.$apollo.mutate({
        mutation: deleteThisBook,
        variables: {
          id: this.$route.params.id,
        }
      }).then(data => {
        console.log(data)
        this.$router.push('/')
      })
    }, 
  },  
}
</script>

<style scoped>
.link-margin {
  margin-right: 24px;
}
</style>




