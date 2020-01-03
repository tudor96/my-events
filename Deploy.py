

import os

try:
    import checksumdir
except ImportError:
    print("Installing Checksumdir Module")
    os.system('python -m pip install checksumdir')

import checksumdir
from checksumdir import dirhash
import sys
import subprocess
import binascii

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'


print (bcolors.OKGREEN + "Deploy to Heroku!" + bcolors.ENDC)

# print (bcolors.OKBLUE + "Inital Pull" + bcolors.ENDC)
# os.system("git pull")
# print (bcolors.OKBLUE + "Checking Difference on Front end excluding following files from difference: ['.ts','.md','.json','.yml','LICENSE','.npmignore','.eslintrc','.js']" + bcolors.ENDC)
# directory  = './01_Source/02_Web/Frontend'
# md5hash    = dirhash(directory, 'md5',excluded_extensions=['.ts','.md','.json','.yml',"LICENSE",".npmignore",".eslintrc",".js"])

# size = 0

# try:
#     with open('pythonReq.txt', 'r') as frontEndSize:
#         size = frontEndSize.readline()
# except FileNotFoundError:
#     print("File not found")    

# if(md5hash != size):
#     with open('pythonReq.txt', 'w') as the_file:
#         the_file.write(md5hash)
#     print (bcolors.OKBLUE + "Build Frontend" + bcolors.ENDC)
#     # os.system("")
#     os.system("cd 01_Source/02_Web/Frontend && npm run build")
#     os.system("cd ..")
#     os.system("cd ..")
#     os.system("cd ..")
# else:
#     print (bcolors.HEADER + "No new updates on frontend" + bcolors.ENDC)    

print (bcolors.OKBLUE + "Build Frontend" + bcolors.ENDC)
    # os.system("")
os.system("cd Frontend && npm run build")
os.system("cd ..")



print (bcolors.OKBLUE + "Adding new files" + bcolors.ENDC)
os.system("git add .")

print (bcolors.OKBLUE + "Commiting files" + bcolors.ENDC)
os.system("git commit -m \"Deploy to Heroku\"")

print (bcolors.FAIL + "Pushing to Heroku!" + bcolors.ENDC)
# os.system("git subtree push --prefix 01_Source/02_Web heroku master")
os.system("git push heroku master")

print (bcolors.HEADER + "Done.." + bcolors.ENDC)


g="A"
while (g!="Y" or "N"):
    g=input(bcolors.FAIL + "Want to open page? (Y/N):" + bcolors.ENDC)
    if(g=="Y"):    
        url = "https://lhotels.herokuapp.com"
        if sys.platform=='win32':
            os.startfile(url)
        elif sys.platform=='darwin':
            subprocess.Popen(['open', url])
        else:
            try:
                subprocess.Popen(['xdg-open', url])
            except OSError:
                print('Please open a browser on: ' + url)
        break
    if(g=="N"):
        break
