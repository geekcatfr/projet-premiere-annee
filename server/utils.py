from security import createKeyConfigFile
import time


def checkConfiguration():
    pass


def writeInLog(error: str):
    """Takes an error in str format as argument, writes in db.log the error with formatted time."""
    log_file = "db.log"
    error = str(error)
    current_time = time.strftime("%H:%M:%S", time.localtime())
    try:
        with open(log_file, 'a') as logfile:
            logfile.write(f"{current_time} \"{error}\"\n")
    except FileNotFoundError:
        print(f"[NOTE] File {log_file} doesn't exist. Creating it...")
        open(log_file, 'x').close()
