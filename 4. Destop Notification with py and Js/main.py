from win10toast import ToastNotifier
import pygame
import time

try:
    toaster = ToastNotifier()
    mixer = pygame.mixer
    mixer.init()
    music = mixer.music

    reminder_time = input('After how many minutes you want see the reminder: ')
    reminder_time = int(reminder_time) * 60

    def remindForWater():
        toaster.show_toast(
            "Drink a Water",
            f"{reminder_time/60} minutes have passed since last time you drank water. Please drink some water!",
            duration=10,  # duration in seconds
            icon_path=None,  # path to .ico file
            threaded=True
        )

        music.load('ringing.mp3')
        music.play()

    def stop_ringing():
        try:
            is_stop = input('If you want to stop ringing then press \'s\': ')
            if is_stop.lower() != 's':
                raise ValueError(f'Invalid input {is_stop}, Expected \'s\'')
            else:
                music.stop()
        except Exception as error:
            print(error)
            stop_ringing()

    while True:
        time.sleep(reminder_time)
        remindForWater()
        stop_ringing()

except Exception as error:
    print(error)
