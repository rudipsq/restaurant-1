# BUGS:

- arrow cant be accessed when scrolled down a bit: padding of #willkommen over arrow button
- header at start is only opacity 0, so it can still be clicked, should this be like this?

# NOTES:

font family: Gabriela
good color: #B61A1F

https://www.realtimecolors.com/?colors=ffffff-2b1900-bd0006-770a0d-e0c22d&fonts=Gabriela-Gabriela

# codepen backup

<section id="start">
        <div>Start Section (Fixed)</div>
    </section>
    <section id="second">
        <div>Second Section (Scrolling)</div>
    </section>
    <section id="third">
        <div>Third Section (Revealed)</div>
    </section>

body {
margin: 0;
font-family: 'Arial', sans-serif;
height: 300vh;
}

        section {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2em;
        }

        #start {
            background-color: #3498db;
            position: fixed;
            top: 0;
            width: 100%;
            z-index: 1;
        }

        #second {
            background-color: #2ecc71;
            position: relative;
            z-index: 2;
            margin-top: 100vh;
        }

        #third {
            top: 0;
            width: 100%;
            height: 200vh;
            background-color: #e74c3c;
        }

        .hide {
            opacity: 0;
        }

        .active {
            position: fixed;
        }
