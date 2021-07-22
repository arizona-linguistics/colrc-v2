import json
import os
import requests
import shutil
import sys
import zipfile

BASE_DIR = f'{os.path.dirname(os.path.realpath(__file__))}/file_data'
DROPBOX_FILE_DIR='/colrc-v2-files'
DROPBOX_ACCESS_TOKEN='H66L2R8JfX8AAAAAAAAAASyxUvZolCy956ASqQZjEPhFHXDbfa5zbk1pmNdsxYSA'

# Do not change any constants below this line!
FILE_DIR = f'{BASE_DIR}/files'
ZIP_FILE= f'{BASE_DIR}/files.zip'
CURSOR_FILE = f'{BASE_DIR}/cursor'
CURSOR_FILE_BACKUP = f'{CURSOR_FILE}.old'
LOG_FILE = f'{BASE_DIR}/dropbox-sync.log'

def download_all():
    """Downloads everything at DROPBOX_FILE_DIR to ZIP_FILE, and extracts to FILE_DIR. """

    headers = {
        'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
        'Dropbox-API-Arg': f'{{"path": "{DROPBOX_FILE_DIR}"}}'
    }
    
    response = requests.post('https://content.dropboxapi.com/2/files/download_zip', headers=headers, stream=True)
    
    if not os.path.isdir(BASE_DIR):
        print('Making base directory...')
        os.makedirs(BASE_DIR)
    
    print('\nDownloading zip file from Dropbox...')
    with open(ZIP_FILE, 'wb') as f:
        megabytes_written = 0
        for chunk in response.iter_content(chunk_size=1024):
            f.write(chunk)
            megabytes_written += 1/1024
            print(f'\r{megabytes_written:.0f}MB downloaded...', end='', flush=True)

    extract()

    print('Making backup cursor file...')
    save_cursor(CURSOR_FILE_BACKUP)

    print('Making cursor file...')
    shutil.copy(CURSOR_FILE_BACKUP, CURSOR_FILE)


def download_file(file, dl_location):
    """
    Downloads a file from Dropbox. 
    
    Parameters
    ----------
    file : str
        The file's path in Dropbox.
    
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

def update(cursor, save_new_cursor=True):
    """
    Updates the local filesystem with changes from the Dropbox folder.

    Parameters
    ----------
    cursor : str
        The Dropbox cursor obtained from the last sync to update with.
    
    save_new_cursor : bool, default=True
        Saves a new cursor at the end of execution. This is not needed for recursive calls.
    """
    
    headers = {
    'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
    'Content-Type': 'application/json'
    }
    data = f'{{"cursor": "{cursor}"}}'

    response = requests.post('https://api.dropboxapi.com/2/files/list_folder/continue', headers=headers, data=data)
    updated_files = json.loads(response.content)
    
    if updated_files['entries']:
        for entry in updated_files['entries']:
            relative_path = entry["path_display"].replace(f'{DROPBOX_FILE_DIR}/', "")
            local_path = f'{FILE_DIR}/{relative_path}'

            if entry['.tag'] == 'deleted':
                try:
                    if os.path.isdir(local_path):
                        shutil.rmtree(local_path)
                        print(f'DEL {relative_path}')
                    elif os.path.isfile(local_path):
                        os.remove(local_path)
                        print(f'DEL {relative_path}')
                    else:
                        print(f'DEX {relative_path}')
                except:
                    print(f'ERR DEL {relative_path}')
            
            elif entry['.tag'] == 'file':
                try:
                    download_file(entry['path_display'], local_path)
                    os.chmod(local_path, 0o777)
                    print(f'ADD {relative_path}')
                except FileExistsError:
                    print(f'AEX {relative_path}')
                except:
                    print(f'ERR ADD {relative_path}')
            
            elif entry['.tag'] == 'folder':
                try:
                    os.mkdir(local_path)
                    os.chmod(local_path, 0o777)
                    print(f'ADD {relative_path}')
                except FileExistsError:
                    print(f'AEX {relative_path}')
                except:
                    print(f'ERR ADD {relative_path}')
            
            else:
                print(f'Unknown error has occurred. Please check the log (located at {LOG_FILE}) for details.')
                with open(LOG_FILE, 'w') as f:
                    f.write(response.content)
                sys.exit(1)

        if updated_files['has_more']:
            update(updated_files['cursor'], save_new_cursor=False)
        
        if save_new_cursor:
            print('Updating cursor file...')
            save_cursor(CURSOR_FILE)

    else:
        print('\nNo files to update.')

def save_cursor(location):
    """
    Saves the cursor (or snapshot) of the Dropbox folder to a file.

    Parameters
    ----------
    location : str
        The location to make the cursor file at.
    """
    
    headers = {
    'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
    'Content-Type': 'application/json'
    }
    data = f'{{"path": "{DROPBOX_FILE_DIR}", "recursive": true, "include_deleted": true, "include_non_downloadable_files": false}}'

    response = requests.post('https://api.dropboxapi.com/2/files/list_folder/get_latest_cursor', headers=headers, data=data)
    cursor = json.loads(response.text)['cursor']
    
    with open(location, 'w') as f:
        f.write(cursor)

def extract():
    print('\nExtracting zip file...')
    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        z.extractall(BASE_DIR)

    print('\nRenaming folder...')
    os.rename(f'{BASE_DIR}{DROPBOX_FILE_DIR}', FILE_DIR)

    print('Changing file permissions...')
    for root, dirs, files in os.walk(FILE_DIR):
        for d in dirs:
            os.chmod(os.path.join(root, d), 0o777)
        for f in files:
            os.chmod(os.path.join(root, f), 0o777)
 
def main():
    if os.path.isdir(FILE_DIR):
        if os.path.isfile(CURSOR_FILE):
            with open(CURSOR_FILE) as f:
                print('\nUpdating your current directory...\n')
                update(f.readline())
        
        else:
            print('\nWhile an nginx file directory was found, a Dropbox cursor was not.')
            print('Since the cursor tells Dropbox how long ago this program last checked for updates, ')
            print('the folder may be recreated automatically with the new cursor, or you can update it yourself.')
            
            if input('Would you like to automatically remove and recreate the folder with a new cursor? [y,N] ') in ['y', 'Y', 'yes', 'Yes']:
                print('Removing old directory...')
                shutil.rmtree(FILE_DIR)
                download_all()
    
    else:
        if os.path.isfile(CURSOR_FILE_BACKUP) and os.path.isfile(ZIP_FILE):
            print('\nNo nginx file directory has been found, but the program can restore from a backup.')
            if input('Would you like to restore an older state of the folder? (NOTE: You will still be able to update it once this  has finished.) [y,N] ') in ['y', 'Y', 'yes', 'Yes']:
                extract()
                print('Restoring cursor...')
                shutil.copy(CURSOR_FILE_BACKUP, CURSOR_FILE)
                print('\nRestore complete! If you would like to update your local directory, you may run this program again.')
                
        else:
            print('\nNo nginx file directory found.')
            download_all()

main()