  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>{{title}}</title>
  </head>
  <style>
  a{
      display:block;
      color:green;
  }
    
  </style>
  <body>
      {{#each files}}
        <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
      {{/each}}
  </body>
  </html>