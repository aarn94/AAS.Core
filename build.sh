
echo $1
echo $2
echo $3

npm install -g @angular/cli

cd src

echo 'install base'

npm install

cd projects/core

echo 'install package'

npm install

echo "npm version $1.$2.$3"

npm version $1.$2.$3

echo 'ng build core --prod'

ng build core --prod
