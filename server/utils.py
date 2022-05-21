from security import create_key_file
import time
import json


def load_config_file():
    config = None
    with open('config.json', 'r') as f:
        config = json.load(f)
    return config


def set_config_values(param_name: str, value):
    new_config = load_config_file()
    new_config[param_name] = value
    with open('config.json', 'w') as f:
        json.dump(new_config, f, indent=4)


def write_in_log(error: str):
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
