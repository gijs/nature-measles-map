#Measles infographic for @NatureNews

Infographic for @naturenews build with [d3.js](http://d3js.org/).

Published at [http://www.nature.com/news/measles-by-the-numbers-a-race-to-eradication-1.16897](http://www.nature.com/news/measles-by-the-numbers-a-race-to-eradication-1.16897)

### Build process

Uses [Grunt](http://gruntjs.com/) for file concatenation, to compile [Sass](http://sass-lang.com/) and apply [JSHint](https://github.com/gruntjs/grunt-contrib-jshint). If you've not used Grunt before, be sure to check out the [getting started guide](http://gruntjs.com/getting-started).

Install dependencies with `npm install`

Type `grunt` to automatically watch for changes and concat a version of `index.html` into the build and dist folders.

**build/index.html** can be used for local testing. You'll need to set up a local server, which is nice and easy to do with Python 2 on a mac.

	cd build
	python -m SimplHTTPServer 

**dist/index.html** is a 'headerless' file ready to be copied into the polopoly CMS as a HTML widget.

## Cleaning the data

### Cases of measles data
[http://apps.who.int/gho/data/node.main.A826?lang=en](http://apps.who.int/gho/data/node.main.A826?lang=en)

Convert the data from excel to csv

	in2csv ref/Cases_by_WHO_region.xls > ref/cases-by-who-region.csv

Take a look at the columns available

	csvcut -n ref/cases-by-who-region.csv

Let's remove 1: WHO_REGION and 4: Disease

	csvcut -c 2,3,5-38 ref/cases-by-who-region.csv > ref/temp.csv && mv ref/temp.csv ref/cases-by-who-region.csv

### Vaccination coverage data

[http://apps.who.int/gho/data/node.main.A826?lang=en](http://apps.who.int/gho/data/node.main.A826?lang=en)

Remove the 1st line opening line

	cat ref/xmart.csv | sed "1 d" > ref/vaccination-by-who-region.csv

Take a look at the available columns

	csvcut -n ref/vaccination-by-who-region.csv

CSV Clean tells us there is an extra column

	csvclean -n ref/vaccination-by-who-region.csv

Create a copy of the file with out the extra column

	csvcut -c 1-35 ref/vaccination-by-who-region.csv > ref/temp.csv && mv ref/temp.csv ref/vaccination-by-who-region.csv

CSV Clean will no confirm that there are no errors.

## Combining the data

There are a number of cases where the country names don't match. Specifically when there is a trailing (the) in cases-by-who-region.csv. Remove the "\s(the)"s with sed. The \s is for the leading space.

	sed -e 's/ (the)//g' ref/cases-by-who-region.csv > ref/temp.csv && mv ref/temp.csv ref/cases-by-who-region.csv

Next we'll want to extract the country codes from the `cases-by-who-region.csv` so the they can be merged with this file.

	csvcut -c 1,2 ref/cases-by-who-region.csv > ref/country-codes.csv

Now we'll join the country codes to the vaccination data

	csvjoin -c "Cname,COUNTRY" ref/country-codes.csv ref/vaccination-by-who-region.csv > ref/temp.csv && mv ref/temp.csv ref/vaccination-by-who-region.csv

And we can drop the COUNTRY column

	csvcut -c 1,2,4-37 ref/vaccination-by-who-region.csv > ref/temp.csv && mv ref/temp.csv ref/vaccination-by-who-region.csv

We can now count the lines in each file

	wc -l ref/vaccination-by-who-region.csv
	wc -l ref/cases-by-who-region.csv

There are more lines in the Cases file so we know there are some countries that do not have vaccination data.

Move both files into our build directory 

	cp ref/vaccination-by-who-region.csv build/data/
	cp ref/cases-by-who-region.csv build/data/

## Local testing 

Open Chrome on OSX with cross origin security disabled

	open -a Google\ Chrome --args --disable-web-security













