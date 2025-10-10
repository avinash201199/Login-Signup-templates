
## Install tailwind CLI for css 

#### Install tailwindcss and @tailwindcss/cli via npm.
``` bash
npm install tailwindcss @tailwindcss/cli
```

#### Add the @import "tailwindcss"; import to your style CSS file.

``` bash
@import "tailwindcss";
```

#### Run the CLI tool to scan your source files for classes and build your CSS.
``` bash
npx @tailwindcss/cli -i input.css -o output.css --watch
```

#### Add your compiled CSS file `output.css` to the `<head>` and start using Tailwind’s utility classes to style your content.
``` html
<!doctype html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="./output.css" rel="stylesheet">
</head>
<body>
  <h1 class="text-3xl font-bold underline">
    Hello world!
  </h1>
</body>
</html>
```


## JS file instruction

To integrate this template into your project you need to modify the app.js file.

You can complete change the `main()` function logic. Currently it is chacking the pathname to decide whether it is a login or signup page and accordigly it is fething the DOM elements 

The login and signup function are provided with the snackbar feature which only takes message which is to be shown on screen as a parameter 

The validation functions are providing very basic validations it is encouraged to add more validations
