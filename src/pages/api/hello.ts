// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function hello(req:NextApiRequest,res:NextApiResponse){
  if(req.method=="GET"){
    try{
      console.log('Success');
      const response =await fetch(`${process.env.API_URL}api/Test/1`);
      const data = await response.json();
      res.status(200).json({data});
    }
    catch(error){
      console.log('Fail');
      res.status(500).json({error:'fail'});
    }
  }

 
}