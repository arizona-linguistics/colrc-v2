import codecs
fout=codecs.open("../data/spell_data.out","w","utf-8")
with codecs.open("../data/spell_data.txt", "r", "utf-8") as f:
	line = f.readline()
	cnt = 1
	print(u"\t\"spelling\": [")
	while line:
		#print("Line {}: {}".format(cnt,line.strip()))
		elements = line.strip().split("\t")
		print(u"\t\t{")
		print(u"\t\t\t\"id\": {},".format(cnt))
		print(u"\t\t\t\"reichard\": \"{}\",".format(elements[0]))
		print(u"\t\t\t\"nicodemus\": \"{}\",".format(elements[1]))
		print(u"\t\t\t\"salish\": \"{}\",".format(elements[2]))
		print(u"\t\t\t\"english\": \"{}\",".format(elements[3]))
		if (len(elements) == 5):
			print(u"\t\t\t\"note\": \"{}\"".format(elements[4]))
		else:
			print(u"\t\t\t\"note\": \"\"")
		print(u"\t\t},")
		#print(elements)
		line = f.readline()
		cnt += 1
	print(u"\t],")
fout.close()
