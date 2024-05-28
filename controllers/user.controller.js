import prisma from "../lib/Prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const getAll = async(req, res)=> {

     try {
        const all = await prisma.user.findMany()
        res.status(200).json(all)
        
     } catch (error) {
        res.status(400).json(error)
     }
}

export const getOneUser = async(req, res)=> {
    const id = req.params.id
    console.log(id);
    try {
       const getOne = await prisma.user.findUnique({where: {id}})
       res.status(200).json(getOne)
       
    } catch (error) {
       res.status(400).json(error)
    }
}

export const updateUser = async(req, res)=> {
    const id = req.params.id
    const tokenId = req.userId
    const body = req.body
    if(id!==tokenId){
        return res.status(400).json({message: "Not authenticated"})
    }
    console.log(id);
    try {
       const getUpdate = await prisma.user.update({where: {id}, data:body})
       res.status(200).json(getUpdate)
       
    } catch (error) {
       res.status(400).json(error)
    }
}

export const deleteUser = async(req, res)=> {
    const id = req.params.id
    const tokenId = req.userId
    if(id!==tokenId){
        return res.status(400).json({message: "Not authenticated"})
    }
    console.log(id);
    try {
       const delUser = await prisma.user.delete({where: {id}})
       res.status(200).json(delUser)
       
    } catch (error) {
       res.status(400).json(error)
    }
}