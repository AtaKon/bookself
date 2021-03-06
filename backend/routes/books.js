require('dotenv').config();
const express = require("express");
const fs = require("fs")
const path = require("path");
const axios = require('axios');


const Book=require('../models/books');
const books = require('../models/books');

//Array with the file extensions that the app supports
//Will be filled by the database
let acceptedExtenstions=["pdf","epub"];

const router = express.Router();

router.get('/',(req,res,next)=>{
    let page=parseInt(req.query.page)
    if(page==0)
    {
      page+=1
    }
    var aggeratedBooks=Book.aggregate([ { "$sort": { "edited": -1 }}])
    Book.aggregatePaginate(aggeratedBooks,{limit:parseInt(req.query.limit),page:page}).then((response)=>{
        res.status(200).json({message:"All good bro!",books:response});
    }).catch((error)=>{
        res.status(500).json({message:"Something went wrong!",error:error});
    });
});

router.get('/getInfo/:name',(req,res,next) => {
  // console.log(process.env.key)

  axios.get('https://www.googleapis.com/books/v1/volumes?q='+req.params.name+'&key='+process.env.key)
  .then(response=>{
   res.status(200).json({message:'OK',books:response.data})
  }).catch(error=>{
    res.status(500).json({message:'Something is wrong!',books:error})
  });

  
});

router.get('/fill',(req,res,next)=>{
  let fileTree = getAllFiles('F:\\books');
  res.status(200).json({message:"ok"})
});


router.get('/scanLibrary',async (req,res,next)=>{
  let scannedFileTree = await scanFiles('F:\\books')
  res.status(200).json({message:"ok"})
})


router.post('/setInfo/',(req,res,next) => {
  let obj={
    title:req.body.info.volumeInfo?.title ?? null,
    categories:req.body.info.volumeInfo?.categories ?? null,
    subTitle:req.body.info.volumeInfo?.subtitle ?? null,
    authors:req.body.info.volumeInfo?.authors ?? null,
    publisher:req.body.info.volumeInfo?.publisher ?? null,
    year:req.body.info.volumeInfo?.publishedDate ?? null,
    imageLink:req.body.info.volumeInfo?.imageLinks?.thumbnail ?? null,
    description:req.body.info.volumeInfo?.description ?? null,
    edited:true
  }
  books.findOneAndUpdate({_id:req.body.bookId},obj).then(result=>
    res.status(200).json({ok:result})
  )
  .catch(error=>{
    console.log(error)
    res.status(500).json({error:error})
  });
  
});

router.post('/addToFavorites/',(req,res,next) => {

  books.findByIdAndUpdate(req.body.id,{$push:{inFavourites:req.body.userId}},{new:true}).then(result=>{
    // console.log(result)
    res.status(200).json({message:'ok',inFav:result.inFavourites})
  }).catch(error=>{
    // console.log(error)
    res.status(500).json({message:'not ok'})
  });
});

router.post('/removeFromFavorites/',(req,res,next) => {

  books.findByIdAndUpdate(req.body.id,{$pull:{inFavourites:req.body.userId}},{new:true}).then(result=>{
    // console.log(result)
    res.status(200).json({message:'ok',inFav:result.inFavourites})
  }).catch(error=>{
    // console.log(error)
    res.status(500).json({message:'not ok'})
  });
});


router.get('/test/',(req,res,next) => {
  console.log(req)
  res.status(200).json({message:'ok'});
});

router.get('/getBook/:id',(req,res,next)=>{
  books.findById(req.params.id).then(result=>{
    res.sendFile(result.path);
  })
  .catch(error=>{
    res.status(500);
  }); 
})

module.exports=router;




//Function that recursively lists all file in given directory
getAllFiles = (dirPath, arrayOfFiles) =>{
    
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach((file)=>{
        //If file is directory call the same function again
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
          //If file and is contained in the supported extensions array push it to the array of files that the function returns
        let f=path.extname(file).split('.')[1]
        if(acceptedExtenstions.indexOf(f)>-1){
            arrayOfFiles.push(path.join( dirPath, "/", file))
            let book = new Book({
                title:file.split('.').slice(0, -1).join('.'),
                path:path.join( dirPath, "/", file),
                categories:null,
                subTitle:null,
                authors:null,
                publisher:null,
                year:null,
                description:null
            }).save()
            .then(result=>{
              })
              .catch(error=>{
                console.log(error);
              });
            
        }
      }
    })
  
    return arrayOfFiles

}


scanFiles = async (dirPath, arrayOfFiles) =>{

  let booksList = await books.find()
    
  files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach((file)=>{
      //If file is directory call the same function again
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
    } else {
        //If file and is contained in the supported extensions array push it to the array of files that the function returns
      let f=path.extname(file).split('.')[1]
      if(acceptedExtenstions.indexOf(f)>-1){
          arrayOfFiles.push(path.join( dirPath, "/", file))
          if(!booksList.some(x=>x.path===path.join( dirPath, "/", file))){
            let book = new Book({
              title:file.split('.').slice(0, -1).join('.'),
              path:path.join( dirPath, "/", file),
              categories:null,
              subTitle:null,
              authors:null,
              publisher:null,
              year:null,
              description:null
          }).save()
          .then(result=>{
            })
            .catch(error=>{
              console.log(error);
            });
          }   
      }
    }
  })

  return arrayOfFiles

}