# Todo flux application

A simple task todo application
Based on pattern React Flux 
Written in ES6 and less

Flux in overall
  first View -> user interacts -> action -> dispatcher -> module store creates onChange event that
     tells View to re-render

Contains:
   css /  - all styling files
   images / - images
   js /
     actions / (actions that pass info to stores)
     components / (mainly views)
     constants /(for actions)
     data / initialization models
     stores / main logic components of application (each for each component)
     util / common helpers
    app.js -> starting point
    dispatcher.js -> dispatch utility tool

To minify css and create css bundle
to build css -> npm run build:css

To build from less
build less -> npm run build-less

To start application

and comment in public/index.html other css's and uncomment bundle.css

1. cmd -> cd [path to project]
2. cmd -> npm install
3. cmd -> npm run build-and-server
4. open in browser (Chrome, Firefox) link: http://localhost:8080
5. page opens and navigate through links

