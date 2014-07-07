# www.computc.org

This is our repository for our website!! We want you to contribute!!

## Technologies

* [Express] as our server framework
* [Handlebars] as our templating engine
* [jQuery] because why would we hate ourselves?

## Installation

Assuming you have both [Git] and [NodeJS] already installed on your system, you can begin the server by executing "run.bat," which will download everything you'll need.

## Navigation (needs updating)

- archived_images: Includes some screenshots of the website that were taken throughout development. Please keep in mind that these images may not reflect the aesthetic of the website as it is today.
- content_directory and layout_directory: Stores all the markup of the website; the content is embedded within the layouts to produce the markup. At the moment, we only have a single layout for all our content, named "default layout."
- resource_directory: Stores all the scripts and styles and images and fonts for the website. Absolutely everything else goes in here. 

## Development (needs updating)

If you are assembling a new page for the website, you only have to provide the content, and not the layout; we have already developed a layout that will be automatically rendered around your content. Put your document in the "content_directory," where it will be routed by its filename. For example, a file that is named "about" will be accessible at "computc.org/about."

Any resources that your page may use should be put in the "resource_directory," where it will be available for you to include or import. We encourage you to adopt our name scheme, where any resource is named according to the page that it supports, so the stylesheet for "about.html" should be named "about.style.css."

## Structure (needs updating)

* /home
  * blurb to welcome new users.
  * buttons for signup and login.
  * list of upcoming events.
* /about
  * paragraph about what we do.
  * profiles about who we are.
  * frequently asked questions?
* /events
  * calendar of upcoming events.
  * filters for suborganizations.
* /contact
  * form to submit an inquiry?
  * list of contact information?
* /error
  * link to return to homepage.
  * form to report a bug.



[Git]:http://git-scm.com/
[NodeJS]:http://nodejs.org/
[Handlebars]:http://handlebarsjs.com/
[jQuery]:http://jquery.com/
[Express]:http://expressjs.com/