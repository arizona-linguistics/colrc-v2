import click
import json
import os
import requests
import shutil
import sys
import zipfile

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
FILE_DIR = f'{BASE_DIR}/file_data'
ZIP_FILE= f'{BASE_DIR}/files.zip'
CURSOR_FILE = f'{BASE_DIR}/cursor'
LOG_FILE = f'{BASE_DIR}/dropbox-sync.log'

DROPBOX_FILE_DIR='/colrc-v2-files'
DROPBOX_ACCESS_TOKEN='H66L2R8JfX8AAAAAAAAAASyxUvZolCy956ASqQZjEPhFHXDbfa5zbk1pmNdsxYSA'

def download_all(dl_location):
    """
    Downloads everything at DROPBOX_FILE_DIR as a .zip file. 
    
    Parameters
    ----------
    dl_location : str
        The path to extract the zip file to on the local filesystem (excluding the name of the folder, since it will be named FILE_DIR).
    """

    headers = {
        'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
        'Dropbox-API-Arg': f'{{"path": "{DROPBOX_FILE_DIR}"}}'
    }
    
    response = requests.post('https://content.dropboxapi.com/2/files/download_zip', headers=headers, stream=True)
    
    print('\nDownloading zip file from Dropbox...')
    with open(ZIP_FILE, 'wb') as f:
        megabytes_written = 0
        for chunk in response.iter_content(chunk_size=1024):
            f.write(chunk)
            megabytes_written += 1/1024
            print(f'\r{megabytes_written:.0f}MB downloaded...', end='', flush=True)
    
    print('Extracting zip file...')
    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        z.filename = 'file_data'
        z.extractall(dl_location)

        print('Renaming folder...')
        os.rename(f'{BASE_DIR}/{DROPBOX_FILE_DIR}', FILE_DIR)

    print('Removing zip file...')
    os.remove(ZIP_FILE)

    print('Changing file permissions...')
    for root, dirs, files in os.walk(FILE_DIR):
        for d in dirs:
            os.chmod(os.path.join(root, d), 0o777)
        for f in files:
            os.chmod(os.path.join(root, f), 0o777)

    save_cursor()

def download_file(file, dl_location):
    """
    Downloads a file from Dropbox. 
    
    Parameters
    ----------
    file : str or int
        The file's path or ID in Dropbox.
    
    dl_location : str
        The path to download the file to on the local filesystem.
    """

    headers = {
        'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
        'Dropbox-API-Arg': f'{{"path": "{file}"}}'
    }
    
    response = requests.post('https://content.dropboxapi.com/2/files/download', headers=headers)
    
    if os.path.isdir(dl_location):
        raise FileExistsError

    with open(dl_location, 'wb') as f:
        f.write(response.content)
            
def save_cursor():
    """
    Saves the cursor (or snapshot) of the Dropbox folder to a file.
    """
    
    headers = {
    'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
    'Content-Type': 'application/json'
    }
    data = f'{{"path": "{DROPBOX_FILE_DIR}", "recursive": true, "include_deleted": true, "include_non_downloadable_files": false}}'

    response = requests.post('https://api.dropboxapi.com/2/files/list_folder/get_latest_cursor', headers=headers, data=data)
    cursor = json.loads(response.text)['cursor']
    
    print('\nSaving cursor...')
    with open(CURSOR_FILE, 'w') as f:
        f.write(cursor)

def update(cursor):
    """
    Updates the local filesystem with changes from the Dropbox folder.

    Parameters
    ----------
    cursor : str
        The Dropbox cursor obtained from the last sync to update with.
    """
    
    headers = {
    'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
    'Content-Type': 'application/json'
    }
    data = f'{{"cursor": "{cursor}"}}'

    response = requests.post('https://api.dropboxapi.com/2/files/list_folder/continue', headers=headers, data=data)
    updated_files = json.loads(response.content)
    
    if updated_files['entries']:
        print('\nUpdating your current directory...')
        for entry in updated_files['entries']:
            local_path = f'{FILE_DIR}{entry["path_display"].replace(DROPBOX_FILE_DIR, "")}'
            
            if entry['.tag'] == 'deleted':
                try:
                    if os.path.isdir(local_path):
                        shutil.rmtree(local_path)
                        print(f'DEL {entry["name"]}')
                    elif os.path.isfile(local_path):
                        os.remove(local_path)
                        print(f'DEL {entry["name"]}')
                    else:
                        print(f'DEX {entry["name"]}')
                except:
                    print(f'ERR DEL {entry["name"]}')
            
            elif entry['.tag'] == 'file':
                try:
                    download_file(entry['path_display'], local_path)
                    os.chmod(local_path, 0o777)
                    print(f'ADD {entry["name"]}')
                except FileExistsError:
                    print(f'AEX {entry["name"]}')
                except:
                    print(f'ERR ADD {entry["name"]}')
            
            elif entry['.tag'] == 'folder':
                try:
                    os.mkdir(local_path)
                    os.chmod(local_path, 0o777)
                    print(f'ADD {entry["name"]}')
                except FileExistsError:
                    print(f'AEX {entry["name"]}')
                except:
                    print(f'ERR ADD {entry["name"]}')
            
            else:
                print(f'Unknown error has occurred. Please check the log (located at {LOG_FILE}) for details.')
                with open(LOG_FILE, 'w') as f:
                    f.write(response.content)
                sys.exit(1)
        
        save_cursor()
    
    else:
        print('\nNo files to update.')

# TODO: Support longer output from Dropbox, which comes with its own cursor(s) 
def main():
    if os.path.isdir(FILE_DIR):
        if os.path.isfile(CURSOR_FILE):
            with open(CURSOR_FILE) as f:
                update(f.readline())
        
        else:
            print('\nWhile an nginx file directory was found, a Dropbox cursor was not.')
            print('Since the cursor tells Dropbox how long ago this program last checked for updates, ')
            print('the folder may be recreated automatically with the new cursor, or you can update it yourself.')
            
            if click.confirm('Would you like to automatically remove and recreate the folder with a new cursor?'):
                shutil.rmtree(FILE_DIR)
                download_all(BASE_DIR)
    
    else:
        print('\nNo nginx file directory found.')
        download_all(BASE_DIR)

main()