# Collector

Collector is an app you can use for people to let them document their experience of a planned trip. How it works: You have a list of cards that you have to unlock. For unlocking you have to answer a connected question. If answered correctly you can take a picture that will then show up on the card instead of the name. To see your progress there is another page. It contains a hidden image that reveals more and more the more cards you fill with your taken images.

It's made as a progressive web app and works fully locally (and offline once installed). So you can host it on your server but also on servers like github as it is an html, js, css only page. All images you submit are stored in your browser and won't be sent to a server.

## How to use

Create a file called `/data.js`. Input the data in JSON format with the structure below. In `/assets` add an image called `path.png`. This will be the image that gets reveald. Then upload your version to a server of your choice. Install the PWA through selecting install or add to homescreen (depends on your browser)

### JSON Structure

```
data = [
  {
    description: "Your description that will show up on the cards that have no image yet",
    title: "Your title that will be displayed on the card's page",
    question: "The question that has to be answered",
    tpp: "A hint on the card's page that can be opened",
    answers: [
      {
        text: "Answer One",
        bool: true, //Is answer right or wrong?
      },
      ... //You can add unlimited more answers
    ],
  },
  ... //You can add unlimited more cards
];
```
