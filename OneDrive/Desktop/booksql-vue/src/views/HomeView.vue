<template>
  <div class="home">
    <div class="hero bg-gray-200 mb-24">
      <div class="container flex flex-col lg:flex-row lg:justify-between py-10 ml-10">
        <div class="mt-10">
          <h1 class="text-xl font-bold">Book recommendation site with GraphQL</h1>
          <p class="mb-6">Built with Laravel (Lighthouse GraphQL), Vue.js (vue-apollo) and
             Tailwind CSS</p>
             <div class="flex items-center">
                <a href="#" class="bg-purple-700 text-white rounded px-4 py-4 
                mr-4 hover:bg-purple-500">View Books</a>
                <a href="#" class="border border-purple-700 border-solid text-purple-700 rounded px-4 py-4 
                mr-4 hover:bg-purple-700 hover:text-white">View Screencasts</a>
             </div>
        </div>
        <div class="mt-10 lg:mt-0">
          <img src="../assets/hero.svg" alt="hero"/>
        </div>
      </div>
    </div>


    <div class="container mx-auto">
      <div class="flex flex-wrap ml-10">
        <div class="w-full lg:w-1/4 px-4 mb-12">
          <ApolloQuery
            :query="gql => gql`
              query {
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
              <ul v-else-if="data" class="category list-reset text-lg" >
                <li class="mb-6">
                  <a href="#" class="text-black hover:text-gray-500" @click="selectCategory('all')">All</a>
                </li>                  
                  <!-- <a href="#" class="link-margin" @click="selectCategory('featured')">Featured</a> -->
                  <li v-for="category in data.categories" 
                    :key="category.id" class="mb-6">
                    <a href="#" class="text-black hover:text-gray-500" @click.prevent="selectCategory(category.id)">{{ category.name }}</a> 
                  </li>
                  <li class="mb-6">
                    <router-link to="/books/add" class="text-black hover:text-gray-500">Add a Book</router-link>
                  </li>                
              </ul>
              <!-- No result -->
              <div v-else class="no-result apollo">No result :( </div>
            </template>
          </ApolloQuery>
          
        </div>
        <div class="w-full lg:w-3/4 px-4 flex flex-wrap mb-12">
          <div v-if="selectedCategory === 'all'">
            <ApolloQuery :query="booksQuery">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>       
                <div v-else-if="error" class="error apollo">An error occurred</div>        
                <div v-else-if="data" class="flex flex-wrap">
                  <div v-for="book in data.books" :key="book.id" class="w-full lg:w-1/3 px-4 mb-12">
                    <router-link :to="`/books/${book.id}`">             
                    <img :src="`${book.image}`" alt="cover image" class="h-64 mb-2" />
                    </router-link> 
                    <router-link :to="`/books/${book.id}`" class="font-bold text-black hover:text-gray-400">
                        {{ book.title }}
                    </router-link>
                    <div>{{ book.author }}</div>            
                  </div>
                </div>        
                <div v-else class="no-result apollo">No result :( </div>
              </template>
            </ApolloQuery>
          </div>

          <div v-else-if="selectedCategory === 'featured'">
            <ApolloQuery :query="booksFeaturedQuery" :variables="{featured: true}">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>       
                <div v-else-if="error" class="error apollo">An error occurred</div>        
                <div v-else-if="data">
                  <div v-for="book in data.booksByFeatured" :key="book.id">
                    <router-link :to="`/books/${book.id}`">
                      {{ book.title }}
                    </router-link>
                    <div>{{ book.author }}</div>
                    <img :src="`${book.image}`" alt="cover image" />  
                  </div>
                </div>        
                <div v-else class="no-result apollo">No result :( </div>
              </template>
            </ApolloQuery>
          </div>
          
          <div v-else>
            <ApolloQuery :query="query" :variables="{ id: selectedCategory }">
              <template v-slot="{ result: { error, data }, isLoading }">
                <div v-if="isLoading" class="loading apollo">Loading...</div>
                <div v-else-if="error" class="error apollo">An error occurred</div>
                <div v-else-if="data.category" class="flex flex-wrap">
                  <div v-for="book in data.category.books" :key="book.id" class="w-full lg:w-1/3 px-4 mb-12">              
                    <router-link :to="`/books/${book.id}`">
                    <img :src="`${book.image}`" alt="cover image" class="h-64 mb-2" /> 
                    </router-link> 
                    <router-link :to="`/books/${book.id}`" class="font-bold text-black hover:text-gray-400">
                      {{ book.title }}
                    </router-link>
                    <div>{{ book.author }}</div>
                  </div>
                </div>
                <div v-else class="no-result apollo">No result :( </div>
              </template>
            </ApolloQuery>
          </div>         
        </div>               
      </div>
    </div>

    
    

  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import gql from 'graphql-tag'
// import categoryQuery from '@/graphql/queries/Category.gql'
// import booksQuery from '@/graphql/queries/Books.gql'
// import categoryQuery from '@/graphql/queries/Category.gql'

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

    // const booksFeaturedQuery = gql`
    //   query {
    //     booksByFeatured(featured: true) {
    //       id
    //       title
    //       author
    //       image
    //     }
    //   }`

export default {
  name: 'HomeView',
  data() {
    return {
      categoryQuery,
      booksQuery,
      // booksFeaturedQuery,      
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
      // } else if (category === 'featured') {
      //   this.query = booksFeaturedQuery
      //   this.selectedCategory = 'featured'
      } else {
        this.query = categoryQuery
        this.selectedCategory = category
      }      
        // this.selectedCategory = category
    }
  },
  
  components: {
    // HelloWorld
  }
}
</script>

<style scoped>
.link-margin {
  margin-right: 24px;
}
</style>
