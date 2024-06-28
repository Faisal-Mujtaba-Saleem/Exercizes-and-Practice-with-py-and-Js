import { exec } from 'child_process';

const listToSpeak = [
    'Basic greetings and confirmations',
    "Hello",
    "Hi",
    "Goodbye",
    "Yes",
    "No",
    "Okay",

    'Commands (adjust based on your application)',
    "Turn on the lights",
    "Turn off the lights",
    "Set the temperature to 72 degrees",
    "Play music",
    "Pause music",
    "Next song",
    "Open the door",
    "Close the door",
    "Call John",
    "Send a message to Sarah",

    'Numbers (optional, if relevant)',
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",

    'Colors (optional, if relevant)',
    "Red",
    "Green",
    "Blue",
    "Yellow",
    "Black",
    "White",

    'Questions (optional, if relevant)',
    "What is the weather like today?",
    "What time is it?",
    "What can you do?",
]

for (const phrase in listToSpeak) {
    const powerShellCommand = `powershell -Command "Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak(\'${phrase}\')"`;
    exec(powerShellCommand, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log(stdout);
            console.log(stderr);
        }
    });
}
