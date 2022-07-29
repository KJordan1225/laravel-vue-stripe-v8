<template>
  <div class="create container mt-12 ml-15">
    <h1 class="mb-4 text-4xl font-bold">Edit Book</h1>
    <form action="#" method="POST" @submit.prevent="editBook">
      <div class="form-group">
        <label class="font-bold mb-2" for="title">Title</label>
        <input type="text" name="title" id="title" v-model="title">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="author">Author</label>
        <input type="text" name="author" id="author" v-model="author">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="image">Image</label>
        <input type="text" name="image" id="image" v-model="image">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="description">Description</label>
        <textarea name="description" id="description" cols="30" rows="10" v-model="description"></textarea>
      </div>
      <div class="form-group">
        <label class="font-bold mb-2" for="link">Link</label>
        <input type="text" name="link" id="link" v-model="link">
      </div>
      <div class="form-group">
        <label class="font-bold mb-2"><input type="checkbox" name="featured" v-model="featured" class="mr-2">Featured</label>
      </div>
      <div class="form-group">
        <ApolloQuery :query="categoriesQuery">
          <template slot-scope="{ result: { data }, isLoading }">
            <div v-if="isLoading">Loading...</div>
            <select v-else v-model="category_id">
              <option v-for="category of data.categories" :key="category.id" :value="category.id">
                {{ category.name }}
              </option>
            </select>
          </template>
        </ApolloQuery>
      </div>

      <div class="form-group">
        <button type="submit">Update book</button>
      </div>

    </form>
  </div>
</template>

<script>
// import addBook from '@/graphql/mutations/AddBook.gql'
// import { thisTypeAnnotation } from '@babel/types'
import gql from 'graphql-tag'

const updateBook = gql`
        mutation(
          $id: ID!
          $title: String!
          $author: String!
          $image: String
          $link: String
          $description: String
          $featured: Boolean
          $category_id: Int!
        ) {
          updateBook(
            id: $id
            title: $title
            author: $author
            image: $image
            link: $link
            description: $description
            featured: $featured
            category_id: $category_id
          ) {
            id
            title
          }
        }` 

    const categoriesQuery = gql`
        query {
            categories {
                id
                name
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

export default {
  data() {
    return {
      categoriesQuery,
      bookQuery,
      title: '',
      author: '',
      image: '',
      description: '',
      link: '',
      featured: false,
      category_id: 1,
      book: null,
    }
  },
  apollo: {
    // Advanced query with parameters
    // The 'variables' method is watched by vue
    book: {
      query: bookQuery,
      // Reactive parameters
      variables () {
        if (this.$route && this.$route.params){
          return {
           id: this.$route.params.id,
          }
        }     
      },
      
      // Optional result hook
      result ({ data }) {
        this.title = data.book.title
        this.author = data.book.author
        this.image = data.book.image
        this.description = data.book.description
        this.link = data.book.link
        this.featured = data.book.featured
        this.category_id = data.book.category.id
      },      
    },
  },
  methods: {    
    editBook() {       
      this.$apollo.mutate({
        // Query
        mutation: updateBook,
        // Parameters
        variables: {
          id: this.$route.params.id,
          title: this.title,
          author: this.author,
          image: this.image,
          link: this.link,
          description: this.description,
          featured: this.featured,
          category_id: parseInt(this.category_id)
        }
      }).then((data) => {
        console.log(data)
        this.$router.push(`/books/${this.$route.params.id}`)
      }).catch((error) => {
        console.error(error)
      })
    }
  }
}
</script>

<style scoped>
  .form-group {
    margin-bottom: 32px;
  }
  input[type="text"], textarea {
    padding: 10px 14px;
    border: 1px solid lightgray;
    border-radius: 5px;
  }
  label {
    display: block;
  }
  button {
    padding: 16px;
    background: #027BFF;
    color: white;
    border-radius: 5px;
    font-size: 16px;
  }
</style>