<template>
  <div class="create container mt-12 ml-15">
    <h1 class="mb-4 text-4xl font-bold">Create Book</h1>
    <form action="#" method="POST" @submit.prevent="addBook">
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
        <button type="submit">Add book</button>
      </div>

    </form>
  </div>
</template>

<script>
// import addBook from '@/graphql/mutations/AddBook.gql'
import gql from 'graphql-tag'

const addBook = gql`
        mutation(
            $title: String!
            $author: String!
            $image: String
            $link: String
            $description: String
            $featured: Boolean
            $category_id: Int!
            ) {
            createBook(
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

export default {
  data() {
    return {
    categoriesQuery,
      title: '',
      author: '',
      image: '',
      description: '',
      link: '',
      featured: false,
      category_id: 1
    }
  },
  methods: {    
    addBook() {       
      this.$apollo.mutate({
        // Query
        mutation: addBook,
        // Parameters
        variables: {
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
        this.$router.push('/')
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