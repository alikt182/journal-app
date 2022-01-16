import 'setimmediate';
import cloudinary from 'cloudinary';
import { fileUpload } from '../../helpers/fileUpload';

cloudinary.config({ 
    cloud_name: 'deiqvjkpb', 
    api_key: '534777195533254', 
    api_secret: 'bAS5rf__Ck363vhvGpnSetCc8cc',
    secure: false
  });

describe('Pruebas en fileUpload',()=>{

    test('Debe cargar un archivo y retornar el url ', async () => {

        const resp = await fetch('https://19yw4b240vb03ws8qm25h366-wpengine.netdna-ssl.com/wp-content/uploads/10-Free-To-Use-CORS-Proxies-1024x768.png');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.png');
        const url = await fileUpload( file );
               
        expect( typeof url ).toBe('string');

        //Borrar imagen de cloudinary por ID
        const segments = url.split('/'); 
        const imageId = segments[ segments.length - 1 ].replace('.png','');

        const folderName = "react-journal";
       // Fn de la API cloudinary para borrar la imagen subida
       cloudinary.v2.api.delete_resources(`${folderName}/${imageId}`, {}, ()=> {
            // done();
       });


        
    })
    
    test('Debe retornar un error ', async () => {

        const file = new File([], 'foto.png');
        const url = await fileUpload( file );
        
        expect( url ).toBe( null );


    })
    

})