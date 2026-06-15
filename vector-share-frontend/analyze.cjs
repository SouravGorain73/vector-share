const fs = require('fs');

const data = fs.readFileSync('beatus.html', 'utf8');

const scripts = data.match(/<script[^>]*src="([^"]+)"[^>]*>/gi);
console.log('Scripts:', scripts ? scripts.length : 0);

const css = data.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi);
console.log('CSS Links:', css ? css.length : 0);
if(css) {
    console.log(css.join('\n'));
}

const colors = data.match(/#[0-9a-fA-F]{3,6}/gi) || [];
const uniqueColors = [...new Set(colors)];
console.log('Colors:', uniqueColors.slice(0, 30));

const fonts = data.match(/font-family[^;>]+/gi) || [];
const uniqueFonts = [...new Set(fonts)];
console.log('Fonts:', uniqueFonts.slice(0, 10));

if(data.includes('gsap')) console.log('GSAP found!');
if(data.includes('aos')) console.log('AOS found!');
if(data.includes('framer-motion')) console.log('Framer Motion found!');
if(data.includes('locomotive')) console.log('Locomotive Scroll found!');
if(data.includes('lenis')) console.log('Lenis Scroll found!');
if(data.includes('barba')) console.log('Barba.js found!');
if(data.includes('lottie')) console.log('Lottie found!');
