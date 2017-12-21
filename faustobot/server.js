
function random_from_array(images){ //Função que gera números aletórios a partir do tamanho de images

    return images[Math.floor(Math.random() * images.length)];   //Math.random() -> gera um número aleatório de 0 a 1 mas nunca seleciona o 1, a partir daí você multiplica o tamanho de images por esse número aleatório e faz o floor desse número vôce obtém um número aletório para uma imagem na pasta menos o último número, porém isso não importa, pois o index de array em Js começa do 0. images.length() -> sempre retorna o tamanho total de arquivos na pasta.
}
/*-------------------------------------------------------------------------------------------------*/
function upload_random_images(images){      //Função que faz o upload de imagens aleatórias de /image/ dentro da pasta e faz o post no twitter

    console.log('Opening an image...');
    var image_path = path.join(__dirname, '/images/' + random_from_array(images)),
    b64content = fs.readFileSync(image_path, { encoding: 'base64' });
    console.log('Uploading an image...');
    T.post('media/upload', { media_data: b64content}, function(err, data, response){
        if(err){
            console.log('ERROR:');
            console.log(err);
        } else {
            console.log('Image Uploaded!');
            console.log('Now tweeting it...');
            T.post('statuses/update', {
                media_ids: new Array(data.media_id_string)
            },
                function(err, data, response){
                    if(err){
                        console.log('ERROR:');
                        console.log(err);
                    } else {
                        console.log('Posted an image!');
                    }
                }
            );
        }
    });
}

/*-------------------------------------------------------------------------------------------------*/

var Twit = require('twit')

var fs = require('fs'),
path = require('path'),
Twit = require('twit'),
config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

fs.readdir(__dirname + '/images', function(err, files){
    if(err){
        console.log(err);
    } else {
        var images = [];
        files.forEach(function(f){
            images.push(f);
        });
        setInterval(function(){
            upload_random_images(images);
        }, 3600000);
    }
});
