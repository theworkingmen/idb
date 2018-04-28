@title[Introduction]
## The Working Men

GitPitch Presentation for CS373
See our site at [majorpotential.me](http://majorpotential.me)

---

## Who Are These Jerks?

<br>

- Mitchell Traylor (Back End, Testing, Report Author)
- Abel Tesfaye (Back End, Front End)
- Neal Friesenhahn (Back End, Hosting, API)
- Christian Onuogu (Front End)
- Sungsup Lee (Front End)

---

## Demo Time!
[majorpotential.me](http://majorpotential.me)

---

## What Did We Do Well?

- Everything |
  + (We can elaborate, we're not narcissistic we promise) |
- Coordination |
- Issue Tracking and User Stories |

---

## Also, Google likes us
- Add screenshot for proof
- Or a live demo, but we should verify day-of

---

## How Could We Improve?

- Working outside our roles |
- Make pages more interesting |
  + Animation, reworked content, etc |
- Make the front-end more beautiful |
- More data to display |

---

## What Did We Learn From This?

- There are MANY components to big projects like this |
- Planning is ESSENTIAL |
- All the tools |
  + AWS,  | React,  | SQLAlchemy,  |
  + API Building... |
  + (You get the idea) |

---

## What Puzzles Us?

- Amazon Lambda |
  + Thankfully we didn't use this |
- Elastic Beanstalk |
  + Adding servers breaks IPs |
- Why our peers dislike GitBook |
  + It worked just fine for us, like any other document editor |

---

## Proving tests
- screenshots, or live demo, or what?

---

## We The SWEople
- See their site at [swethepeople.me](http://swethepeople.me)
- And yes, we all know their names are intentionally confusing

---

## What Did They Do Well?

- Implementing suggestions |
- Preserving filters (wow!) |
- Lots of information |
- Neatly organized |

---

## What Could They Do Better?

- Interactive map for districts |
- Their site is open for other new additions |
  + Including senators too |
  + Extended voting history |

---

## What Did We Learn From Them?

- Front end organizing and design |
- Site animations |
- So many "third" parties |

---

## What Puzzles Us (About Them)?

- Why wasn't certain data available? |
- Party sorting and filtering choices are weird |
- Where is Benny's back? |

---

## Placeholder slide
- Anything else past here just came with the template

---?code=sample/go/server.go&lang=golang&title=Golang File

@[1,3-6](Present code found within any repo source file.)
@[8-18](Without ever leaving your slideshow.)
@[19-28](Using GitPitch code-presenting with (optional) annotations.)

---

@title[JavaScript Block]

<p><span class="slide-title">JavaScript Block</span></p>

```javascript
// Include http module.
var http = require("http");

// Create the server. Function passed as parameter
// is called on every request made.
http.createServer(function (request, response) {
  // Attach listener on end event.  This event is
  // called when client sent, awaiting response.
  request.on("end", function () {
    // Write headers to the response.
    // HTTP 200 status, Content-Type text/plain.
    response.writeHead(200, {
      'Content-Type': 'text/plain'
    });
    // Send data and end response.
    response.end('Hello HTTP!');
  });

// Listen on the 8080 port.
}).listen(8080);
```

@[1,2](You can present code inlined within your slide markdown too.)
@[9-17](Displayed using code-syntax highlighting just like your IDE.)
@[19-20](Again, all of this without ever leaving your slideshow.)

---?gist=onetapbeyond/494e0fecaf0d6a2aa2acadfb8eb9d6e8&lang=scala&title=Scala GIST

@[23](You can even present code found within any GitHub GIST.)
@[41-53](GIST source code is beautifully rendered on any slide.)
@[57-62](And code-presenting works seamlessly for GIST too, both online and offline.)

---

## Template Help

- [Code Presenting](https://github.com/gitpitch/gitpitch/wiki/Code-Presenting)
  + [Repo Source](https://github.com/gitpitch/gitpitch/wiki/Code-Delimiter-Slides), [Static Blocks](https://github.com/gitpitch/gitpitch/wiki/Code-Slides), [GIST](https://github.com/gitpitch/gitpitch/wiki/GIST-Slides)
- [Custom CSS Styling](https://github.com/gitpitch/gitpitch/wiki/Slideshow-Custom-CSS)
- [Slideshow Background Images](https://github.com/gitpitch/gitpitch/wiki/Background-Setting)
- [Background Image Scaling](https://github.com/gitpitch/gitpitch/wiki/Image-Slides#scaling)
- [Custom Logo](https://github.com/gitpitch/gitpitch/wiki/Logo-Setting), [TOC](https://github.com/gitpitch/gitpitch/wiki/Table-of-Contents), and [Footnotes](https://github.com/gitpitch/gitpitch/wiki/Footnote-Setting)

---

## GitPitch Pro Features

<br>
<div class="left">
    <i class="fa fa-user-secret fa-5x" aria-hidden="true"> </i><br>
    <a href="https://gitpitch.com/pro-features" class="pro-link">
    More details here.</a>
</div>
<div class="right">
    <ul>
        <li>Private Repos</li>
        <li>Private URLs</li>
        <li>Password-Protection</li>
        <li>Image Opacity</li>
        <li>SVG Image Support</li>
    </ul>
</div>

---

### Questions?

<br>

@fa[twitter gp-contact](@gitpitch)

@fa[github gp-contact](gitpitch)

@fa[medium gp-contact](@gitpitch)

---?image=assets/image/gitpitch-audience.jpg&opacity=100

@title[Download this Template!]

### <span class="white">Get your presentation started!</span>
### [Download this template @fa[external-link gp-download]](https://gitpitch.com/template/download/triangles)

---?image=assets/image/snowscape.jpg&size=auto 80%&color=#58b9f5

<!-- Sample slide background image scaling and custom color fill -->

---

### Unused code that came with the template...

@fa[arrows gp-tip](Press F to go Fullscreen)

@fa[microphone gp-tip](Press S for Speaker Notes)
