# BUGS:

- arrow cant be accessed when scrolled down a bit: padding of #willkommen over arrow button

# TODO:

- rechtschreibung kontrolle
- logo/ img royalty kontrolle
- test verschiedene geraete
- ladezeit test (code minimalisierung und image compression)
- speisen.html: add "mehr in restaurants" field
- finish footer fire
- footer fire positioning, loop, height
- sp formatierung
- add decoration?
- info section grid: infos/ueber uns?, mit gedicht, gutscheine?
- mobile smaller heding deco

# INFO

mobile with css:
@media (pointer: coarse) and (hover: none) {}

mobile with js:
document.addEventListener("DOMContentLoaded", function() {
if (/Mobi|Android/i.test(navigator.userAgent)) {
document.body.classList.add('mobile');
}
});
