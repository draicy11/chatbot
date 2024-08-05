const readline = require('readline');

// Create interface for reading lines from the command line
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Prompt user for input


rl.question('Enter something : ', (input) => {
    console.log(`You entered: ${input}`);
    // Close the readline interface
    rl.close();
});

