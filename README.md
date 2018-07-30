*Front End Nanodegree @Udacity*  
*Part 4: Front-End Applications*

# P6: Restaurant Reviews App

> You will take a static design that lacks accessibility and convert the design to be responsive on different sized displays and accessible for screen reader use. You will also add a service worker to begin the process of creating a seamless offline experience for your users.

## Responsive design

1. site UI compatible with a range of display sizes
    - All content is responsive and displays on a range of display sizes.
    - Content should make use of available screen real estate and should display correctly at all screen sizes.
        - meta viewport tag
            ```html
            <meta name="viewport" content="width=device-width, initial-scale=1">
            ```
    - An image's associated title and text renders next to the image in all viewport sizes.
2. responsive images
3. application elements visible and usable in all viewports
    - appropriate touch targets: min 48dp(=device independent pixels = ca. 9mm2)

## Accessibility

For a11y implementation use dev tools audit!

1. Accessible Images
    - All content-related images include appropriate alternate text that clearly describes the content of the image.
2. focus used appropriately?
    - Focus is appropriately managed allowing users to noticeably tab through each of the important elements of the page. Modal or interstitial windows appropriately lock focus.
3. semantically defined site elements
    - Elements on the page use the appropriate semantic elements. For those elements in which a semantic element is not available, appropriate `ARIA roles` are defined.

## Offline use

- Are pages that have been visited available offline?
  - When available in the browser, the site uses a service worker to cache responses to requests for site assets. Visited pages are rendered when there is no network access.