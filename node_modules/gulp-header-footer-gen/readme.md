gulp-header-footer-gen
==========================

Most web sites share a common HTML header and footer throughout a web site.
This Plugin attempts to solve a simple problem, the ability to share a single page template that includes both a header and footer with the entire web site (all html pages).

If you know DreamWeaver, it's the same idea as Web Template (DWT)

Easier to explain with an example.

Site structure:

before gulp execution:

<pre>
index.html
|
   _source -
      file1.html
      file2.html
      file3.html
|
   _js
   _css
   ...
</pre>


after gulp execution:

<pre>
index.html
|
   _source -
      file1.html
      file2.html
      file3.html
|
   _js
   _html
      file1.html
      file2.html
      file3.html
   _css
   ...

</pre>

with all references to ./ changed to ../

so gulp-header-footer-gen will generate the HTML pages for us.


How to setup:
==============

In index.html (or whatever template file you choose that resides at the root of the project) put your content between the tags of:

```
<!-- MAIN_CONTENT_START -->

<!-- MAIN_CONTENT_END -->
```

so a typical index.html will look like:


HTML template sample:
==============

```

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml"><!-- InstanceBegin template="/Templates/Template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Mediasignage</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Mediasignage"/>
    <meta name="keywords" content="Mediasignage"/>
    <meta name="publisher" content="Mediasignage"/>
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="images/favicon.ico" type="image/x-icon"/>
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Leckerli+One" media="screen">
    <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Pacifico" media="screen">
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" type="text/css" href="./css/layout.css" media="screen">
    <link rel="stylesheet" type="text/css" href="./css/bootstrap.css" media="screen">
</head>

<body>
<div class="MyHeader">
   ...
</div

<!-- MAIN_CONTENT_START -->

<section id="myContentForIndex">
</section>

<!-- MAIN_CONTENT_END -->

<footer>
    <div class="container">
    </div>
</footer>

<script src="./js/jquery-1.4.2.js" type="text/javascript"></script>
<script src="./js/sliding.js" type="text/javascript"></script>
<script src="./js/jquery.easing.js" type="text/javascript"></script>
<script src="./js/jquery-1.7.1.min.js" type="text/javascript"></script>
<script src="./js/bootstrap.js" type="text/javascript"></script>
<script type="text/javascript" src="./html5lightbox/jquery.js"></script>
<script type="text/javascript" src="./html5lightbox/html5lightbox.js"></script>
</body>
</html>


```

Plugin responsibility:
==============

- remove index.html content (between the MAIN_CONTENT START and END).
- use the rest of the page as a template
- replace the content of all _html/* pages with the index.html template and replace all './' paths with '../' so we can still load up images, CSS, scripts etc from proper path.

remember, in your _html/file1.html etc you also need to use the same pattern, i.e.: put all page content between the opening and closing tags of

```
<!-- MAIN_CONTENT_START -->
...
<!-- MAIN_CONTENT_END -->
```

To execute:
==============

```
gulp.task('headerFooterGan', function () {
    gulp.src('./_source/*')
        .pipe(headerfootergen('./index.html')).on('error', handleError)
        .pipe(gulp.dest('./_html/'))
});

function handleError(err) {
    console.log(err.toString());
    this.emit('end');
}
```

Demo:
==============
https://github.com/born2net/webSiteBoilerplate
