const response = await fetch('/config.json');
const config = await response.json();

export default config;