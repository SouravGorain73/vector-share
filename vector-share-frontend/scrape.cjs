const https = require('https');

https.get('https://www.beatushoehlen.swiss/en/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Extract CSS links and basic styling info
    const cssLinks = data.match(/<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/gi) || [];
    const fonts = data.match(/font-family[^;>]+/gi) || [];
    const scripts = data.match(/<script[^>]*src="([^"]+)"[^>]*>/gi) || [];
    
    console.log('--- CSS Links ---');
    console.log(cssLinks.join('\n'));
    console.log('--- Scripts ---');
    console.log(scripts.join('\n'));
    
    // Look for animation libraries
    console.log('--- Animation Libraries ---');
    if(data.includes('gsap')) console.log('GSAP found!');
    if(data.includes('aos')) console.log('AOS found!');
    if(data.includes('framer-motion')) console.log('Framer Motion found!');
    if(data.includes('locomotive')) console.log('Locomotive Scroll found!');
    if(data.includes('lenis')) console.log('Lenis Scroll found!');
    if(data.includes('barba')) console.log('Barba.js found!');
    if(data.includes('lottie')) console.log('Lottie found!');
    
    // Check specific layout classes
    console.log('--- Colors / Themes ---');
    const colors = data.match(/#[0-9a-fA-F]{3,6}/gi) || [];
    const uniqueColors = [...new Set(colors)];
    console.log(uniqueColors.slice(0, 20).join(', '));
  });
}).on('error', (err) => {
  console.log('Error:', err.message);
});
