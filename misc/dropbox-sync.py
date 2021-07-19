import click
import json
import os
import requests
import shutil
import zipfile

BASE_DIR = os.path.dirname(os.path.realpath(__file__))
FILE_DIR = f'{BASE_DIR}/file_data'
ZIP_FILE= f'{BASE_DIR}/files.zip'
CURSOR_FILE = f'{BASE_DIR}/cursor'

DROPBOX_FILE_DIR='/colrc-v2-files'
DROPBOX_ACCESS_TOKEN='H66L2R8JfX8AAAAAAAAAASyxUvZolCy956ASqQZjEPhFHXDbfa5zbk1pmNdsxYSA'

def download_folder(folder, dl_location, rename=False, progress=False):
    headers = {
        'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
        'Dropbox-API-Arg': f'{{"path": "{folder}"}}'
    }
    
    response = requests.post('https://content.dropboxapi.com/2/files/download_zip', headers=headers, stream=True)
    
    print('\nDownloading zip file from Dropbox...')
    with open(ZIP_FILE, 'wb') as f:
        megabytes_written = 0
        for chunk in response.iter_content(chunk_size=1024):
            f.write(chunk)
            megabytes_written += 1/1024
            if progress:
                print(f'\r{megabytes_written:.0f}MB downloaded...', end='', flush=True)
    
    print('\nExtracting zip file...')
    with zipfile.ZipFile(ZIP_FILE, 'r') as z:
        z.filename = 'file_data'
        z.extractall(dl_location)

    if rename:
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

def download_file(file, dl_location):
    headers = {
        'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
        'Dropbox-API-Arg': f'{{"path": "{file}"}}'
    }
    
    response = requests.post('https://content.dropboxapi.com/2/files/download', headers=headers)
    
    with open(dl_location, 'wb') as f:
        f.write(response.content)
            
def save_cursor():
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
    headers = {
    'Authorization': f'Bearer {DROPBOX_ACCESS_TOKEN}',
    'Content-Type': 'application/json'
    }
    data = f'{{"cursor": "{cursor}"}}'

    updated_files = json.loads(requests.post('https://api.dropboxapi.com/2/files/list_folder/continue', headers=headers, data=data).content)
    
    print('\nUpdating files:')
    for entry in updated_files['entries']:
        local_path = f'{FILE_DIR}{entry["path_display"].replace(DROPBOX_FILE_DIR, "")}'
        
        if entry['.tag'] == 'deleted':
            try:
                if os.path.isdir(local_path):
                    shutil.rmtree(local_path)
                else:
                    os.remove(local_path)
                print(f'DEL {entry["name"]}')
            except:
                print(f'ERR DEL {entry["name"]}')
        
        elif entry['.tag'] == 'file':
            try:
                download_file(entry['path_display'], local_path)
                print(f'ADD {entry["name"]}')
            except:
                print(f'ERR ADD {entry["name"]}')
        
        elif entry['.tag'] == 'folder':
            try:
                download_folder(entry['path_display'], local_path.replace(entry['name'], ''))
                print(f'ADD {entry["name"]}')
            except:
                print(f'ERR ADD {entry["name"]}')

def main():
    if os.path.isdir(FILE_DIR):
        if os.path.isfile(CURSOR_FILE):
            print('\nUpdating your current directory...')
            with open(CURSOR_FILE) as f:
                update(f.readline())
                save_cursor()
        
        else:
            print('\nWhile an nginx file directory was found, a Dropbox cursor was not.')
            print('Since the cursor tells Dropbox how long ago this program last checked for updates, ')
            print('the folder may be recreated automatically with the new cursor, or you can update it yourself.')
            
            if click.confirm('Would you like to automatically remove and recreate the folder with a new cursor?'):
                shutil.rmtree(FILE_DIR)
                download_folder(DROPBOX_FILE_DIR, BASE_DIR, rename=True, progress=True)
                save_cursor()
    
    else:
        print('\nNo nginx file directory found.')
        download_folder(DROPBOX_FILE_DIR, BASE_DIR, rename=True, progress=True)
        save_cursor()

main()