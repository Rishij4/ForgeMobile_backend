import Display from "../models/Display.js";

export const getDisplays =
async (req,res)=>{

  try{

    const displays =
      await Display.find();

    res.json(displays);

  }catch(error){

    res.status(500).json({
      message:error.message
    });

  }

};