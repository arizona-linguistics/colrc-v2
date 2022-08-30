import re
r = open('/Users/amaris/Documents/GitHub/Color_Sea/sequelize-testing/data/fixed_entries4.txt', 'r')
f = open('/Users/amaris/Documents/GitHub/Color_Sea/sequelize-testing/data/fixed_entries_trim.txt', 'w+')
for line in r.readlines():
    # trim double (())
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\(\((.*)',r'\1(\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\(\((.*:::.*)',r'\1(\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\)\)(.*:::.*)',r'\1(\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\)\)(.*)',r'\1(\2', line)
    # trim () from pos
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\((stem.*)',r'\1\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*stem)\)(.*)',r'\1\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\((.*)',r'\1\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*)\)(.*)',r'\1\2', line)
    # clear extra spaces from english
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*[.,!?])\s*\(?(:::.*:::.*:::.*)',r'\1\2', line)
    # clear extra spaces from pos
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*\.)\s*(:::.*:::.*)',r'\1\2', line)
    line = re.sub(r'^(.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*:::.*adj)\s*(:::.*:::.*)',r'\1\2', line)
    line = re.sub(r'(.*)√(.*)', r'\1\2', line)


    f.write(line)
