# BUGS:

- arrow cant be accessed when scrolled down a bit: padding of #willkommen over arrow button
- alle speisen button on mobile on wrong location

# TODO:

- rechtschreibung kontrolle
- logo/ img royalty kontrolle
- test verschiedene geraete
- ladezeit test (code minimalisierung und image compression)
- speisen.html: add "mehr in restaurants" field
- finish footer fire: positioning, loop, height
- add decoration like other food or tools?
- jobs grid auf eigener seite
- mobile smaller heding decoration

# INFO

## mobile device detection with css:

@media (pointer: coarse) and (hover: none) {}

## mobile device detection with js:

document.addEventListener("DOMContentLoaded", function() {
if (/Mobi|Android/i.test(navigator.userAgent)) {
document.body.classList.add('mobile');
}
});

and then:
body.mobile .example {}

/_ Style if the class 'mobile' is NOT present _/
body:not(.mobile) .example {}

## viewport heights

https://chatgpt.com/share/45d877d3-ee9f-48b7-8539-a94de2ed7926

- svh (Small Viewport Height): height except ui
- lvh (Large Viewport Height): max height (without browser ui): could be used for overlays
- dvh (Dynamic Viewport Height): changes dynamically - really different than vh?
