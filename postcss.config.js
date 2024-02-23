const { postcss } = require("postcss-uncss");

module.exports = {
  plugins: [
    
      {
        'postcss-import': {},
        'tailwindcss/nesting': {},    
        tailwindcss: {},
        autoprefixer: {},    
      }, 

      require('postcss-unncss')({
        html: []
      })

  ]
};
