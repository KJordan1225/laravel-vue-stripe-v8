<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> --> 
    <ApolloQuery
      :query="gql => gql`
        query categoriesQuery {
        categories {
          id
          name
        }
      }
      `"     
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <!-- Loading -->
        <div v-if="isLoading" class="loading apollo">Loading...</div>

        <!-- Error -->
        <div v-else-if="error" class="error apollo">An error occurred</div>

        <!-- Result -->
        <div v-else-if="data" class="category" >
            <a href="#" class="link-margin">All</a>
            <a href="#" class="link-margin">Featured</a>
            <a href="#" v-for="category in data.categories" 
              :key="category.id" @click.prevent="selectCategory(category.id)" class="link-margin">
              {{ category.id }}. {{ category.name }}
            </a>
          
        </div>
        <!-- No result -->
        <div v-else class="no-result apollo">No result :( </div>
      </template>
    </ApolloQuery>

    <ApolloQuery
      :query="gql => gql`
        query booksQuery {
          books {
            id
            title
            author
            image
          }
      }
      `"     
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="loading apollo">Loading...</div>       
        <div v-else-if="error" class="error apollo">An error occurred</div>        
        <div v-else-if="data">
          <div v-for="book in data.books" :key="book.id">
            {{ book.id }}. {{ book.title }}
          </div>
        </div>
        
        <div v-else class="no-result apollo">No result :( </div>
      </template>
    </ApolloQuery>

    <ApolloQuery
      :query="gql => gql`
        query categoryQuery ($id: ID!) {
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
      }      
      
      `"   
      :variables="{ id: selectedCategory }" 
    >
      <template v-slot="{ result: { error, data }, isLoading }">
        <div v-if="isLoading" class="loading apollo">Loading...</div>
        <div v-else-if="error" class="error apollo">An error occurred</div>
        <div v-else-if="data">
          <div v-for="book in data.category.books" :key="book.id">
            {{ book.id }}. {{ book.title }}
          </div>
        </div>
        <div v-else class="no-result apollo">No result :( </div>
      </template>
    </ApolloQuery>

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'
import categoryQuery from '@/graphql/queries/Category.gql'
import booksQuery from '@/graphql/queries/Books.gql'

export default {
  name: 'HomeView',
  data() {
    return {
      categoryQuery,
      booksQuery,
      categoriesQuery,
      query: booksQuery,
      selectedCategory: 1,
      categories: []
    }
  },
  // apollo: {
  //   categories: gql`query {
  //     categories {
  //       id
  //       name
  //     }
  //   }`,
  // },
  methods: {
    selectCategory(category) {
      if (category === 'all') {
        // this.query = booksQuery
        this.query = categoryQuery
      } else if (category === 'featured') {
        // this.query = booksFeatuedQuery
        this.query = categoryQuery
      } else {

        this.query = categoryQuery
      }
      
    }
  },
  components: {
    // HelloWorld
  }
}
</script>

<style>
.link-margin {
  margin-right: 24px;
}
</style>
