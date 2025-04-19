const { defineConfig } = require('vite')

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        contact: './contact.html',
        // blog: './blog.html',
        work: './work.html',
        blog1: './blog1.html',
        blog2: './blog2.html',
        blog3: './blog3.html',
        project1: './project1.html',
        project2: './project2.html',
      }
    }
  }
})