import notifier from 'node-notifier';
import readline from 'readline/promises';
import child_process, { ChildProcess } from 'child_process';

try {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })

    const audioPath = `C:/Users/Faisal/OneDrive/Desktop/code playground/4. Destop Notification with py and Js/ringing.mp3`

    let reminderTime = await rl.question(`After how much minutes you want see the reminder: `);
    reminderTime = parseInt(reminderTime) * 60;

    const notificationTitle = "Drink a Water";
    const notificationMsg = `${reminderTime / 60} minutes have passed since last time you drank water. Please drink some water!`;
    function remindForWater() {
        notifier.notify(
            {
                title: notificationTitle,
                message: notificationMsg,
                sound: true, // Only Notification Center or Windows Toasters
            }
        )
    }

    setInterval(() => {
        remindForWater();
        child_process.exec(`powershell -Command "Add-Type -AssemblyName System.Speech; (New-Object System.Speech.Synthesis.SpeechSynthesizer).Speak('${notificationTitle}')"`);
    }, reminderTime * 1000);

} catch (error) {
    console.log(error);
}