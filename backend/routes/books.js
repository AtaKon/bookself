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
    Book.find().then((response)=>{
        res.status(200).json({message:"All good bro!",books:response});
    }).catch((error)=>{
        res.status(500).json({message:"Something went wrong!",error:error});
    });
});

router.get('/getInfo/:name',(req,res,next) => {
  // console.log(process.env.key)

  axios.get('https://www.googleapis.com/books/v1/volumes?q='+req.params.name+'&key='+process.env.key)
  .then(response=>{
  //  console.log(response.data)
   res.status(200).json({message:'OK',books:response.data})
  }).catch(error=>{
    res.status(500).json({message:'Something is wrong!',books:error})
  });

  
});

router.get('/fill',(req,res,next)=>{
  let fileTree = getAllFiles(process.env.path);
  res.status(200).json({message:"ok"})
});


router.post('/setInfo/',(req,res,next) => {
  let obj={
    title:req.body.info.volumeInfo?.title ?? null,
    categories:req.body.info.volumeInfo?.categories ?? null,
    subTitle:req.body.info.volumeInfo?.subtitle ?? null,
    authors:req.body.info.volumeInfo?.authors ?? null,
    publisher:req.body.info.volumeInfo?.publisher ?? null,
    year:req.body.info.volumeInfo?.publishedDate ?? null,
    imageLink:req.body.info.volumeInfo?.imageLinks?.thumbnail ?? null,
    description:req.body.volumeInfo?.description ?? null
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
  let obj={
    inFavourites:true
  }

  books.findByIdAndUpdate(req.body.id,obj).then(result=>{
    console.log(result)
    res.status(200).json({message:'ok'})
  }).catch(error=>{
    console.log(error)
    res.status(500).json({message:'not ok'})
  });
});

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
