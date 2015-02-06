#Measles infographic for @NatureNews

Convert the data from excel to csv

	in2csv build/data/Cases_by_WHO_region.xls > build/data/cases-by-who-region.csv

Take a look at the columns available

	csvcut -n build/data/cases-by-who-region.csv

Let's remove 1: WHO_REGION and 4: Disease

	csvcut -c 2,3,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38 build/data/cases-by-who-region.csv > build/data/cases-by-who-region-edit.csv

