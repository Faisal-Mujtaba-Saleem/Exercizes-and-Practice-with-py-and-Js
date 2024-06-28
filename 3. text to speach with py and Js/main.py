# Without using any 3rd party Lib. using simple os module to execute a command directly on cmd prompt
import win32com.client
# import os

listToSpeak = [
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

# for phrase in listToSpeak:
#     command = f'powershell -Command "Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak(\'{
#         phrase}\')" '
#     os.system(command)

# Using win32com library to interact with the Windows Text-to-Speech (TTS) engine

speak = win32com.client.Dispatch("SAPI.SpVoice")

for phrase in listToSpeak:
    speak.Speak(phrase)
